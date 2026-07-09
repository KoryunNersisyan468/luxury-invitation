export const en = {
  translation: {
    language: { label: 'Language', en: 'English', ru: 'Русский', hy: 'Հայերեն' },

    nav: {
      invitations: 'Invitations',
      styles: 'Styles',
      create: 'Create',
      more: 'More',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      admin: 'Admin',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    common: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      newPassword: 'New password',
      loading: 'Loading…',
      retry: 'Try again',
      createInvitation: 'Create invitation',
      backToLogin: 'Back to login',
      search: 'Search',
    },

    auth: {
      login: {
        title: 'Welcome back',
        subtitle: 'Sign in to manage your invitations.',
        submit: 'Sign in',
        remember: 'Remember me',
        forgot: 'Forgot password?',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
      register: {
        title: 'Create your account',
        subtitle: 'Start crafting beautiful invitations.',
        submit: 'Create account',
        haveAccount: 'Already have an account?',
        signIn: 'Sign in',
      },
      forgot: {
        title: 'Forgot password',
        subtitle: "Enter your email and we'll send you reset instructions.",
        submit: 'Send reset link',
        sentTitle: 'Check your inbox',
        sentBody: 'If an account exists for that email, a reset link is on its way.',
      },
      reset: {
        title: 'Set a new password',
        subtitle: 'Choose a strong password for your account.',
        submit: 'Reset password',
        successTitle: 'Password updated',
        successBody: 'Your password has been reset. You can now sign in.',
        goToLogin: 'Go to login',
        invalidTitle: 'Invalid or expired link',
        invalidBody: 'This reset link is invalid or has expired. Please request a new one.',
        requestNew: 'Request a new link',
      },
    },

    validation: {
      email: 'A valid email address is required',
      passwordMin: 'Password must be at least 8 characters',
      passwordConfirm: 'Please confirm your password',
      passwordsMismatch: 'Passwords do not match',
      tokenRequired: 'Reset token is required',
    },

    home: {
      eyebrow: 'Belle Âme',
      heroTitle: 'Luxury digital invitations for your perfect day',
      heroSubtitle:
        'Craft a cinematic, personalized invitation with floral design, smooth animations, and a built-in RSVP system.',
      ctaCreate: 'Create invitation',
      ctaExample: 'View an example',
      featuresTitle: 'What’s included',
      features: {
        storyTitle: 'Love story',
        storyBody: 'Tell your journey in an elegant, cinematic format.',
        calendarTitle: 'Countdown & calendar',
        calendarBody: 'An interactive calendar and live countdown to the big day.',
        locationsTitle: 'Locations',
        locationsBody: 'Ceremony and reception venues with maps.',
        rsvpTitle: 'RSVP system',
        rsvpBody: 'Guests confirm their attendance in a single tap.',
      },
      ctaTitle: 'Ready to begin?',
      ctaBody: 'Create your personalized invitation in minutes.',
      ctaNow: 'Create now',
    },

    footer: {
      tagline: 'Luxury digital invitations crafted with elegance, love, and cinematic design.',
      explore: 'Explore',
      company: 'Company',
      styles: 'Invitation Styles',
      connect: 'Connect',
      legal: 'Legal',
      rights: 'All rights reserved.',
    },

    notify: {
      genericError: 'Something went wrong. Please try again.',
      loginSuccess: 'Signed in successfully.',
      registerSuccess: 'Account created successfully.',
      loggedOut: 'You have been logged out.',
    },
  },
}

export type TranslationResources = typeof en
