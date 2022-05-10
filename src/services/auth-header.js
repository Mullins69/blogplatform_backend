export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // for Node.js Express back-end
      return { Authorization: "Bearer " + user};
    } else {
      return { Error : "error"};
    }
  }