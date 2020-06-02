import moment from 'moment';

export default class Utils {
    static convertMinsToHHMM = (minute) => {
        const time = (new Date()).setHours(Math.floor(minute / 60), minute % 60, 0, 0);
        return moment(time).format('HHmm');
    }

    static getTimeRanges = () => {
        const timeRanges = [];
        const timeOptions = Utils.getTimeOptions();
        for (let i = 0; i < timeOptions.length; i++) {
            timeRanges.push(timeOptions[i] + ' - ' + timeOptions[(i + 1) % timeOptions.length]);
        }
        return timeRanges;
    }

    static getTimeOptions = () => {
        const timeOptions = [];
        for (let i = 0; i < 1440; i += 30) {
            timeOptions.push(Utils.convertMinsToHHMM(i));
        }
        return timeOptions;
    }

    static getTimeRange = (i, j) => {
        const timeRanges = Utils.getTimeRanges();
        const start = timeRanges[i].split(' - ')[0];
        const end = timeRanges[j].split(' - ')[1];
        return start + ' - ' + end;
    }
}