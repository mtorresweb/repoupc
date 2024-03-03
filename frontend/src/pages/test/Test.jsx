import "./Test.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { changeUserStatus } from "../../helpers/Http";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();
  const { token, setUser } = useContext(AuthContext);

  const enviar = async (resultados) => {
    if (
      resultados.primera == 4 &&
      resultados.segunda == 1 &&
      resultados.tercera == 3 &&
      resultados.cuarta == 1 &&
      resultados.quinta == 4
    ) {
      alert(
        "Felicitaciones, haz pasado el test, ahora puedes subir proyectos en la aplicación"
      );
      let response = await changeUserStatus(token);
      setUser(response);
      navigate("/repositories/todos/byRate/1");
    } else {
      alert("Parece que te haz equivocado, intenta nuevamente");
    }
  };

  const { register, handleSubmit } = useForm();
  return (
    <>
      <div className="create_project_navigation">
        <Link
          className="create_project_navigation-button"
          to={"/repositories/todos/byRate/1"}
        >
          {"< REGRESAR"}
        </Link>
      </div>
      <div className="test">
        <h1 className="test-title">GitHub</h1>
        <div className="introduction section">
          <h2 className="test_section-title">Introducción</h2>
          <hr />
          <p className="test_section-text">
            GitHub es una plataforma de alojamiento de código para el control de
            versiones y la colaboración. Te permite a ti y a otros trabajar
            juntos en proyectos desde cualquier lugar.
          </p>
          <p className="test_section-text">
            Este tutorial le enseña los elementos esenciales de GitHub, como
            repositorios, ramas y commits. Creará su propio repositorio Hello
            World y aprenderá el flujo de trabajo de GitHub.
          </p>
          <p className="test_section-text">
            En esta guía de inicio rápido, usted aprenderá como:
          </p>
          <ul className="test_section_ul">
            <li className="test_section_ul-item">
              Crear y usar un repositorio
            </li>
            <li className="test_section_ul-item">
              Iniciar y administrar una nueva rama
            </li>
            <li className="test_section_ul-item">
              Realizar cambios en un archivo y enviarlos a GitHub como commits
            </li>
          </ul>
          <p className="test_section-text">
            Para completar este tutorial, necesitas una cuenta de{" "}
            <Link
              to={"https://github.com/"}
              target="_blank"
              className="test_section-link"
            >
              GitHub
            </Link>{" "}
            y acceso a Internet. No necesitas saber programar, usar la línea de
            comando o instalar Git (el software de control de versiones en el
            que se basa GitHub). Si tienes alguna pregunta sobre cualquiera de
            las expresiones utilizadas en esta guía, diríjase al{" "}
            <Link
              target="_blank"
              className="test_section-link"
              to={
                "https://docs.github.com/en/get-started/quickstart/github-glossary"
              }
            >
              Glosario
            </Link>{" "}
            para obtener más información sobre la terminología.
          </p>
        </div>
        <div className="section creating">
          <h2 className="test_section-title">Creando un repositorio</h2>
          <hr />
          <p className="test_section-text">
            Un repositorio se suele utilizar para organizar un único proyecto.
            Los repositorios pueden contener carpetas y archivos, imágenes,
            videos, hojas de cálculo y conjuntos de datos, cualquier cosa que
            necesite su proyecto. A menudo, los repositorios incluyen un archivo
            README, un archivo con información sobre su proyecto. Los archivos
            README están escritos en el lenguaje Markdown de texto sin formato.
            GitHub le permite agregar un archivo README al mismo tiempo que crea
            su nuevo repositorio. GitHub también ofrece otras opciones comunes,
            como un archivo de licencia, pero no es necesario que seleccione
            ninguna de ellas ahora.
          </p>
          <ol className="test_section_ol">
            <li className="test_section_ol-item">
              <p>
                En la esquina superior derecha de cualquier página, use el menú
                desplegable y seleccione Nuevo repositorio.
              </p>
              <img
                className="test-image"
                src="https://docs.github.com/assets/cb-31554/mw-1440/images/help/repository/repo-create.webp"
                alt="create repository"
              />
            </li>
            <li className="test_section_ol-item">
              <p>{`En el cuadro "Nombre del repositorio", escriba hello-world.`}</p>
            </li>
            <li className="test_section_ol-item">
              <p>{`En el cuadro "Descripción", escribe una pequeña descripción.`}</p>
            </li>
            <li className="test_section_ol-item">
              <p>
                selecciona si quieres que tu repositorio sea público o privado.
              </p>
            </li>
            <li className="test_section_ol-item">
              <p>{`selecciona "agregar un archivo README".`}</p>
            </li>
            <li className="test_section_ol-item">
              <p>{`Da click en "crear repositorio".`}</p>
            </li>
          </ol>
        </div>
        <div className="section branch">
          <h2 className="test_section-title">Creando una rama</h2>
          <hr />
          <p className="test_section-text">
            Las ramas te permiten tener multiple versiones de un repositorio a
            la vez;
          </p>
          <p className="test_section-text">
            De forma predeterminada, su repositorio tiene una rama llamada main
            que se considera la rama definitiva. Puede crear ramas adicionales
            fuera de la principal en su repositorio. Puede usar ramas para tener
            diferentes versiones de un proyecto a la vez. Esto es útil cuando
            desea agregar nuevas funciones a un proyecto sin cambiar la fuente
            principal del código. El trabajo realizado en diferentes ramas no
            aparecerá en la rama principal hasta que la fusiones.
          </p>
          <p className="test_section-text">
            {`When you create a branch off the main branch, you're making a copy, or snapshot, of main as it was at that point in time. If someone else made changes to the main branch while you were working on your branch, you could pull in those updates.`}
          </p>
          <p className="test_section-text">{`El diagrama muestra: `}</p>
          <ul className="test_section_ul">
            <li className="test_section_ul-item">La rama main</li>
            <li className="test_section_ul-item">
              Una nueva rama llamada feature
            </li>
            <li className="test_section_ul-item">{`El viaje que realiza feature antes de fusionarse con la principal "main"`}</li>
          </ul>
          <img
            src={
              "https://docs.github.com/assets/cb-23923/mw-1440/images/help/repository/branching.webp"
            }
            alt="gráfica de ramas"
            className="test-image"
          />
          <ol className="test_section_ol">
            <li className="test_section_ol-item">
              <p>{`Da click en la pestaña "code" de tu repositorio hello world.`}</p>
            </li>
            <li className="test_section_ol-item">
              <p>{`Encima de la lista de archivos, haga clic en el menú desplegable que dice main.`}</p>
              <img
                src="https://docs.github.com/assets/cb-78797/mw-1440/images/help/branches/branch-selection-dropdown.webp"
                alt="create a branch"
                className="test-image"
              />
            </li>
            <li className="test_section_ol-item">
              <p>{`Dale un nombre a la rama, por ejemplo "readme-edits"`}</p>
            </li>
            <li className="test_section_ol-item">
              <p>{`Da click en "crear rama: readme-edits desde main.`}</p>
            </li>
          </ol>
          <p className="test_section-text">{`Ahora tiene dos ramas, main y readme-edits. En este momento, se ven exactamente iguales. A continuación, agregará cambios a la nueva rama.`}</p>
        </div>
        <div className="section commit">
          <h2 className="test_section-title">Haciendo y confirmando cambios</h2>
          <hr />
          <p className="test_section-text">{`Cuando creaste una nueva rama en el paso anterior, GitHub copio todo el repositorio a la nueva rama "readme-edits, ahora puedes modificar la nueva rama sin afectar a la principal."`}</p>
          <p className="test_section-text">{`Puedes realizar y guardar cambios en los archivos de tu repositorio. En GitHub, los cambios guardados se denominan commits. Cada commit tiene un mensaje de confirmación asociado, que es una descripción que explica por qué se realizó un cambio en particular. Los mensajes de confirmación capturan el historial de sus cambios para que otros colaboradores puedan entender lo que ha hecho y por qué.`}</p>
          <ol className="test_section_ol">
            <li className="test_section_ol-item">
              {`En la rama que creaste "readme-edits" haz click en el archivo README.md`}
            </li>
            <li className="test_section_ol-item">
              {`Da click en el icono de lápiz para editar el archivo`}
            </li>
            <li className="test_section_ol-item">
              {`en el editor intenta escribir un poco acerca de ti mismo. intenta usar elementos de Markdown`}
            </li>
            <li className="test_section_ol-item">{`Da click en confirmar cambios`}</li>
            <li className="test_section_ol-item">{`En el cuadro "Proponer cambios", escriba un mensaje de confirmación que describa sus cambios.`}</li>
            <li className="test_section_ol-item">{`Da click en proponer cambios`}</li>
          </ol>
          <p className="test_section-text">{`Estos cambios se realizarán solo en el archivo README en su rama readme-edits, por lo que ahora esta rama contiene contenido que es diferente al principal.`}</p>
        </div>
        <h2 className="test_form-titulo">Test</h2>
        <form className="test_form" onSubmit={handleSubmit(enviar)}>
          <div className="test_pregunta">
            <p className="test_pregunta-texto">
              Qué puede contener un repositorio?
            </p>
            <div className="test_pregunta-opciones">
              <input
                type="radio"
                name="primera"
                id="primera1"
                value={1}
                {...register("primera")}
              />
              <label htmlFor="primera1">Carpetas</label>
              <input
                type="radio"
                name="primera"
                id="primera2"
                value={2}
                {...register("primera")}
              />
              <label htmlFor="primera2">Archivos</label>
              <input
                type="radio"
                name="primera"
                id="primera3"
                value={3}
                {...register("primera")}
              />
              <label htmlFor="primera3">Imágenes</label>
              <input
                type="radio"
                name="primera"
                id="primera4"
                value={4}
                {...register("primera")}
              />
              <label htmlFor="primera4">Todas las anteriores</label>
              <input
                type="radio"
                name="primera"
                id="primera5"
                value={5}
                {...register("primera")}
              />
              <label htmlFor="primera5">Ninguna de las anteriores</label>
            </div>
          </div>
          <div className="test_pregunta">
            <p className="test_pregunta-texto">
              Para qué sirve el archivo README.md?
            </p>
            <div className="test_pregunta-opciones">
              <input
                type="radio"
                name="segunda"
                id="segunda1"
                value={1}
                {...register("segunda")}
              />
              <label htmlFor="segunda1">
                Proporcionar información acerca del repositorio
              </label>
              <input
                type="radio"
                name="segunda"
                id="segunda2"
                value={2}
                {...register("segunda")}
              />
              <label htmlFor="segunda2">Programar una página web</label>
              <input
                type="radio"
                name="segunda"
                id="segunda3"
                value={3}
                {...register("segunda")}
              />
              <label htmlFor="segunda3">Aprender Markdown</label>
              <input
                type="radio"
                name="segunda"
                id="segunda4"
                value={4}
                {...register("segunda")}
              />
              <label htmlFor="segunda4">Todas las anteriores</label>
            </div>
          </div>
          <div className="test_pregunta">
            <p className="test_pregunta-texto">
              Para qué son útiles las ramas en GitHub?
            </p>
            <div className="test_pregunta-opciones">
              <input
                type="radio"
                name="tercera"
                id="tercera1"
                value={1}
                {...register("tercera")}
              />
              <label htmlFor="tercera1">
                proporcionar información actualizada de un proyecto
              </label>
              <input
                type="radio"
                name="tercera"
                id="tercera2"
                value={2}
                {...register("tercera")}
              />
              <label htmlFor="tercera2">
                Permiten crear puntos de restauración de un proyecto
              </label>
              <input
                type="radio"
                name="tercera"
                id="tercera3"
                value={3}
                {...register("tercera")}
              />
              <label htmlFor="tercera3">
                Permiten tener multiples versiones de un repositorio a la vez
              </label>
              <input
                type="radio"
                name="tercera"
                id="tercera4"
                value={4}
                {...register("tercera")}
              />
              <label htmlFor="tercera4">Ninguna de las anteriores</label>
            </div>
          </div>
          <div className="test_pregunta">
            <p className="test_pregunta-texto">
              Como se le llama a la rama principal de forma predeterminada?
            </p>
            <div className="test_pregunta-opciones">
              <input
                type="radio"
                name="cuarta"
                id="cuarta1"
                value={1}
                {...register("cuarta")}
              />
              <label htmlFor="cuarta1">main</label>
              <input
                type="radio"
                name="cuarta"
                id="cuarta2"
                value={2}
                {...register("cuarta")}
              />
              <label htmlFor="cuarta2">readme-edits</label>
              <input
                type="radio"
                name="cuarta"
                id="cuarta3"
                value={3}
                {...register("cuarta")}
              />
              <label htmlFor="cuarta3">first</label>
              <input
                type="radio"
                name="cuarta"
                id="cuarta4"
                value={4}
                {...register("cuarta")}
              />
              <label htmlFor="cuarta4">Ninguna de las anteriores</label>
            </div>
          </div>
          <div className="test_pregunta">
            <p className="test_pregunta-texto">
              Como se le llama a los cambios guardados en GitHub?
            </p>
            <div className="test_pregunta-opciones">
              <input
                type="radio"
                name="quinta"
                id="quinta1"
                value={1}
                {...register("quinta")}
              />
              <label htmlFor="quinta1">Estado</label>
              <input
                type="radio"
                name="quinta"
                id="quinta2"
                value={2}
                {...register("quinta")}
              />
              <label htmlFor="quinta2">Actualización</label>
              <input
                type="radio"
                name="quinta"
                id="quinta3"
                value={3}
                {...register("quinta")}
              />
              <label htmlFor="quinta3">Guardado</label>
              <input
                type="radio"
                name="quinta"
                id="quinta4"
                value={4}
                {...register("quinta")}
              />
              <label htmlFor="quinta4">Commit</label>
            </div>
          </div>
          <button className="test_form-enviar" type="submit">
            ENVIAR
          </button>
        </form>
      </div>
    </>
  );
}

export default Test;
