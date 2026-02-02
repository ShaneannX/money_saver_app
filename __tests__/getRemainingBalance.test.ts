import {
    AddIncomeAndOutgoings,
    GetRemainingBalance,
} from "@/backend/sql_queries/IncomeAndOutgoingsTable";
import { loadCache, saveCache } from "@/utils/offlineClient";
import { supabase } from "@/utils/supabase";

// Mocking the cache functions.
jest.mock("@/utils/offlineClient", () => ({
  loadCache: jest.fn(),
  saveCache: jest.fn(),
}));

// Mocking supabase client.
jest.mock("@/utils/supabase", () => ({
  supabase: { from: jest.fn() },
}));

// Simulates select supabase query.
const mockSelect = (returnValue: any) => ({
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockResolvedValue(returnValue),
});

// Mocking upsert supabase query.
const mockUpsert = (returnValue: any) => ({
  upsert: jest.fn().mockResolvedValue(returnValue),
});

// Testing the AddIncomeAndOutgoings async function.
describe("AddIncomeAndOutgoings", () => {
  test("success case", async () => {
    // Mocks retrieval of bills from the bills table - will only retrieve the amount.
    const billsResponse = {
      data: [{ amount: 50 }, { amount: 100 }],
      error: null,
    };
    // Mocks the income - only amount is retrieved.
    const incomeResponse = { data: [{ amount: 500 }], error: null };
    // Mocking the upsert response - user id, total outgoings and income.
    const upsertResponse = {
      data: { user_id: "123", total_outgoings: 150, total_income: 500 },
      error: null,
    };

    // Gets values from each
    (supabase.from as jest.Mock)
      .mockReturnValueOnce(mockSelect(billsResponse)) // bills
      .mockReturnValueOnce(mockSelect(incomeResponse)) // income
      .mockReturnValueOnce(mockUpsert(upsertResponse)); // upsert

    // Runs function with mocked user id.
    const result = await AddIncomeAndOutgoings("123");
    // Expects result to be upsert response data - { user_id: "123", total_outgoings: 150, total_income: 500 }
    expect(result).toEqual(upsertResponse.data);
  });
  // Tests the fall back to cache if failure.
  test("fallback to cache when bills query fails", async () => {
    (loadCache as jest.Mock).mockReturnValue(999); // cache value for remaining balance.

    const billsErrorResponse = { data: null, error: "fail" };

    (supabase.from as jest.Mock).mockReturnValueOnce(
      mockSelect(billsErrorResponse),
    );

    const result = await AddIncomeAndOutgoings("123");

    expect(loadCache).toHaveBeenCalledWith("123");
    expect(result).toBe(999);
  });
});

describe("GetRemainingBalance", () => {
  test("success case", async () => {
    // mocks outgoings
    const outgoingsResponse = {
      data: [{ total_outgoings: 200 }],
      error: null,
    };
    // mocks income
    const incomeResponse = {
      data: [{ total_income: 800 }],
      error: null,
    };

    // gets values
    (supabase.from as jest.Mock)
      .mockReturnValueOnce(mockSelect(outgoingsResponse)) // total_outgoings
      .mockReturnValueOnce(mockSelect(incomeResponse)); // total_income

    const result = await GetRemainingBalance("123");

    expect(result).toBe(600); // confirm calculations has been done 800 - 200 = 600
    expect(saveCache).toHaveBeenCalledWith("123", 600);
  });

  test("fallback to cache when supabase throws", async () => {
    (loadCache as jest.Mock).mockReturnValue(42); // Mocks cache value is 42

    (supabase.from as jest.Mock).mockImplementation(() => {
      throw new Error("boom"); // mocks error
    });

    const result = await GetRemainingBalance("123");

    expect(result).toBe(42); // Confirms that the result is the cache value.
  });
});
