
export const MaskRules = {
  any: {
    maska: "",
    token: "",
  },
  phone: {
    maska: "+7 (###) ###-##-##",
    token: ""
  },
  smsCode: {
    maska: "####",
    token: ""
  },
  iin: {
    maska: "############",
    token: ""
  },
  ndsNumber: {
    maska: "#####",
    token: ""
  },
  ndsSerial: {
    maska: "#######",
    token: ""
  },
  realNumber: {
    maska: "9 99#.##",
    token: "9:[0-9]:repeated"
  },
  rcaRco: {
    maska: "################",
    token: ""
  }
}
