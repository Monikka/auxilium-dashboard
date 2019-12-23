import React, { Component } from "react";
import UnitCard from "../components/UnitCard";
import ChartCard from "../components/ChartCard";
import { Row, Col, Container } from "react-bootstrap";
import IntentCard from "../components/IntentCard";
import { connect } from "react-redux";
import { fetchAllUtterances } from "../actions/getAllUsageData";
import Loader from "react-loader-spinner";
import { selectAllUtterances, getDetectedMessagesCount } from "../selectors";

/** UI class for the Dashboard tab */
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.getResponseRate = this.getResponseRate.bind(this);
    this.getTimeSaved = this.getTimeSaved.bind(this);
    this.getUtterancesCount = this.getUtterancesCount.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAllUtterances());
  }

  getUtterancesCount() {
    return this.props.allUtterances.length;
  }

  getTimeSaved() {
    const totalMinutes = this.getUtterancesCount() * 5;

    return Math.ceil(totalMinutes / 60);
  }

  getResponseRate() {
    return Math.floor(
      (this.props.detectedUtterancesCount / this.getUtterancesCount()) * 100
    );
  }

  getTopUtterances() {
    var utterances = this.props.allUtterances;
    var top5 = [];

    if (utterances) {
      var sorted = utterances.sort((x, y) => {
        return y.count - x.count; // sort the count in DESC order
      });

      top5 = sorted.slice(0, sorted.length >= 5 ? 5 : sorted.length);
    }

    return top5;
  }

  render() {
    const divStyle = {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "62vh",
      display: "flex"
    };

    if (this.props.loading) {
      return (
        <div style={divStyle}>
          <Loader type="ThreeDots" color="#EBCC60" height="100" width="100" />
        </div>
      );
    } else if (this.props.detectedError || this.props.missedError) {
      return (
        <div style={divStyle}>
          <p>
            Unexpected Error has occurred. Please contact the eGlobalTech's
            support team for assistance.
          </p>
        </div>
      );
    } else {
      return (
        <Container>
          <Row className="my-5 dashboardUnits">
            <Col xs={12} sm={4}>
              <UnitCard
                icon={["far", "question-circle"]}
                name="Total Questions"
                value={this.getUtterancesCount()}
                unit=""
                tooltip="Total number of questions posed to the chatbot"
              />
            </Col>
            <Col xs={12} sm={4}>
              <UnitCard
                icon={["far", "clock"]}
                name="Time Saved"
                value={this.getTimeSaved()}
                unit="Hours"
                tooltip="The amount of time saved when assuming each user request takes 5 minutes for the helpdesk to resolve."
              />
            </Col>
            <Col xs={12} sm={4}>
              <UnitCard
                icon={["far", "check-circle"]}
                name="Response Rate"
                value={this.getResponseRate()}
                unit="%"
                tooltip="The percentage of proper response by the bot to user messages"
              />
            </Col>
          </Row>
          <Row className=".chartHeight my-5 dashboardUnits display-flex">
            <Col className="" sm={7}>
              <ChartCard />
            </Col>
            <Col sm={5}>
              <IntentCard data={this.getTopUtterances()} />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    detectedUtterancesCount: getDetectedMessagesCount(state),
    allUtterances: selectAllUtterances(state),
    detectedError: state.detected.error,
    missedError: state.missed.error,
    error: state.allUtterances.error
  };
};

// connects the UI component with the global app state
export default connect(mapStateToProps)(Dashboard);
