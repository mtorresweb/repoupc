import "./error.css";

function Error() {
  return (
    <div className="error">
      <h1 id="error_titulo">404</h1>
      <p id="error_texto">
        La ruta a la que estas intentando acceder no existe
      </p>
    </div>
  );
}

export default Error;
