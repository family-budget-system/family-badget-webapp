import {CleaveOptions} from "cleave.js/options";

const cleaveRules: { [key: string]: CleaveOptions } = {
  any: {},
  phone: {
    numericOnly: true,
    blocks: [2, 3, 3, 2, 2],
    delimiters: [" (", ") ", "-", "-"],
    prefix: "+7",
    noImmediatePrefix: true,
    rawValueTrimPrefix: true
  },

  iin: {
    numericOnly: true,
    blocks: [12]
  },
  ndsNumber: {
    numericOnly: true,
    blocks: [5]
  },
  ndsSerial: {
    numericOnly: true,
    blocks: [7]
  },
  floatNumber: {
    numeral: true,
    numeralDecimalMark: '.',
    delimiter: ' '
  },
  rcaRco: {
    numeral: true,
    delimiter: "",
    blocks: [20]
  },
  bankBill: {
    prefix: "KZ",
    uppercase: true,
    noImmediatePrefix: true,
  },
  percent: {
    numeral: true,
    prefix: "%",
    tailPrefix: true,
  },
  number: {
    numeral: true,
    delimiter: ' ',
    numericOnly: true,
  }
};

type CleaveRuleKeys = keyof typeof cleaveRules;

export const CleaveRules: { [key in CleaveRuleKeys]: CleaveOptions } = cleaveRules;
