import { instance } from "../api/api.config";

export default class AuthService {
  static async login(email, password) {
    return instance.post("/auth", {
      email,
      password,
    });
  }

  // static async getAccountInfo() {
  //   return instance.get("/api/v1/account/info");
  // }

  // static async logout() {
  //   return instance.post("/logout");
  // }
}
