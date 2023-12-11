import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { FC } from "react";
import { Layout } from "../../layout/Layout";
import { Labs } from "../../../pages/labs/Labs";
import { PhysicLab1 } from "../../../pages/lab/physics/1/PhysicLab1";
import { PhysicLab2 } from "../../../pages/lab/physics/2/PhysicLab2";
import { Login } from "../../../pages/login/Login";
import { Registration } from "../../../pages/registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "labs",
        element: <Labs />
      },
      {
        path: "labs/physics/1",
        element: <PhysicLab1 />
      },
      {
        path: "labs/physics/2",
        element: <PhysicLab2 />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'registration',
        element: <Registration />
      }
    ],
  },
]);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
