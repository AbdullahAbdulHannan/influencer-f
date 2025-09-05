# Whop Sign-In UI

A modern, dark-themed sign-in interface inspired by Whop's design, built with React and Vite.

## Features

- **Sign-In Page**: Email input with social login options (Discord, Google, Apple)
- **Code Verification**: 6-digit verification code input with auto-focus and paste support
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation, focus management, and screen reader support
- **Modern UI**: Dark theme with subtle animations and hover effects

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5174`

## Usage

1. **Sign-In Flow**:
   - Enter your email address (pre-filled with demo email)
   - Click "Continue" to proceed to verification
   - Or use one of the social login buttons

2. **Verification Flow**:
   - Enter the 6-digit code sent to your email
   - Code inputs auto-focus and support paste
   - Use "Resend code" if needed (30-second cooldown)
   - Click "Back to login" to return to sign-in

## Components

- `SignInPage`: Main sign-in interface with email and social login
- `VerificationPage`: Code verification interface
- Responsive CSS with dark theme styling
- Form validation and error handling

## Technologies Used

- React 19
- React Router DOM
- Vite
- CSS3 with modern features
- SVG icons for social login buttons

## Best Practices Implemented

- Component-based architecture
- Proper state management
- Form validation
- Accessibility features
- Responsive design
- Error handling
- Loading states
- Keyboard navigation
- Focus management