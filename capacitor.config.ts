import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'false',
  appName: 'hai-bosu',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    // url: 'http://localhost:4200',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '509054958417-9b43filaoa6m208cr7sgtm1v1mlm0gk2.apps.googleusercontent.com',
      forceCodeForRefreshToken: false,
      androidClientId:
        '509054958417-r8fjlr17omg3fk78utd6nks3tqqlj34b.apps.googleusercontent.com',
      iosClientId: '',
    },
  },
};

export default config;
