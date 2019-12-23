import {
  FETCH_MISSED_USAGE_DATA_REQUESTED,
  FETCH_MISSED_USAGE_DATA_RECEIVED,
  FETCH_MISSED_USAGE_DATA_FAILED,
  SET_MISSED_UTTERANCES_FILTER
} from "../actions/getMissedUsageData";
import {UtterancesFilters} from "../actions";

const initialState = {
  filter: UtterancesFilters.PAST_MONTH,
  loading: false,
  error: null,
  utterances: []
};

export default function missedUtterances(state = initialState, action) {
  switch (action.type) {
    case FETCH_MISSED_USAGE_DATA_REQUESTED:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MISSED_USAGE_DATA_RECEIVED:
        return {
          ...state,
          loading: false,
          utterances: action.payload.utterances
        };

    case FETCH_MISSED_USAGE_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        utterances: []
      };

      case SET_MISSED_UTTERANCES_FILTER:
        return {
          ...state,
          filter: action.filter
        };

    default:
      return state;
  }
}
