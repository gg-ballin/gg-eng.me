/**
 * Technology icons configuration for the experience section
 * Organized by category with theme-specific variants where applicable
 */

export type ExperienceTechCategory =
  | 'mobileFrameworks'
  | 'languages'
  | 'stateManagement'
  | 'backendCloud'
  | 'developmentTools'
  | 'deployment'
  | 'testing'
  | 'monitoring'
  | 'apis'
  | 'authentication';

export interface ExperienceTechIconConfig {
  id: string; // Unique identifier for the technology
  name: string; // Display name
  href?: string; // Optional link to technology website
  iconLight: string; // Path to light theme icon
  iconDark?: string; // Path to dark theme icon (optional)
  width?: number; // Optional width override
  showText?: boolean; // Whether to show text label
}

export const EXPERIENCE_TECH_ICONS: Record<ExperienceTechCategory, ExperienceTechIconConfig[]> = {
  mobileFrameworks: [
    {
      id: 'react-native',
      name: 'React-Native-cli',
      href: 'https://reactnative.dev',
      iconLight: '/assets/icons/experience/technologies/react_native/react-native_logo.svg',
      width: 50,
      showText: true,
    },
    {
      id: 'expo',
      name: 'Expo',
      href: 'https://expo.dev',
      iconLight: '/assets/icons/experience/technologies/expo/expo_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/expo/expo_logo_dark.svg',
      width: 45,
      showText: true,
    },
  ],
  languages: [
    {
      id: 'typescript',
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org',
      iconLight: '/assets/icons/experience/technologies/typescript/typescript_logo.svg',
      showText: true,
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      iconLight: '/assets/icons/experience/technologies/javascript/javascript_logo.svg',
      showText: true,
    },
    {
      id: 'swift',
      name: 'Swift',
      href: 'https://swift.org',
      iconLight: '/assets/icons/experience/technologies/swift/swift_logo.svg',
      width: 40,
      showText: true,
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      href: 'https://kotlinlang.org',
      iconLight: '/assets/icons/experience/technologies/kotlin/kotlin_logo.svg',
      width: 45,
      showText: true,
    },
  ],
  stateManagement: [
    {
      id: 'redux',
      name: 'Redux',
      href: 'https://redux.js.org',
      iconLight: '/assets/icons/experience/technologies/redux/redux_logo.svg',
      width: 45,
      showText: true,
    },
    {
      id: 'mobx',
      name: 'MobX',
      href: 'https://mobx.js.org',
      iconLight: '/assets/icons/experience/technologies/mobX/mobx_logo.svg',
      width: 45,
      showText: true,
    },
    {
      id: 'zustand',
      name: 'Zustand',
      href: 'https://zustand-demo.pmnd.rs',
      iconLight: '/assets/icons/experience/technologies/zustand/zustand_logo.svg',
      showText: true,
    },
  ],
  backendCloud: [
    {
      id: 'aws-amplify',
      name: 'AWS Amplify',
      href: 'https://aws.amazon.com/amplify',
      iconLight: '/assets/icons/experience/technologies/AWS/amplify_logo.svg',
      showText: true,
    },
    {
      id: 'aws-cognito',
      name: 'AWS Cognito',
      href: 'https://aws.amazon.com/cognito',
      iconLight: '/assets/icons/experience/technologies/AWS/cognito.svg',
      showText: true,
    },
    {
      id: 'aws-s3',
      name: 'AWS S3',
      href: 'https://aws.amazon.com/s3',
      iconLight: '/assets/icons/experience/technologies/AWS/s3_bucket_logo.svg',
      showText: true,
    },
    {
      id: 'firebase',
      name: 'Firebase',
      href: 'https://firebase.google.com',
      iconLight: '/assets/icons/experience/technologies/firebase/firebase_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/firebase/firebase_logo_dark.svg',
      width: 45,
      showText: true,
    },
  ],
  developmentTools: [
    {
      id: 'android-studio',
      name: 'Android Studio',
      href: 'https://developer.android.com/studio',
      iconLight: '/assets/icons/experience/technologies/android/android_studio_logo.svg',
      showText: true,
    },
    {
      id: 'google-play-console',
      name: 'Google Play Console',
      href: 'https://play.google.com/console',
      iconLight: '/assets/icons/experience/technologies/android/google_play_console_logo.svg',
      showText: true,
    },
    {
      id: 'xcode',
      name: 'Xcode',
      href: 'https://developer.apple.com/xcode',
      iconLight: '/assets/icons/experience/technologies/ios/xcode_logo.svg',
      width: 45,
      showText: true,
    },
    {
      id: 'app-store-connect',
      name: 'App Store Connect',
      href: 'https://appstoreconnect.apple.com',
      iconLight: '/assets/icons/experience/technologies/ios/app_store_connect_logo.webp',
      showText: true,
    },
    {
      id: 'cursor',
      name: 'Cursor',
      href: 'https://cursor.sh',
      iconLight: '/assets/icons/experience/technologies/cursor/cursor_logo_dark.svg',
      iconDark: '/assets/icons/experience/technologies/cursor/cursor_logo_light.svg',
      width: 40,
      showText: true,
    },
  ],
  deployment: [
    {
      id: 'expo-eas',
      name: 'Expo EAS',
      href: 'https://expo.dev/eas',
      iconLight: '/assets/icons/experience/technologies/deployment/expo_eas_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/deployment/expo_eas_logo_dark.svg',
      showText: true,
    },
    {
      id: 'app-center',
      name: 'App Center',
      href: 'https://appcenter.ms',
      iconLight: '/assets/icons/experience/technologies/deployment/app_center_logo.svg',
      showText: true,
    },
    {
      id: 'bitrise',
      name: 'Bitrise',
      href: 'https://www.bitrise.io',
      iconLight: '/assets/icons/experience/technologies/deployment/bitrise_logo.svg',
      width: 50,
      showText: true,
    },
  ],
  testing: [
    {
      id: 'jest',
      name: 'Jest',
      href: 'https://jestjs.io',
      iconLight: '/assets/icons/experience/technologies/jest/jest_logo.svg',
      width: 45,
      showText: true,
    },
  ],
  monitoring: [
    {
      id: 'sentry',
      name: 'Sentry',
      href: 'https://sentry.io',
      iconLight: '/assets/icons/experience/technologies/sentry/sentry_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/sentry/sentry_logo_dark.svg',
      width: 50,
      showText: true,
    },
  ],
  apis: [
    {
      id: 'graphql',
      name: 'GraphQL',
      href: 'https://graphql.org',
      iconLight: '/assets/icons/experience/technologies/graphQL/grapQL_logo.svg',
      width: 45,
      showText: true,
    },
    {
      id: 'apollo',
      name: 'Apollo',
      href: 'https://www.apollographql.com',
      iconLight: '/assets/icons/experience/technologies/graphQL/apollo_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/graphQL/apollo_logo_dark.svg',
      width: 45,
      showText: true,
    },
    {
      id: 'tanstack-query',
      name: 'TanStack Query',
      href: 'https://tanstack.com/query',
      iconLight: '/assets/icons/experience/technologies/tanstack_query/logo-color-banner-600.png',
      showText: true,
    },
  ],
  authentication: [
    {
      id: 'auth0',
      name: 'Auth0',
      href: 'https://auth0.com',
      iconLight: '/assets/icons/experience/technologies/OIDC_IDPs/auth0_logo.svg',
      width: 50,
      showText: true,
    },
    {
      id: 'okta',
      name: 'Okta',
      href: 'https://www.okta.com',
      iconLight: '/assets/icons/experience/technologies/OIDC_IDPs/okta_logo_light.svg',
      iconDark: '/assets/icons/experience/technologies/OIDC_IDPs/okta_logo_dark.svg',
      width: 45,
      showText: true,
    },
  ],
};

/**
 * Get all technology icons by category
 */
export function getTechIconsByCategory(category: ExperienceTechCategory): ExperienceTechIconConfig[] {
  return EXPERIENCE_TECH_ICONS[category] || [];
}

/**
 * Get a specific technology icon by ID
 */
export function getTechIconById(id: string): ExperienceTechIconConfig | undefined {
  for (const category of Object.values(EXPERIENCE_TECH_ICONS)) {
    const icon = category.find((icon) => icon.id === id);
    if (icon) return icon;
  }
  return undefined;
}

/**
 * Get all technology icons flattened into a single array
 */
export function getAllTechIcons(): ExperienceTechIconConfig[] {
  return Object.values(EXPERIENCE_TECH_ICONS).flat();
}

/**
 * Get technology icons by multiple categories
 */
export function getTechIconsByCategories(
  categories: ExperienceTechCategory[]
): ExperienceTechIconConfig[] {
  return categories.flatMap((category) => getTechIconsByCategory(category));
}
