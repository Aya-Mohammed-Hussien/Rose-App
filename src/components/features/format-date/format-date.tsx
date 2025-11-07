import { useFormatter } from 'next-intl';

export function FormattedDate() {
  const format = useFormatter();

  return (date: string | Date) =>
    format.dateTime(new Date(date), {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
}
