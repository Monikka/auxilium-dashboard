import React, { Component } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
  fetchDetectedUtterances,
  setFilter
} from "../actions/getDetectedUsageData";
import { UtterancesFilters } from "../actions";
import { selectFilteredDetectedUtterances } from "../selectors";


// UI class for the detected table in the user messages tab
class DetectedTable extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDetectedUtterances());
  }

  render() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };

    const columns = [
      {
        Header: "",
        id: "icon",
        width: 50,
        sortable: false,
        filterable: false,
        Cell: row => (
          <div className="d-flex justify-content-center">
            <FontAwesomeIcon icon={["fas", "check"]} color="#50a890" />
          </div>
        )
      },
      {
        Header: "Message",
        id: "message",
        accessor: d => d.utteranceString,
        filterMethod: (filter, row) => {
          const id = filter.pivotId || filter.id;
          return row[id] !== undefined
            ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
            : true;
        },
        Filter: ({ filter, onChange }) => {
          return (
            <div className="d-flex ">
              <InputGroup className="mt-3 mb-1">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={["fas", "search"]} color="black" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={event => onChange(event.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search messages"
                />
              </InputGroup>
            </div>
          );
        }
      },
      {
        Header: "Last Said Date",
        id: "timestamp",
        accessor: d => d.lastUtteredDate.toLocaleDateString("en-US", options),
        filterable: false,
        width: 250
      },
      {
        Header: "Count",
        width: 100,
        accessor: "count",
        filterable: false
      },
      {
        Header: <FontAwesomeIcon icon={["fas", "calendar-alt"]} />,
        width: 250,
        sortable: false,
        Filter: ({ filter, onChange }) => (
          <select
            className="mt-3 mb-2"
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
        )
      }
    ];

    var msgTable = (
      <Container className="my-4" fluid>
        <Row>
          <Col sm={12} className="m-auto">
            <ReactTable
              noDataText="No user messages!"
              filterable
              data={this.props.detectedUtterances}
              className="-striped"
              columns={columns}
              defaultPageSize={10}
              defaultSorted={[
                {
                  id: "timestamp",
                  desc: true
                }
              ]}
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
              }
            />
          </Col>
        </Row>
      </Container>
    );

    return msgTable;
  }
}

const mapStateToProps = state => ({
  detectedUtterances: selectFilteredDetectedUtterances(state),
  loading: state.detected.loading,
  error: state.detected.error,
  filter: state.detected.filter
});

export default connect(mapStateToProps)(DetectedTable);
