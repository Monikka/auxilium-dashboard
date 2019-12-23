import AWS from "aws-sdk";
import dotenv from "dotenv";
import { UtteranceStatusType } from "../actions";

dotenv.config();
export const FETCH_DETECTED_USAGE_DATA_REQUESTED =
  "FETCH_DETECTED_USAGE_DATA_REQUESTED";
export const FETCH_DETECTED_USAGE_DATA_RECEIVED =
  "FETCH_DETECTED_USAGE_DATA_RECEIVED";
export const FETCH_DETECTED_USAGE_DATA_FAILED =
  "FETCH_DETECTED_USAGE_DATA_FAILED";
export const SET_DETECTED_UTTERANCES_FILTER = "SET_DETECTED_UTTERANCES_FILTER";

export const setLoading = () => ({
  type: FETCH_DETECTED_USAGE_DATA_REQUESTED
});

export const setUtterances = utterances => ({
  type: FETCH_DETECTED_USAGE_DATA_RECEIVED,
  payload: { utterances }
});

export const setError = error => ({
  type: FETCH_DETECTED_USAGE_DATA_FAILED,
  payload: { error }
});

export const setFilter = filterValue => ({
  type: SET_DETECTED_UTTERANCES_FILTER,
  filter: filterValue
});

export function fetchDetectedUtterances() {
  return (dispatch, getState) => {
    var state = getState();
    var detectedUtterances = state.detected.utterances;
    if (detectedUtterances === undefined || detectedUtterances.length == 0) {
      dispatch(setLoading());

      let lexModel = new AWS.LexModelBuildingService();
      var params = {
        botName: process.env.REACT_APP_BOT_NAME,
        botVersions: ["20", "21", "24", "26", "$LATEST"],
        statusType: UtteranceStatusType.DETECTED
      };

      var getDetectedUtterances = lexModel.getUtterancesView(params).promise();

      getDetectedUtterances
        .then(data => {
          if (data) {
            var detectedUtterances = [];
            data.utterances.forEach(utteranceObject => {
              detectedUtterances = detectedUtterances.concat(
                utteranceObject.utterances
              );
            });

            dispatch(
              setUtterances(detectedUtterances, UtteranceStatusType.DETECTED)
            );
          }
        })
        .catch(err => dispatch(setError(err)));
    }
  };
}
