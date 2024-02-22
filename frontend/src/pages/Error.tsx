import { useRouteError } from "react-router-dom";
import { RouteError } from "../types/error";

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.log(error);

  return (
    <section>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>Error: {error.status} </i>
          <i>{error.statusText || error.message}</i>
          <i>{error.data.message}</i>
        </p>
      </div>
    </section>
  );
}
