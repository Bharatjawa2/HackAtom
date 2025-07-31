import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Basic translations can be added here
          welcome: "Welcome",
          home: "Home",
          about: "About",
          services: "Services",
          blog: "Blog",
          signIn: "Sign in",
          getStarted: "Get Started",
          help: "Help",
          login: "Login",
          logout: "Logout"
        }
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          home: "Главная",
          about: "О нас",
          services: "Услуги",
          blog: "Блог",
          signIn: "Войти",
          getStarted: "Начать",
          help: "Помощь",
          login: "Войти",
          logout: "Выйти"
        }
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
