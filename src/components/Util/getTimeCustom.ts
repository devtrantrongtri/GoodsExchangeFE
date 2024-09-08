import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getRelativeTime(timestamp: number) {
  const postDate = dayjs(timestamp);
  const now = dayjs();

  const diffInMinutes = now.diff(postDate, 'minute');
  const diffInHours = now.diff(postDate, 'hour');
  const diffInDays = now.diff(postDate, 'day');

  if (diffInMinutes < 1) {
    return 'Vừa đăng'; // less than 1 minute ago
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`; // less than 1 hour
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`; // less than 1 day
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`; // less than 1 week
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} tuần trước`; // less than 1 month
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} tháng trước`; // less than 1 year
  } else {
    return `${Math.floor(diffInDays / 365)} năm trước`; // 1 year or more
  }
}
