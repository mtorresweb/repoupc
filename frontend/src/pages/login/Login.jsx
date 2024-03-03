import "./Login.css";
import logo_vertical from "../../assets/logo_vertical.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/Token";

export default function Login() {
  const navigate = useNavigate();
  let { logIn } = useContext(AuthContext);

  const enviar = async (data) => {
    let response = await getToken(data);
    logIn(response.token, response.user);
    navigate("/repositories/todos/byRate/1");
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="login_container">
        <div className="login_imagen">
          <img src={logo_vertical} alt="logo repo upc" />
        </div>
        <form id="login" onSubmit={handleSubmit(enviar)}>
          <label htmlFor="login_email" className="login_label">
            Correo electrónico
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="login_email"
            className="login_input"
            placeholder="ejemplo@unicesar.edu.co"
            required
          />
          <label htmlFor="login_password" className="login_label">
            Contraseña
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="login_password"
            className="login_input"
            placeholder="********"
            required
          />
          <a href="" className="login_olvido">
            Olvidó su contraseña?
          </a>
          <button type="submit" id="login_enviar">
            ACCEDER
          </button>
          <Link to={"/register"} className="login_crear">
            Crear una cuenta
          </Link>
        </form>
      </div>
    </>
  );
}
