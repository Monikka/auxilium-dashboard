import { combineReducers } from "redux";
import missedUtterances from "./missedUtterances";
import trainingDataReducer from "./trainingDataReducer";
import detectedUtterances from "./detectedUtterances";
import allUtterances from "./allUtterances";


// all the reducers MUST BE added here to work
export default combineReducers({
  allUtterances: allUtterances,
  detected: detectedUtterances,
  missed: missedUtterances,
  trainingData: trainingDataReducer
});
