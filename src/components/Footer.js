import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import egtLogo from "../assets/egtLogo-white.png";
import CMMILevel from "../assets/cmmiLevel.png";

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small">
        <Container fluid className="text-left  footerContainer">
          <Row className="m-3">
            <Col sm={4}>
              <Row className="justify-content-center">
              <img
                src={egtLogo}
                alt="eGlobalTech Company Logo (in white)"
                className="pt-3 text-center image-fluid image-thumbnail responsive-image"
              />
              </Row>
              <Row className="justify-content-center">
              <img
                  src={CMMILevel}
                  alt="eGlobalTech CMMI Level 4"
                  className="text-center companyLogoWhite d-none d-md-block"
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <small>
                  3865 Wilson Blvd., Suite 700, Arlington, VA
                  <br />
                  Office: 703-652-0991
                </small>
              </Row>
              <Row>
                <a
                  className="text-color-theme-yellow"
                  href="www.eglobaltech.com"
                >
                  www.eglobaltech.com
                </a>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <small>
                  Got questions? Email us at{" "}
                  <a
                    href="mailto:info@eglobaltech.com"
                    className="text-color-theme-yellow"
                  >
                    info@eglobaltech.com
                  </a>
                </small>
              </Row>
              <Row>
                <small>
                  <a
                    href="https://www.eglobaltech.com/eglobaltech-privacy-policy/"
                    className="text-color-theme-yellow"
                    alt="eGlobalTech Privacy Policy"
                  >
                    Privacy Policy
                  </a>
                </small>
              </Row>
              <Row>
                <small>
                  <a
                    href="https://www.eglobaltech.com/eglobaltech-terms-of-use/"
                    className="text-color-theme-yellow"
                    alt="eGlobalTech Terms of Use"
                  >
                    Terms of Use
                  </a>
                </small>
              </Row>
            </Col>
          </Row>
        </Container>
        <div
          className="footer-copyright text-center py-2"
          style={{ color: "white", backgroundColor: "#192F42" }}
        >
          <small>
            Copyright 2017 | {" "}
            <a
              className="text-color-theme-yellow"
              href="https://eglobaltech.com"
            >
              eGlobalTech
            </a>
            {" "} | All rights reserved.
          </small>
        </div>
      </footer>
    );
  }
}
