import axios from "axios";
const API_URL = "https://blogplatapi.herokuapp.com/";
class AuthService {
  async login(user) {
    return axios
      .patch(API_URL + "users", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("");
  }
  register(user) {
    return axios.post(API_URL + "users", {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      role: "reader"
    });
  }
}
export default new AuthService();