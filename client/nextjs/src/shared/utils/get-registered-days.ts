import dayjs, { ConfigType } from 'dayjs';

export function getRegisteredDays(date: ConfigType) {
  const registrationDate = dayjs(date);
  const now = dayjs();
  const daysPassed = now.diff(registrationDate, 'day');

  return daysPassed;
}
