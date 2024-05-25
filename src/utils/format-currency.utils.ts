
export function formatCurrencyUtils(value: number, currency: string) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency, currencyDisplay: "narrowSymbol" }).format(value)
}