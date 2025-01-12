import React, { useState } from "react";
import Modal from "../components/Modal";
import Login from "../components/Login";
import { Link, NavLink, Outlet } from "react-router-dom";

const Main = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* {open && (
        <Modal close={() => setOpen(false)}>
          <Login close={() => setOpen(false)} />
        </Modal>
      )} */}
      <div id="admin" className="flex ">
        <div className=" w-80 h-screen bg-slate-200 p-6 sticky top-0 left-0">
          <Link to={"/"}>
            <p className="text-2xl font-medium">Dashboard</p>
          </Link>
          <ul className="mt-10">
            <li>
              <NavLink className="block p-3 rounded-md mb-2" to={"/"}>
                <span>Umumiy</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="block p-3 rounded-md mb-2" to={"blockeds"}>
                <span>Bloklanganlar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="block p-3 rounded-md mb-2" to={"managers"}>
                <span>Managerlar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="block p-3 rounded-md mb-2" to={"stuffs"}>
                <span>Hodimlar</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="block p-3 rounded-md mb-2" to={"tasks"}>
                <span>Vazifalar</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
