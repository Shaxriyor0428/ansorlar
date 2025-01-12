import React from "react";
import { useRoutes } from "react-router-dom";
import Main from "../pages/Main";
import Managers from "../pages/Managers";
import Blokeds from "../pages/Blokeds";
import Stuffs from "../pages/Stuffs";
import Tasks from "../pages/Tasks";
import Notfound from "../pages/Notfound";

const MainRouter = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: <Main />,
          children: [
            {
              path: "managers",
              element: <Managers />,
            },
            {
              path: "blockeds",
              element: <Blokeds />,
            },
            {
              path: "stuffs",
              element: <Stuffs />,
            },
            {
              path: "tasks",
              element: <Tasks />,
            },
          ],
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ])}
    </>
  );
};

export default MainRouter;
