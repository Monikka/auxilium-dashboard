import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ResponseCard extends React.Component {
  createAnswer(answer) {
    return (
      <Row className="mr-3" style={{ flexWrap: "nowrap" }}>
        <FontAwesomeIcon
          icon={["fas", "angle-right"]}
          color="#D0E1F9"
          size="1x"
        />
        <p className="px-2">{answer}</p>
      </Row>
    );
  }
  render() {
    var answerItems = [];
    var answers = this.props.answers;

    answers.map(value => {
      answerItems.push(this.createAnswer(value));
    });

    var cardStyle = {
      background: "#FFFFFF",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: 5,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      padding: 20
    };

    var myCard = (
      <Container style={cardStyle} className="mt-5">
        <Row>
          <Col sm={1} className="mt-1">
            <div style={{ alignItems: "start" }} className="numberCircle">
              {this.props.num}
            </div>
          </Col>
          <Col>
            <Row className="mr-3">
              <h3>{this.props.question}</h3>
            </Row>
            <Row className="d-block mr-3">
              <hr />
            </Row>
            {answerItems}
          </Col>
        </Row>
      </Container>
    );

    return myCard;
  }
}

export default ResponseCard;
