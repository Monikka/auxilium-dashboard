import { createSelector } from "reselect";
import { UtterancesFilters } from "../actions";

const getDetectedMessages = state => state.detected.utterances;
const getMissedMessages = state => state.missed.utterances;
const getUsageChartFilter = state => state.allUtterances.filter;
const getDetectedTableFilter = state => state.detected.filter;
const getMissedTableFilter = state => state.missed.filter;

export const getDetectedMessagesCount = createSelector(
  [getDetectedMessages],
  detected => {
    return detected.length;
  }
);

export const selectAllUtterances = createSelector(
  [getDetectedMessages, getMissedMessages],
  (detected, missed) => {
    return detected.concat(missed);
  }
);

export const selectFilteredUtterances = createSelector(
  [selectAllUtterances, getUsageChartFilter],
  (utterances, filter) => {
    return filterUtterances(filter, utterances);
  }
);

export const selectFilteredDetectedUtterances = createSelector(
  [getDetectedMessages, getDetectedTableFilter],
  (utterances, filter) => {
    return filterUtterances(filter, utterances);
  }
);

export const selectFilteredMissedUtterances = createSelector(
  [getMissedMessages, getMissedTableFilter],
  (utterances, filter) => {
    return filterUtterances(filter, utterances);
  }
);

function filterUtterances(filter, utterances) {
  var date = new Date();
  var startDate = getStartDate(filter);

  var filtered = utterances.filter(
    message =>
      message.lastUtteredDate < date && message.lastUtteredDate >= startDate
  );

  return filtered;
}

function getStartDate(filter) {
  var startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // don't use time to compare dates.
  var startDay;

  switch (filter) {
    case UtterancesFilters.PAST_DAY:
      startDay = startDate.getDate() - 1;
      break;

    case UtterancesFilters.PAST_WEEK:
      startDay = startDate.getDate() - 7;
      break;

    // AWS Lex only saves 15 days of historical data
    case UtterancesFilters.PAST_MONTH:
    default:
      startDay = startDate.getDate() - 15;
      break;
  }

  startDate.setDate(startDay);
  return startDate;
}

export const getChartData = createSelector(
  [selectAllUtterances, getUsageChartFilter],
  (utterances, filter) => {
    var startDate = getStartDate(filter);
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    var data = new Map();

    do {
      data.set(
        startDate.toLocaleDateString("en-US", options),
        utterances.filter(message => (message.lastUtteredDate.getDate() === startDate.getDate())).length
      );
      startDate.setDate(startDate.getDate() + 1);
    } while (startDate <= date);

    return {
      labels: Array.from(data.keys()),
      values: Array.from(data.values())
    };
  }
);
