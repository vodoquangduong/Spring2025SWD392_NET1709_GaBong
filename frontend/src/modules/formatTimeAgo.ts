import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
dayjs.extend(relativeTime);

export const formatTimeAgo = (dateString: string) => {
  return dayjs(dateString).fromNow();
};
