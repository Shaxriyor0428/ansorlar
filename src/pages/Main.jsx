import React, { useState } from "react";
import Modal from "../components/Modal";
import Login from "../components/Login";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

import { ADMINLINKS } from "../static";

const Main = () => {
  const [open, setOpen] = useState(true);
  const token = localStorage.getItem("admin-token");

  const admin_links = ADMINLINKS.map((item) => (
    <li key={item.id}>
      <NavLink
        className="font-medium p-3 rounded-md mb-2 flex gap-3"
        to={item.url}
      >
        <button>{item.icon}</button>
        <span>{item.title}</span>
      </NavLink>
    </li>
  ));

  return (
    <div>
      {!token && (
        <Modal>
          <Login close={() => setOpen(false)} />
        </Modal>
      )}
      <div id="admin" className="flex ">
        <div className="w-80 h-screen bg-[#F3F3F3] p-6 sticky top-0 left-0 ">
          <Link to={"/"}>
            <p className="text-2xl font-medium">
              <img src={logo} alt="Logo" />
            </p>
          </Link>
          <ul className="mt-10 text-gray-500">{admin_links}</ul>
        </div>
        <div className="flex-1 mt-[75px] border-t ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
