import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Table, Container } from "react-bootstrap";

class IntentCard extends React.Component {
  createRow(value, index) {
    if (value)
      return (
        <tr>
          <td>{index}</td>
          <td style={{ textAlign: "left" }}>{value.utteranceString}</td>
          <td>{value.count}</td>
        </tr>
      );
  }

  render() {
    var cardStyle = {
      background: "#FFFFFF",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: 5,
      height: "100%",
      padding: 20
    };

    const items = [];
    const data = this.props.data;

    if (data) {
      data.map((value, index) => {
        items.push(this.createRow(value, index + 1));
      });
    }

    var myCard = (
      <Container fluid style={cardStyle} className="mt-xs-5">
        <Row>
          <Col sm={1}>
            <FontAwesomeIcon
              icon={["fas", "medal"]}
              color="#7C7C7C"
              size="lg"
            />
          </Col>
          <Col>
            <h4
              style={{
                fontWeight: 400,
                textAlign: "left",
                alignContent: "center"
              }}
            >
              Top 5 User Questions
            </h4>
          </Col>
        </Row>
        <Row>
          <Table responsive className="fluid">
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </Table>
        </Row>
      </Container>
    );

    return myCard;
  }
}

export default IntentCard;
