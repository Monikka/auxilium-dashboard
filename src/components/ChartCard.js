import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import LineGraph from "./LineGraph";
import { connect } from "react-redux";
import { UtterancesFilters } from "../actions";
import { fetchAllUtterances, setFilter } from "../actions/getAllUsageData";
import { getChartData } from "../selectors";

class ChartCard extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(fetchAllUtterances());
  }

  render() {
    var cardStyle = {
      background: "#FFFFFF",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: 5,
      height: "100%",
      padding: 20
    };

    var myCard = (
      <Container fluid style={cardStyle}>
        <Row>
          <Col sm={1} className="float-left">
            <FontAwesomeIcon
              icon={["fas", "chart-line"]}
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
              User Messages Received
            </h4>
          </Col>

          <Col sm={4}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={["fas", "calendar-alt"]}
                style={{ float: "left", marginRight: "5px" }}
              />
              <select
                onChange={event =>
                  this.props.dispatch(setFilter(event.target.value))
                }
                style={{ width: "100%" }}
                value={this.props.filter}
              >
                <option>{UtterancesFilters.PAST_DAY}</option>
                <option>{UtterancesFilters.PAST_WEEK}</option>
                <option>{UtterancesFilters.PAST_MONTH}</option>
              </select>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-help">
                    Filters the usage data based on the selected date/time range
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  style={{ float: "right", marginLeft: "5px" }}
                  size="1x"
                  icon={["far", "question-circle"]}
                  color="#A0A0A0"
                  className="d-none d-md-block"
                />
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <hr className="style4" />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <LineGraph
              labels={this.props.formattedData.labels}
              data={this.props.formattedData.values}
            />
          </Col>
        </Row>
      </Container>
    );

    return myCard;
  }
}

const mapStateToProps = state => ({
  formattedData: getChartData(state),
  loading: state.allUtterances.loading,
  error: state.allUtterances.error,
  filter: state.allUtterances.filter
});

export default connect(mapStateToProps)(ChartCard);
