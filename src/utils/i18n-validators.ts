import * as validators from '@vuelidate/validators'
import {i18n} from "@/plugins/i18n.ts";
import {customValidators} from "@/utils/custom-validators.ts";

const { createI18nMessage } = validators

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)
export const requiredIf = (x: any) => withI18nMessage(validators.requiredIf(x))

export const minLength = (minLength: number) => withI18nMessage(validators.minLength(minLength))

export const maxLength = (maxLength: number) => withI18nMessage(validators.maxLength(maxLength))

export const minValue = (minValue: number) => withI18nMessage(validators.minValue(minValue))

export const maxValue = (maxValue: number) => withI18nMessage(validators.maxValue(maxValue))

export const email = withI18nMessage(validators.email)

export const phoneNumber = withI18nMessage(customValidators.phoneNumber)

export const iin = withI18nMessage(customValidators.iin)

export const iban = withI18nMessage(customValidators.iban)

export const numeric = withI18nMessage(validators.numeric)