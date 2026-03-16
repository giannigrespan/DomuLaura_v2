import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.GOOGLE_CALENDAR_ID': JSON.stringify(env.VITE_GOOGLE_CALENDAR_ID || ''),
      'process.env.GOOGLE_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY || ''),
      'process.env.FORMSPREE_ENDPOINT': JSON.stringify(env.VITE_FORMSPREE_ENDPOINT || ''),
      'process.env.TELEGRAM_LINK': JSON.stringify(env.VITE_TELEGRAM_LINK || ''),
      'process.env.WHATSAPP_LINK': JSON.stringify(env.VITE_WHATSAPP_LINK || ''),
    },
  };
});
