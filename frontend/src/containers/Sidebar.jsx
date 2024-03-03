import { Link, useParams } from "react-router-dom";
import logo_horizontal from "../assets/logo_horizontal.png";
import "./Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  return (
    <div className="sidebar">
      <div className="sidebar_imagen">
        <img src={logo_horizontal} alt="logo horizontal UPC" />
      </div>
      <div className="sidebar_links">
        <div className="sidebar_link">
          <Link
            style={
              params.type == "todos"
                ? { backgroundColor: "#2F2F2F", color: "#5FD068" }
                : null
            }
            to={"/repositories/todos/byRate/1"}
            type="button"
            className="sidebar_link-text"
          >
            Todos los proyectos
          </Link>
        </div>
        <div className="sidebar_link">
          <Link
            to={"/repositories/grado/byRate/1"}
            style={
              params.type == "grado"
                ? { backgroundColor: "#2F2F2F", color: "#5FD068" }
                : null
            }
            className="sidebar_link-text"
          >
            Proyectos de grado
          </Link>
        </div>
        <div className="sidebar_link">
          <Link
            to={"/repositories/aula/byRate/1"}
            style={
              params.type == "aula"
                ? { backgroundColor: "#2F2F2F", color: "#5FD068" }
                : null
            }
            className="sidebar_link-text"
          >
            Proyectos de aula
          </Link>
        </div>
        <div className="sidebar_link">
          <Link
            to={"/repositories/invest/byRate/1"}
            style={
              params.type == "invest"
                ? { backgroundColor: "#2F2F2F", color: "#5FD068" }
                : null
            }
            className="sidebar_link-text"
          >
            Trabajos de investigación
          </Link>
        </div>
        <div className="sidebar_link">
          <Link to={"/create"} className="sidebar_link-text">
            Subir un proyecto
          </Link>
        </div>
        <div className="sidebar_link">
          <Link
            to={"/repositories/mine/byRate/1"}
            style={
              params.type == "mine"
                ? { backgroundColor: "#2F2F2F", color: "#5FD068" }
                : null
            }
            className="sidebar_link-text"
          >
            Mis proyectos
          </Link>
        </div>
        <div className="sidebar_link">
          <Link className="sidebar_link-text">Acerca de</Link>
        </div>
        <div className="sidebar_link">
          <Link className="sidebar_link-text">Preguntas frecuentes</Link>
        </div>
        <div className="sidebar_link">
          <Link className="sidebar_link-text">Notas de la versión</Link>
        </div>
        {user.role == "admin" ? (
          <div className="sidebar_link">
            <Link to={"/requests/1"} className="sidebar_link-text">
              Peticiones
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
