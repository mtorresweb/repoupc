import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import robot from "../../assets/avatars/robot-art.svg";
import "./User.css";
import { useForm } from "react-hook-form";
import { updateUser } from "../../helpers/Http";
import { Link } from "react-router-dom";

function User() {
  const { token, user, logIn } = useContext(AuthContext);

  const enviar = async (data) => {
    let response = await updateUser(token, {
      ...data,
      email: user.email,
      nick: user.nick,
    });
    logIn(token, response.user);
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="user_container">
      <div className="user_navigation">
        <Link
          className="user_navigation-button"
          to={"/repositories/todos/byRate/1"}
        >
          {"< REGRESAR"}
        </Link>
      </div>
      <form className="user" onSubmit={handleSubmit(enviar)}>
        <div className="user_image">
          <img src={robot} alt="avatar de usuario" />
        </div>
        <div className="user_field">
          <p className="label">Nombre: </p>
          <p className="user_value">{user.nick}</p>
        </div>
        <div className="user_field">
          <p className="label">Email:</p>
          <p className="user_value">{user.email}</p>
        </div>
        <div className="user_field">
          <p className="label">Estatus:</p>
          <p className="user_value">{user.status}</p>
        </div>
        <label htmlFor="notificaciones" className="notifications">
          <p className="label"> Notificaciones</p>
          <select
            name="notifications_config"
            id="notificaciones"
            {...register("notifications_config")}
          >
            <option value="all">ALL</option>
            <option value="none">NONE</option>
          </select>
        </label>
        <button type="submit" id="userUpdate">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default User;
