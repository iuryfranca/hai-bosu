import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'config.xml',
  appName: 'HAI BOSU',
  webDir: 'www',
  server: {
    androidScheme: 'http',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '509054958417-9b43filaoa6m208cr7sgtm1v1mlm0gk2.apps.googleusercontent.com',
      forceCodeForRefreshToken: false,
      androidClientId:
        '509054958417-r8fjlr17omg3fk78utd6nks3tqqlj34b.apps.googleusercontent.com',
      iosClientId:
        '509054958417-rdq4pu1vambe4s9md4o9upb0ueesr3b5.apps.googleusercontent.com',
    },
  },
};

export default config;
