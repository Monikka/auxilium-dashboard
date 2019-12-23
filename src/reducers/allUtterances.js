import {
  FETCH_USAGE_DATA_REQUESTED,
  FETCH_USAGE_DATA_FAILED,
  SET_ALL_UTTERANCES_FILTER
} from "../actions/getAllUsageData";
import { UtterancesFilters } from "../actions";

const initialState = {
  filter: UtterancesFilters.PAST_MONTH,
  loading: false,
  error: null
};

export default function detectedUtterances(state = initialState, action) {
  switch (action.type) {
    case FETCH_USAGE_DATA_REQUESTED:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: action.loading,
        error: null
      };

    case FETCH_USAGE_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        utterances: []
      };

    case SET_ALL_UTTERANCES_FILTER:
      return {
        ...state,
        filter: action.filter
      };

    default:
      return state;
  }
}
