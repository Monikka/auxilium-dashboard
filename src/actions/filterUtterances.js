import { UtterancesFilters } from "./";

export const getFilteredUtterances = (data, filter) => {
  switch (filter) {
    case UtterancesFilters.PAST_DAY:
      return data;
    case UtterancesFilters.PAST_WEEK:
      return data.filter(utterance => {
        var dateValue = new Date(utterance.lastUtteredDate);
        console.log(dateValue);
      });
    case UtterancesFilters.PAST_MONTH:
      return data;
    default:
      throw new Error("Unknown filter: " + filter);
  }
};
