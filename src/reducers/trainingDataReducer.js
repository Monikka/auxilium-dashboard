import {
  FETCH_TRAINING_DATA_REQUESTED,
  FETCH_TRAINING_DATA_RECEIVED,
  FETCH_TRAINING_DATA_FAILED
} from "../actions/getTrainingData";

const initialState = {
  loading: false,
  error: null,
  data: []
};

export default function trainingDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRAINING_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TRAINING_DATA_RECEIVED:
      return {
        ...state,
        loading: false,
        data: action.payload.trainingData
      };

    case FETCH_TRAINING_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
