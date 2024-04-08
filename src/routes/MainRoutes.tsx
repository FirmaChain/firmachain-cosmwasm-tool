import { lazy } from "react";

import MainLayout from "../layouts/mainLayout";
import Loadable from "components/loading/loadable";

const MainPage = Loadable(lazy(() => import("../pages/mainPage")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <MainPage />,
    },
  ],
};

export default MainRoutes;
