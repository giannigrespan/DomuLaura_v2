import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const get = (key: string) =>
    env[`VITE_${key}`] || env[key] || process.env[key] || '';

  return {
    plugins: [react()],
    define: {
      'process.env.GOOGLE_CALENDAR_ID': JSON.stringify(get('GOOGLE_CALENDAR_ID')),
      'process.env.GOOGLE_API_KEY':      JSON.stringify(get('GOOGLE_API_KEY')),
      'process.env.FORMSPREE_ENDPOINT':  JSON.stringify(get('FORMSPREE_ENDPOINT')),
      'process.env.TELEGRAM_LINK':       JSON.stringify(get('TELEGRAM_LINK')),
      'process.env.WHATSAPP_LINK':       JSON.stringify(get('WHATSAPP_LINK')),
      'process.env.INSTAGRAM_LINK':      JSON.stringify(get('INSTAGRAM_LINK')),
      'process.env.GEMINI_API_KEY':      JSON.stringify(get('GEMINI_API_KEY')),
    },
  };
});
