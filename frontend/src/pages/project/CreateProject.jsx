import { useContext, useEffect } from "react";
import "./CreateProject.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { createRepository } from "../../helpers/Http";
import { useForm } from "react-hook-form";
//title, description, link , type. tags (optional)

function CreateProject() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const createRepo = async (data) => {
    if (data.tags) {
      let tagsArray = data.tags.replace(/\s/g, "");
      tagsArray = tagsArray.split(",");
      data.tags = tagsArray;
    }
    let response = await createRepository(token, data);
    if (response) {
      alert("repositorio creado exitosamente");
    }
  };

  useEffect(() => {
    if (user.status == "no aprobado") {
      navigate("/test");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { register, handleSubmit } = useForm();

  return (
    <div className="Create_container">
      <div className="create_project_navigation">
        <Link
          className="create_project_navigation-button"
          to={"/repositories/todos/byRate/1"}
        >
          {"< REGRESAR"}
        </Link>
      </div>
      <div className="create_project">
        <div className="create_project-presentation">
          <h1 className="create_project-presentation-title">
            Subir un proyecto
          </h1>
          <p className="create_project-presentation-subtitle">
            Tu proyecto se subirá a la app, pero no será publico inmediatamente,
            un administrador lo revisará y decidirá si hacerlo público pronto 🥸
          </p>
        </div>
        <form
          className="create_project-data"
          onSubmit={handleSubmit(createRepo)}
        >
          <div className="create_project-data-field">
            <label htmlFor="create_project-title">
              Elige un titulo para tu proyecto
            </label>
            <input
              {...register("title")}
              required
              type="text"
              id="create_project-title"
              className="create_project-input"
            />
          </div>
          <div className="create_project-data-field">
            <label htmlFor="create_project-description">
              Dale una descripción a tu proyecto, puede ser algo simple, guarda
              lo mejor para el README.md de tu proyecto en GitHub
            </label>
            <input
              {...register("description")}
              required
              type="text"
              id="create_project-description"
              className="create_project-input"
            />
          </div>
          <div className="create_project-data-field">
            <label htmlFor="create_project-type">
              Elige el tipo de proyecto
            </label>
            <select
              {...register("type")}
              required
              name="type"
              id="create_project-type"
              className="create_project-input"
            >
              <option value="proyecto de grado">Proyecto de grado</option>
              <option value="proyecto de aula">Proyecto de aula</option>
              <option value="proyecto de investigación">
                Proyecto de investigación
              </option>
            </select>
          </div>
          <div className="create_project-data-field">
            <label htmlFor="create_project-link">
              Adiciona el link al repositorio en GitHub
            </label>
            <input
              {...register("link")}
              required
              type="url"
              id="create_project-link"
              className="create_project-input"
            />
          </div>
          <div className="create_project-data-field">
            <label htmlFor="create_project-tags">
              Adicionalmente (opcional), puedes añadir algunas etiquetas para
              que la gente sepa de que va tu proyecto (separalas por comas)
            </label>
            <input
              {...register("tags")}
              type="text"
              id="create_project-tags"
              className="create_project-input"
            />
          </div>
          <div className="create_project-data-field forButton">
            <button id="create_project-form-button" type="submit">
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
