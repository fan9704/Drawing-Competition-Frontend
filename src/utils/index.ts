interface StateList {
  [key: string]: string;
}
const stateList: StateList = {
  "success": "✅",
  "todo": "🔷",
  "doing": "🔶",
  "failed": "❌",
};

const getChallengeStatusIcon = (state: string): string => {
  return stateList[state];
}
const getDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);

  // 設定時區為"Asia/Taipei"
  date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' });

  // 格式化日期和時間
  const formattedDateTimeString = date.toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return formattedDateTimeString;
}

const getServerURL = (image_url: any = 0) => {
  return import.meta.env.VITE_IMAGE_URL + image_url
}

export { getChallengeStatusIcon, getDateTime, getServerURL }
