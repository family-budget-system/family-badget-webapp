import { STORAGE_KEY_LOCALE } from "@/config/const";

export class LocaleService {
  static init() {
    if (!this.getLocale()) {
      this.setLocale(import.meta.env.VUE_APP_I18N_LOCALE || "ru");
    }
  }

  static setLocale(locale: string) {
    localStorage.setItem(STORAGE_KEY_LOCALE, locale);
  }
  static getLocale() {
    return localStorage.getItem(STORAGE_KEY_LOCALE);
  }
}
