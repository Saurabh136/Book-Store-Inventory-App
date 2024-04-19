import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../../assets/Store-logo.png"
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          {/* <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <img 
              src={logo}
              alt="Logo"
              width={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div> */}
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo} // Assuming `logo` is the URL or path to your logo image
            alt="Logo" // Add an alt attribute for accessibility
            width={35} // Use `width` instead of `size` to set the image width
            style={{ cursor: "pointer", marginRight: "8px" }} // Add margin-right for spacing
            onClick={goHome}
          />
          <span style={{ fontSize: "14px",whiteSpace: "wrap" }}>The Kitab Korner</span> {/* Store name */}
          </div>
        </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
