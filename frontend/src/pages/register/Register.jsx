import logo_horizontal from "../../assets/logo_horizontal.png";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerUser } from "../../helpers/Token";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const enviar = async (data) => {
    //validar los datos
    let servidor = data.email.split("@")[1];
    servidor = servidor.split(".")[0];

    if (servidor !== "unicesar") {
      alert("solo se puede registrar con un correo de la UPC");
    } else {
      let response = await registerUser(data);
      if (response) {
        navigate("/login");
      }
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="register_container">
        <div className="register_imagen">
          <img src={logo_horizontal} alt="logo repo UPC" />
        </div>
        <form id="register" onSubmit={handleSubmit(enviar)}>
          <div className="register_inputs">
            <input
              {...register("nick")}
              type="text"
              name="nick"
              id="register_nombre"
              className="register_input"
              placeholder="nombre de usuario"
              required
            />
            <input
              {...register("email")}
              type="email"
              name="email"
              id="register_email"
              className="register_input"
              placeholder="correo institucional"
              required
            />
            <input
              {...register("password")}
              type="password"
              name="password"
              id="register_password"
              className="register_input"
              placeholder="contraseña"
              required
            />
          </div>
          <div className="register_links">
            <p className="register_info">
              La contraseña debe tener una longitud minima de 8 caracteres,
              incluyendo un número, una mayúscula, una minúscula y un carácter
              especial
            </p>
            <button type="submit" id="register_enviar">
              REGISTRARSE
            </button>
            <Link to={"/login"} className="register_iniciar">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
