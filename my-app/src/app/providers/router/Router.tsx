import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { FC } from "react";
import { Layout } from "../../layout/Layout";
import { Labs } from "../../../pages/labs/Labs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "labs",
        element: <Labs />
      },
    ],
  },
]);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
