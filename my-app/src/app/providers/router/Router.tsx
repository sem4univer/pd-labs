import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { FC } from "react";
import { Layout } from "../../layout/Layout";
import { Labs } from "../../../pages/labs/Labs";
import { PhysicLab1 } from "../../../pages/ lab/physics/1/PhysicLab1";

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
    ],
  },
]);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
