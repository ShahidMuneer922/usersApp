import { format } from 'date-fns';

export function formatDate(date, formatString) {
  // Ensure that the input date is a valid Date object
  if (!(date instanceof Date)) {
    // throw new Error('Invalid date');
    return '';
  }

  // Use the format function from date-fns to format the date
  const formattedDate = format(date, formatString);

  return formattedDate;
}
export function convertTimestampToDate(timestamp) {
  // Convert seconds to milliseconds and add nanoseconds
  if (!timestamp?.seconds) return timestamp;
  const milliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

  // Create a new Date object
  const date = new Date(milliseconds);
  return date;
}
// Example usage:
