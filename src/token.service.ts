import {TokenData} from "@/@types";


export class TokenService {
  public static readonly ACCESS_TOKEN_KEY = "access_token";

  public static saveTokens(tokenData: TokenData) {

    localStorage.setItem(
      this.ACCESS_TOKEN_KEY,
      tokenData.access_token
    );
  }

  public static clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  public static get tokens() {
    const access = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    return {
      accessToken: access ?? "",
    };
  }
}
