import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class UnitCard extends React.Component {
  render() {
    var cardStyle = {
      background: "#FFFFFF",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      display: "block",
      borderRadius: 5,
      height: "100%",
      padding: 20
    };

    var myCard = (
      <div style={cardStyle}>
        <div className="d-inline-flex p-2">
          <FontAwesomeIcon icon={this.props.icon} color="#D0E1F9" size="2x" />
          <h6 style={{ color: "#7C7C7C", padding: "5px", fontWeight: 600 }}>
            {this.props.name}
          </h6>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-help">{this.props.tooltip}</Tooltip>}
          >
            <FontAwesomeIcon
              icon={["far", "question-circle"]}
              color="#A0A0A0"
              className="d-none d-md-block"
            />
          </OverlayTrigger>
        </div>
        <div>
          <p
            style={{ fontWeight: 300, fontSize: "4rem" }}
          >
            {this.props.value}
            <span style={{ fontSize: "1rem", fontWeight: 400 }}>{this.props.unit}</span>
          </p>
        </div>
      </div>
    );

    return myCard;
  }
}

export default UnitCard;
