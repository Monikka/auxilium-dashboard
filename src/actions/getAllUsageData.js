import dotenv from "dotenv";
import { fetchMissedUtterances } from "./getMissedUsageData";
import { fetchDetectedUtterances } from "./getDetectedUsageData";

dotenv.config();
export const FETCH_USAGE_DATA_REQUESTED = "FETCH_USAGE_DATA_BEGIN";
export const FETCH_USAGE_DATA_FAILED = "FETCH_USAGE_DATA_FAILURE";
export const SET_ALL_UTTERANCES_FILTER = "SET_ALL_UTTERANCES_FILTER";

export const setLoading = (isLoading) => ({
  type: FETCH_USAGE_DATA_REQUESTED,
  loading: isLoading
});

export const setError = error => ({
  type: FETCH_USAGE_DATA_FAILED,
  payload: { error }
});

export const setFilter = filterValue => ({
  type: SET_ALL_UTTERANCES_FILTER,
  filter: filterValue
});

export function fetchAllUtterances() {
  return dispatch => {
    try {
     
      dispatch(setLoading(true));
      dispatch(fetchDetectedUtterances());
      dispatch(fetchMissedUtterances());
      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setError(error));
    }
  };
}
