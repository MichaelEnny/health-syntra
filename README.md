# Healthsyntra 🏥

An AI-powered health analytics and symptom analysis platform built with Next.js 15, Firebase, and Google's Genkit AI framework.

## 🌟 Features

- **AI-Powered Symptom Analysis**: Advanced symptom checking using Google's Gemini 2.0 Flash model
- **User Authentication**: Secure login with Firebase Auth (Email/Password + Google OAuth)
- **Health Records Management**: Store and track health history with urgency level classification
- **Subscription Management**: Tiered plans (Free, Standard, Premium) with Stripe integration
- **Real-time Dashboard**: Interactive health analytics and data visualization
- **Responsive Design**: Modern UI built with Radix UI components and Tailwind CSS

## 🚀 Tech Stack

### Frontend
- **Next.js 15** with App Router and Turbopack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Recharts** for data visualization
- **React Hook Form** with Zod validation

### Backend & AI
- **Google Genkit** for AI flow orchestration
- **Gemini 2.0 Flash** for symptom analysis
- **Firebase Firestore** for data storage
- **Firebase Auth** for user management
- **Stripe** for payment processing

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Turbopack** for fast development builds

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Firebase account
- Google Cloud account (for Genkit AI)
- Stripe account (for payments)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-syntra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI Configuration
   GOOGLE_GENAI_API_KEY=your_genai_api_key

   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password and Google)
   - Set up Firestore database
   - Configure security rules

5. **Stripe Setup**
   - Create Stripe products for subscription plans
   - Configure webhooks pointing to `/api/stripe/webhooks`

## 🏃‍♂️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 9002 with Turbopack |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler checks |
| `npm run genkit:dev` | Start Genkit development server for AI flows |
| `npm run genkit:watch` | Start Genkit in watch mode for AI development |

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

### AI Development

For AI flow development and testing:

```bash
npm run genkit:dev
```

This starts the Genkit development interface for testing AI flows.

## 📁 Project Structure

```
src/
├── actions/           # Server actions for AI processing
├── ai/
│   ├── flows/        # AI flow definitions
│   ├── genkit.ts     # Main AI configuration
│   └── dev.ts        # Development entry point
├── app/
│   ├── (auth)/       # Authentication pages
│   ├── (app)/        # Protected application pages
│   ├── analyze/      # Symptom analysis interface
│   ├── pricing/      # Subscription management
│   └── api/          # API routes (Stripe webhooks)
├── components/
│   ├── layout/       # Layout components
│   └── ui/           # Reusable UI components
├── contexts/         # React contexts (AuthContext)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
└── types/            # TypeScript type definitions
```

## 🔑 Key Features

### Authentication Flow
- Firebase Auth with email/password and Google OAuth
- User profiles stored in Firestore with subscription data
- Protected routes with authentication checks
- Context-based state management

### AI Symptom Analysis
- **Normalize Symptoms Flow**: Standardizes user input symptoms
- **Health History Summary**: Analyzes historical health data
- **Urgency Classification**: Categorizes symptoms by urgency level
- **Gemini 2.0 Integration**: Leverages Google's latest AI model

### Subscription Management
- **Free Tier**: Basic symptom checking (limited usage)
- **Standard Tier**: Enhanced features and higher limits
- **Premium Tier**: Full access to all features
- Stripe integration for secure payments

### Data Models

#### UserProfile
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  subscriptionPlan: 'free' | 'standard' | 'premium';
  subscriptionStatus: 'active' | 'inactive' | 'past_due';
  createdAt: Timestamp;
}
```

#### HealthRecord
```typescript
interface HealthRecord {
  id: string;
  userId: string;
  symptoms: string[];
  analysis: DiagnosisResult;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Timestamp;
}
```

## 🔒 Security

- Firebase security rules for data access control
- Input validation with Zod schemas
- Secure API endpoints with proper authentication
- Environment variables for sensitive configuration
- CSRF protection on API routes

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Build the project: `npm run build`
3. Deploy: `firebase deploy`

### Environment Configuration
Ensure all environment variables are properly configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `docs/` folder
- Review the Firebase and Genkit documentation

## 🔄 Changelog

### Version 0.1.0
- Initial release with core functionality
- AI-powered symptom analysis
- User authentication and subscription management
- Responsive dashboard interface

---

**Built with ❤️ using Next.js, Firebase, and Google Genkit AI**
