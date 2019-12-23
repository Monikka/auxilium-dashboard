import React from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import logo from "../assets/egtLogo.png";
import { Row, Col } from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <Row className="headerContainer">
        <Col sm={1} className="text-md-right ml-3">
          <a href="/#"><Logo id="aux-logo"/></a>
        </Col>
        <Col sm={9}>
          <h1 className="siteTitle">{this.props.name}</h1>
        </Col>
        <Col sm={2} className="d-none d-md-block">
          <img
            alt="eGlobalTech Company Logo"
            src={logo}
            className="companyLogo"
          />
        </Col>
      </Row>
    );
  }
}

export default Header;
