Money Saver App – Proof of Concept

A mobile Proof‑of‑Concept (PoC) application built with Expo (React Native) and Supabase to demonstrate core financial‑tracking functionality, including authentication, CRUD operations, and offline‑read support. This PoC has been developed for Coastline Apps Ltd as part of a feasibility evaluation for a potential full product.

Features
- User Authentication (Supabase email/password)
- Create, Read, Update, Delete financial entries (income + bills)
- Remaining balance calculation
- Offline‑read support using AsyncStorage
- Supabase integration for real backend API + database
- Three core screens (Login, Home, Add/Update Entry)
- Basic performance + accessibility considerations
- Automated tests included in the repository

Tech Stack
- Expo (React Native)
- Supabase (Auth + Database)
- AsyncStorage for offline caching
- JavaScript / TypeScript
- Jest / React Native Testing Library (automated tests)

Installation & Setup:

Clone the repository:
git clone https://github.com/ShaneannX/money_saver_app

cd money_saver_app

Install dependencies: 
npm install

Create a .env file in the project root and add:

EXPO_PUBLIC_SUPABASE_URL=REPLACE_ME

EXPO_PUBLIC_SUPABASE_ANON_KEY=REPLACE_ME

### Getting Started ###

Start the Expo development server:

npx expo start

Run on a device or emulator
- Press i for iOS simulator (Mac only)
- Press a for Android emulator
- Or scan the QR code with the Expo Go app on your phone

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Running Tests:

npm test

API Integration
The app uses:
- Supabase Auth for login/registration
- Supabase Database for CRUD operations
- Row Level Security (RLS) to ensure users only access their own data
All API calls are handled through the Supabase client configured in supabase.js

Offline Strategy
The app supports offline‑read by:
- Caching Supabase responses in AsyncStorage
- Detecting failed network requests
- Falling back to cached data instead of crashing
This satisfies the PoC requirement for offline‑read of a single dataset

Demo Build:
Expo Publish Link:
https://expo.dev/preview/update?message=Demo+build+ready+for+assignment&updateRuntimeVersion=1.0.0&createdAt=2026-02-02T17%3A47%3A35.226Z&slug=exp&projectId=bd653f91-79da-4460-be86-4295772a2f85&group=314650e6-a599-43f8-a2ac-c7eab5063080

QR code:

<img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/e54703fd-fe3b-4a89-a645-97a7ad0cefae" />




