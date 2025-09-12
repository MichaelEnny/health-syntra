# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 9002 with Turbopack
- `npm run build` - Build the Next.js application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript compiler to check types without emitting files
- `npm run genkit:dev` - Start Genkit development server for AI flows
- `npm run genkit:watch` - Start Genkit in watch mode for AI development

## Architecture Overview

This is a health AI application (Healthsyntra) built with Next.js 15, Firebase, and Google's Genkit AI framework. The app provides AI-powered symptom analysis with user authentication and subscription management.

### Key Integrations

- **AI Processing**: Uses Google's Genkit with Gemini 2.0 Flash model for symptom analysis
- **Authentication**: Firebase Auth with email/password and Google OAuth
- **Database**: Firestore for user profiles and health records
- **Payments**: Stripe integration for subscription management
- **UI**: Radix UI components with Tailwind CSS styling

### Core Architecture Patterns

- **App Router**: Uses Next.js 15 App Router with layout-based routing
- **Server Actions**: AI processing happens via server actions (`src/actions/`)
- **Context Pattern**: Authentication state managed via React Context (`AuthContext`)
- **Type Safety**: Comprehensive TypeScript interfaces in `src/types/`

### AI Flow Structure

AI functionality is organized in `src/ai/`:
- `genkit.ts` - Main AI configuration with Google AI plugin
- `flows/` - Specific AI flows (normalize-symptoms, summarize-health-history)
- `dev.ts` - Development entry point for Genkit

### Authentication Flow

- Firebase Auth handles user management
- User profiles stored in Firestore with subscription plans (free/standard/premium)
- AuthContext provides authentication state across the app
- Protected routes use authentication checks

### Data Models

Key TypeScript interfaces:
- `UserProfile` - User account and subscription data
- `HealthRecord` - Symptom analysis results with urgency levels
- `DiagnosisResult` - AI analysis output structure
- `Appointment` - Appointment scheduling data

### Route Structure

- `(auth)/` - Authentication pages (login, register)
- `(app)/` - Protected application pages (dashboard)
- `analyze/` - Symptom analysis interface
- `pricing/` - Subscription management
- `api/stripe/` - Stripe webhook handlers

### Configuration Notes

- TypeScript and ESLint errors are ignored during builds (configured in `next.config.ts`)
- Firebase config is currently hardcoded but should be moved to environment variables
- Development server runs on port 9002
- Uses Geist fonts for typography