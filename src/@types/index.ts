
export type DateRangeDto = {
  upper: string;
  lower: string;
}

export type RangeLocalDate = {
  empty: boolean;
  lowerBoundClosed: boolean;
  upperBoundClosed: boolean;
}

export enum ConsumerEnums {
  CONSUMT_LEGAL = "consumt_legal",
  CONSUMT_IP = "consumt_ip",
  CONSUMT_INDIVIDUAL = "consumt_individual",
}

export enum InterfaceModsEnum {
  EDIT = "edit",
  CREATE = "create",
  VIEW = "view",
}

export type TabType = {
  value: string;
  name: string;
  error: boolean;
}