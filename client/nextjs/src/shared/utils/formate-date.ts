import dayjs from 'dayjs';

export function formatDate(date: Date | string, format: string) {
  if (date instanceof Date) {
    return dayjs(date).format(format);
  } else if (typeof date === 'string') {
    const parsedDate = dayjs(date, format); // Adjust the format as needed
    if (parsedDate.isValid()) {
      return parsedDate.format(format);
    } else {
      return 'Invalid Date';
    }
  } else {
    return 'Invalid Date';
  }
}
