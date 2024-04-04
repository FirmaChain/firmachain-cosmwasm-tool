import { Suspense, lazy } from "react";

import MainLayout from "../layouts/mainLayout";

const MainPage = lazy(() => import("../pages/mainPage"));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <MainPage />
        </Suspense>
      )
    },
  ],
};

export default MainRoutes;
