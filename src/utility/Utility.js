import Moment from "moment";

export function parseDate(input, format) {
  Moment.locale("en");
  return Moment(input).format(format);
}
export function parseTime(input, format) {
  Moment.locale("en");
  return Moment(input).format(format);
}
 