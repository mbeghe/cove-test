import dayjs from './dateConfig';

/**
 * Utility function to format date and time for display
 * @param date - Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string): string => {
  return dayjs(date).format('h:mm A');
};
