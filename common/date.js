import moment from "moment";

export const convertDateFormat = (date) => {
  if (date) {
    return moment(new Date(date)).format("MMM YYYY");
  }
  return "Present";
};
