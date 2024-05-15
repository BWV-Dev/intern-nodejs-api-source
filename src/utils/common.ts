import moment from 'moment';

/**
 * Display date under a specific format
 * @param format
 * @param date
 */
export function toStringDate(
  date?: string | Date,
  format?: string,
): string | undefined {
  format = format || 'YYYY/MM/DD';
  return date ? moment(date).format(format) : date;
}
