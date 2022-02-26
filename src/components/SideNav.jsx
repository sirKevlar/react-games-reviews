import React from "react";
import { useState } from "react";
import menuIcon from "../assets/menu.png";
import closeIcon from "../assets/x-mark.png";

export default function SideNav({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <div className="sidenav">
        <button
          className="sidenav-open"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img className="menu-icon" src={menuIcon} alt="menu button" />
        </button>
      </div>
    );

  return (
    <div className="sidenav">
      <button
        className="sidenav-close"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <img className="menu-icon" src={closeIcon} alt="close menu" />
      </button>
      <div className="popout">{children}</div>
    </div>
  );
}
