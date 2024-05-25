import {Api} from "@/services/web-client.ts";
import {AuthorizationResponse, LoginPayload, UserInfoResponse} from "@/services/web-api/@types/auth.types.ts";


export class AuthService {
  private static baseUrl = "/auth"

  public static async login(payload: LoginPayload) {
    const { data } = await Api.post(`${this.baseUrl}/login`, payload)
    return data as AuthorizationResponse
  }

  public static async fetchUserInfo() {
    const { data } =  await Api.post(`${this.baseUrl}/userInfo`)
    return data as UserInfoResponse
  }
}