import moment from 'moment';
import { langChooseG } from '../components/Configuration/Configuration';

export default (lang, date) => {
    const langChoose = (params) => langChooseG(lang, params);
    const time = moment(date);
    const now = moment();
    if (now.diff(time, "seconds") < 60) {
        return now.diff(time, "seconds") + langChoose({ ja: " 秒前", en: " seconds ago" });
    }
    if (now.diff(time, "minutes") < 60) {
        return now.diff(time, "minutes") + langChoose({ ja: " 分前", en: " minutes ago" });
    }
    if (now.diff(time, "hours") < 24) {
        return now.diff(time, "hours") + langChoose({ ja: " 時間前", en: " hours ago" });
    }
    if (now.diff(time, "days") < 6) {
        return now.diff(time, "days") + langChoose({ ja: " 日前", en: " days ago" });
    }
    return time.format({ ja: "YYYY/MM/DD", en: "Do MMM YYYY" } + " hh:mm");
}