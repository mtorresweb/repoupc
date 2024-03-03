import axios from "axios";

const user = axios.create({
  baseURL: "http://127.0.0.1:3000/api/user",
});

export async function getToken(data) {
  try {
    let response = await user.post("/login", data);
    return response.data;
  } catch (e) {
    alert("no se pudo iniciar sesión");
  }
}

export async function registerUser(data) {
  try {
    let response = await user.post("/register", data);
    alert("usuario creado exitosamente, ya puedes iniciar sesión");
    return response;
  } catch (e) {
    alert("no se pudo registrar al usuario");
  }
}
