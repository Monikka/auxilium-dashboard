import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

export const FETCH_TRAINING_DATA_REQUESTED = "FETCH_TRAINING_DATA_PENDING";
export const FETCH_TRAINING_DATA_RECEIVED = "FETCH_TRAINING_DATA_RECEIVED";
export const FETCH_TRAINING_DATA_FAILED = "FETCH_TRAINING_DATA_FAILED";

export const setLoading = () => ({
  type: FETCH_TRAINING_DATA_REQUESTED
});

export const setTrainingData = trainingData => ({
  type: FETCH_TRAINING_DATA_RECEIVED,
  payload: { trainingData }
});

export const setError = error => ({
  type: FETCH_TRAINING_DATA_FAILED,
  payload: { error }
});

export function fetchTrainingData() {
  return dispatch => {
    dispatch(setLoading());

    let lexModel = new AWS.LexModelBuildingService();
    var botParams = {
      name: process.env.REACT_APP_BOT_NAME,
      versionOrAlias: "$LATEST"
    };

    var intentParams = {
      version: "$LATEST",
      name: ""
    };

    var getBotInfo = lexModel.getBot(botParams).promise();

    getBotInfo
      .then(data => {
        if (data) {
          var promises = [];

          data.intents.forEach(intent => {
            intentParams.name = intent.intentName;
            var getIntentInfo = lexModel.getIntent(intentParams).promise();

            promises.push(
              getIntentInfo
                .then(function(intentData) {
                  return getIntentData(intentData);
                })
                .catch(err => dispatch(setError(err)))
            );
          });
        }

        Promise.all(promises)
          .then(trainingData => {
            dispatch(setTrainingData(trainingData));
          })
          .catch(err => dispatch(setError(err)));
      })
      .catch(err => dispatch(setError(err)));
  };
}

function getIntentData(intentData) {
  var numOfUtterances = intentData.sampleUtterances.length;
  var response = {
    userUtterances: [],
    botMessages: []
  };

  if (numOfUtterances > 0) {
    response.userUtterances.push(intentData.sampleUtterances[0]);

    if (numOfUtterances >= 2) {
      response.userUtterances.push(intentData.sampleUtterances[1]);
    }
  }

  var botMessages = intentData.conclusionStatement.messages;
  if (botMessages.length > 0) {
    botMessages.forEach(message => {
      response.botMessages.push(message.content);
    });
  }

  return response;
}
