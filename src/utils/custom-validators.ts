

export const customValidators = {
  /**
   * Номер телефона, учитывая маску, должен содержать в себе 18 символов
   * @param value
   */
  phoneNumber: (value: string) => value.length === 18 || value === "",

  /**
   * Проверка на ИИН
   * @param value
   */
  iin: (value: string) => isIINBIN(value),

  /**
   * Проверка на IBAN
   * @param value
   */
  iban: (value: string) => value.length === 20 && value.substring(0, 2) === "KZ" || value === "",

  minLength: (minLength: number, value: string) => value.length > minLength || value === "",

  maxLength: (maxLength: number, value: string) => value.length <= maxLength || value === "",
}

export function isIINBIN(id: string): any {
  if (!id) return false;
  if (id.length != 12) return false;
  if (!/[0-9]{12}/.test(id)) return false;

  if (import.meta.env.MODE !== "master") return true;

  //Проверяем контрольный разряд
  const b1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const b2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
  const a: number[] = [];
  let control: number = 0;
  for (let i = 0; i < 12; i++) {
    a[i] = parseInt(id.substring(i, i + 1));
    if (i < 11) control += a[i] * b1[i];
  }
  control = control % 11;
  if (control == 10) {
    control = 0;
    for (let i = 0; i < 11; i++) control += a[i] * b2[i];
    control = control % 11;
  }
  return control == a[11];
}
