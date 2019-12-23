import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResponseCard from "../components/ResponseCard";
import { connect } from "react-redux";
import { fetchTrainingData } from "../actions/getTrainingData";
import Loader from "react-loader-spinner";

// COntainer class for the response cards showing training data
class BotResponses extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTrainingData());
  }

  createResponseCard(response, orderNum) {
    var options = {};
    options["num"] = orderNum;
    options["question"] = "";
    options["key"] = "";

    var i = 0;
    do {
      options["question"] = options["question"].concat(
        response.userUtterances[i]
      );

      if (i == 0) {
        options["question"] = options["question"].concat(" / ");
      }
      i++;
    } while (i < 2);

    options["answers"] = response.botMessages;
    options["key"] = i;

    return (
      <Row className="justify-content-around">
        <Col>
          <ResponseCard {...options} />
        </Col>
      </Row>
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "62vh",
            display: "flex"
          }}
        >
          <Loader type="ThreeDots" color="#EBCC60" height="100" width="100" />
        </div>
      );
    }
    const items = [];
    const data = this.props.trainingData;

    data.map((value, index) => {
      items.push(this.createResponseCard(value, index + 1));
    });

    return <Container className="ResponsesContainer">{items}</Container>;
  }
}

const mapStateToProps = state => {
  return {
    trainingData: state.trainingData.data,
    loading: state.trainingData.loading,
    error: state.trainingData.error
  };
};

export default connect(mapStateToProps)(BotResponses);
