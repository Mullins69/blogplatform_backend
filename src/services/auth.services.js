import axios from "axios";
const API_URL = "";
class AuthService {
  async login(customer) {
    return axios
      .post(API_URL + "login", {
        email: customer.email,
        password: customer.password,
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
  register(customer) {
    return axios.post(API_URL + "", {
      customername: customer.customername,
      email: customer.email,
      password: customer.password,
      phone_number: customer.phone_number
    });
  }
}
export default new AuthService();