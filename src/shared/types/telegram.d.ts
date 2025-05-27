declare global {
  interface Window {
    Telegram?: {
      webApp?: boolean;
      WebApp: {
        ready: () => Promise<void>;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
      };
    };
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  hash: string;
  auth_date: number;
}

export {};
