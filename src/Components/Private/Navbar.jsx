import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarCommon = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/products">
          Product Management
        </Navbar.Brand>
        <Nav className="ml-auto">
          <>
            {role !== "user" ? (
              <Nav.Link as={Link} to="/users">
                User Management
              </Nav.Link>
            ) : null}
            <Nav.Link className="mr-auto" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarCommon;
