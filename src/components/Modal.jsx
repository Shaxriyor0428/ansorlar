import React, { useEffect } from "react";

const Modal = ({ children, close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={close}
        className="overlay z-10 fixed top-0 left-0 w-full h-full bg-[#0005] dark:bg-[#0008]"
      ></div>
      <div className="fixed  z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animation-modal">
        {children}
      </div>
    </>
  );
};

export default Modal;
