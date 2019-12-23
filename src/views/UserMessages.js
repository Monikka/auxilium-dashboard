import React, { Component } from "react";
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetectedTable from "./DetectedTable";
import MissedTable from "./MissedTable";

// Container class that routes to detected and missed tables
class UserMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { hover_state: "out" };
    this.updateIcon = this.updateIcon.bind(this);
  }

  updateIcon(event) {
    document.getElementsByName("FontAwesomeIcon");
  }

  render() {
    return (
      <Container fluid className="bg-white nav-bar">
        <Row className="flex-nowrap justify-content-center nav">
          <Col sm={1} className="d-flex flex-column nav-item">
            <Row>
              <FontAwesomeIcon
                size="3x"
                className="pt-3 m-auto"
                icon={["fas", "check-circle"]}
                color="#50a890"
              />
            </Row>
            <Row>
              <NavLink
                to="/messages/detected"
                className="sub-nav-tab-decoration no-text-decoration p-3 m-auto"
                activeStyle={{
                  color: "#264160",
                  borderBottomStyle: "solid",
                  borderColor: "#264160",
                  borderWidth: "5px"
                }}
              >
                Detected
              </NavLink>
            </Row>
          </Col>
          <Col sm={1} className="d-flex flex-column">
            <Row>
              <FontAwesomeIcon
                size="3x"
                className="pt-3 m-auto"
                icon={["fas", "times-circle"]}
                color="#f97c7c"
              />
            </Row>
            <Row>
              <NavLink
                to="/messages/missed"
                className="sub-nav-tab-decoration no-text-decoration p-3 m-auto"
                activeStyle={{
                  color: "#264160",
                  borderBottomStyle: "solid",
                  borderColor: "#264160",
                  borderWidth: "5px"
                }}
              >
                Missed
              </NavLink>
            </Row>
          </Col>
        </Row>
        <Row className="bg-white">
          <Col>
            <hr className="m-0 sub-nav-tab-divider" />
          </Col>
        </Row>
        <Row>
          <Col>
            <HashRouter>
              <div>
                {/** By default,  Detected Messages Tab must be selected,
                 but since setting the 'active prop' on the corresponding
                 NavLink doesn't work, so I am forcing the detectedTable
                 to be shown by re-routing the URL to 'detected'. */}

                <Redirect to="/messages/detected" />
                <Route path="/messages/detected" component={DetectedTable} />
                <Route path="/messages/missed" component={MissedTable} />
              </div>
            </HashRouter>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserMessages;
