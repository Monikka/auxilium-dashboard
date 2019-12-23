import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar className="p-0 bg-theme">
        <Nav className="mr-auto">
          <NavLink
            className=" ml-5 px-4 py-2 nav-tab-decoration"
            activeStyle={{
              backgroundColor: "#ebcc60",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#264160"
            }}
            exact
            to="/"
            active
          >
            <FontAwesomeIcon
              className="text-center mr-2"
              icon={["fas", "tachometer-alt"]}
              color="white"
            />
            Dashboard
          </NavLink>

          <NavLink
            className="px-4 py-2 nav-tab-decoration"
            activeStyle={{
              backgroundColor: "#ebcc60",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#264160"
            }}
            to="/messages"
          >
            <FontAwesomeIcon
              className="text-center mr-2"
              icon={["fas", "comment-alt"]}
              color="white"
            />
            User Messages
          </NavLink>

          <NavLink
            className="px-4 py-2 nav-tab-decoration"
            activeStyle={{
              backgroundColor: "#ebcc60",
              textDecoration: "none",
              fontWeight: "bold",
              color: "#264160"
            }}
            to="/responses"
          >
            <FontAwesomeIcon
              className="text-center mr-2"
              icon={["fas", "reply"]}
              color="white"
            />
            Bot Responses
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
