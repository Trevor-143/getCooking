import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.get.cooking',
  appName: 'Get Cooking',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
