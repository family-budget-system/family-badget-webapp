import {LocaleService} from "@/services/locale.service";
import ru from "../locales/ru";
import kk from "../locales/kk";
import {createI18n} from "vue-i18n";

export const i18n: any = createI18n({
  locale: LocaleService.getLocale() || "ru",
  messages: {
    ru,
    kk,
  },
  silentTranslationWarn: false,
  legacy: false,
})

export async function getI18n() {
  await i18n;
  return i18n.global;
}
