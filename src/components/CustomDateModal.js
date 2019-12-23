import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class MydModalWithGrid extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Date Range
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <p>From</p>
              </Col>
              <Col xs={6} md={4}>
              <p>To</p>
              </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
);
}
}