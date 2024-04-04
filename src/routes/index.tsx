import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";

const ThemeRoutes = () => {
  const BASE_ROUTES = [MainRoutes];

  const routes = useMemo(() => {
    return BASE_ROUTES;
  }, [BASE_ROUTES]);

  return useRoutes(routes);
}

export default ThemeRoutes;