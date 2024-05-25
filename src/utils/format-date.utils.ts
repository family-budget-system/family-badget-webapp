import moment from "moment";
import {i18n} from "@/plugins/i18n.ts";

export function formatDate(date: Date) {
  return moment(date).format(`DD.MM.YYYY`)
}

export function formatDateToServerFormat(date: Date, withTime: boolean = false) {
  if (withTime) {
    return moment(date).format("YYYY-MM-DD hh:mm:ss",)
  } else {
    return moment(date).format("YYYY-MM-DD",)
  }
}

export function formatPublishedDate(date: Date) {
  const day = date.getDate();
  const month = getMonthNameWithDeclension(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day} ${month} ${year} г.`;
}

function getMonthNameWithDeclension(monthNumber: number) {
  const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  return monthNames[monthNumber - 1];
}

export function getMonthName(month: number) {
  const monthKeys = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  return i18n.global.t(`common.months.${monthKeys[month - 1]}`);
}
