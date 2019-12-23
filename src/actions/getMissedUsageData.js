import AWS from "aws-sdk";
import dotenv from "dotenv";
import { UtteranceStatusType } from "../actions";

dotenv.config();
export const FETCH_MISSED_USAGE_DATA_REQUESTED =
  "FETCH_MISSED_USAGE_DATA_REQUESTED";
export const FETCH_MISSED_USAGE_DATA_RECEIVED =
  "FETCH_MISSED_USAGE_DATA_RECEIVED";
export const FETCH_MISSED_USAGE_DATA_FAILED = "FETCH_MISSED_USAGE_DATA_FAILED";
export const SET_MISSED_UTTERANCES_FILTER = "SET_MISSED_UTTERANCES_FILTER";

export const setLoading = () => ({
  type: FETCH_MISSED_USAGE_DATA_REQUESTED
});

export const setUtterances = (utterances, utteranceType) => ({
  type: FETCH_MISSED_USAGE_DATA_RECEIVED,
  payload: { utterances, utteranceType }
});

export const setError = error => ({
  type: FETCH_MISSED_USAGE_DATA_FAILED,
  payload: { error }
});

export const setFilter = filterValue => ({
  type: SET_MISSED_UTTERANCES_FILTER,
  filter: filterValue
});

export function fetchMissedUtterances() {
  return (dispatch, getState) => {
    var state = getState();
    var missedUtterances = state.missed.utterances;
    if (missedUtterances === undefined || missedUtterances.length == 0) {
      dispatch(setLoading());

      let lexModel = new AWS.LexModelBuildingService();
      var params = {
        botName: process.env.REACT_APP_BOT_NAME,
        botVersions: ["20", "21", "24", "26", "$LATEST"],
        statusType: UtteranceStatusType.MISSED
      };

      var getMissedUtterances = lexModel.getUtterancesView(params).promise();

      getMissedUtterances
        .then(data => {
          if (data) {
            var missedUtterances = [];
            data.utterances.forEach(utteranceObject => {
              missedUtterances = missedUtterances.concat(
                utteranceObject.utterances
              );
            });

            dispatch(
              setUtterances(missedUtterances, UtteranceStatusType.MISSED)
            );
          }
        })
        .catch(err => dispatch(setError(err)));
    }
  };
}
