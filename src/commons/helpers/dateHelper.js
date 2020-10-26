import moment from 'moment';

const isMoment = (m) => {
    return moment.isMoment(m);
};

export const getTimestamp = (d) => {
    // // moment 일 경우 date 타입일 경우 체크 해서 timestamp 로 리턴하는 것으로 개선
    // if (!moment.isMoment(m)) {
    //     const msg = 'getTimestamp is used [moment] type as an argument';
    //     console.error(msg);
    //     throw new Error(msg);
    // }
    // return m.valueOf();

    // Date
    // typeof d.getMonth === 'function'
    if (d instanceof Date) {
        return moment(d).valueOf();
    }

    // moment
    if (moment.isMoment(d)) {
        return d.valueOf();
    }

    const msg = 'getTimestamp is used [Date or moment] type as an argument';
    console.error(msg);
    throw new Error(msg);
};

export const getRangeTimestamp = (dates, isSetTime = false) => {
    if (!(Array.isArray(dates) && dates.length === 2)) {
        const msg = 'getRangeTimestamp is used [array] type as an argument';
        console.error(msg);
        throw new Error(msg);
    }
    if (!isMoment(dates[0]) || !isMoment(dates[1])) {
        const msg = 'array\'s elements must be [moment] type.';
        console.error(msg);
        throw new Error(msg);
    }
    if (!isSetTime) {
        // dates[0].hours(0);
        dates[0].minutes(0);
        dates[0].seconds(0);
        dates[0].milliseconds(0);

        // dates[1].hours(23);
        dates[1].minutes(59);
        dates[1].seconds(59);
        dates[1].milliseconds(999);
    }
    return [getTimestamp(dates[0]), getTimestamp(dates[1])];
};

export const getRangeTimestampCustom = (dates, isSetTime) => {
    if (!(Array.isArray(dates) && dates.length === 2)) {
        const msg = 'getRangeTimestampCustom is used [array] type as an argument';
        console.error(msg);
        throw new Error(msg);
    }
    if (!isMoment(dates[0]) || !isMoment(dates[1])) {
        const msg = 'array\'s elements must be [moment] type.';
        console.error(msg);
        throw new Error(msg);
    }
    if (!isSetTime) {
        // dates[0].hours(0);
        dates[0].minutes(0);
        dates[0].seconds(0);
        dates[0].milliseconds(0);

        // dates[1].hours(23);
        dates[1].minutes(59);
        dates[1].seconds(59);
        dates[1].milliseconds(999);
    }
    dates[0].seconds(0);
    dates[0].milliseconds(0);

    // dates[1].hours(23);
    dates[1].seconds(59);
    dates[1].milliseconds(999);
    return [getTimestamp(dates[0]), getTimestamp(dates[1])];
};

export const getMoment = (d) => {
    // Date
    // typeof d.getMonth === 'function'
    if (d instanceof Date) {
        return moment(d);
    }
    // Unix Timestamp
    if (typeof d === 'number' && Math.floor(d) === d) {
        return moment(d);
    }

    const msg = 'getMoment is used [Date or Unix Timestamp] type as an argument';
    console.error(msg);
    throw new Error(msg);
};

export const getStringTime = (long) => {
    let displayDate;
    let fmt = 'YYYY-MM-DD';
    fmt = `${fmt} HH:mm:ss`;
    // Unix Timestamp
    if (typeof long === 'number' && Math.floor(long) === long) {
        displayDate = moment.unix(long).format(fmt);
    } else if (long instanceof Date) { // typeof long.getMonth === 'function'
        displayDate = moment(long).format(fmt);
    } else if (moment.isMoment(long)) {
        displayDate = long.format(fmt);
    } else if (long === null || typeof long === 'undefined') {
        displayDate = '-';
    }
    return displayDate;
};

export const getDateString = (long, showTime = false) => {
    let displayDate;
    let fmt = 'YYYY-MM-DD';
    if (showTime === true) {
        fmt = `${fmt} HH:mm:ss`;
    }
    // Unix Timestamp
    if (typeof long === 'number' && Math.floor(long) === long) {
        displayDate = moment(long).format(fmt);
    } else if (long instanceof Date) { // typeof long.getMonth === 'function'
        displayDate = moment(long).format(fmt);
    } else if (moment.isMoment(long)) {
        displayDate = long.format(fmt);
    } else if (long === null || typeof long === 'undefined') {
        displayDate = '-';
    }

    return displayDate;
};

export const zerofillString = (num) => {
    if (Number.isNaN(num)) return '00';
    return num < 10 ? `0${num}` : num.toString();
};

export const getInventoryDateString = (long, showTime = false) => {
    let fmt = 'YYYY-MM-DD';
    if (showTime === true) {
        fmt = `${fmt} HH:mm:ss`;
    }

    return moment(long).format(fmt);
};

export const convertLongToDate = (long, showTime = false) => {
    let fmt = 'YYYYMMDD';
    if (showTime === true) {
        fmt = `${fmt}HHmmss`;
    }

    return moment(long).format(fmt);
};

// Grid Date Filter
export const dateFilterParams = {
    comparator: (date, cellValue) => {
        if (!cellValue) return -1;
        const dateAsTimestamp = getTimestamp(date);
        const cellValueMoment = getMoment(cellValue).hours(0).minutes(0).seconds(0);
        const cellValueTimestamp = getTimestamp(cellValueMoment);
        if (dateAsTimestamp === cellValueTimestamp) {
            return 0;
        }
        if (cellValueTimestamp < dateAsTimestamp) {
            return -1;
        }
        // if (cellValueTimestamp > dateAsTimestamp) {
        //     return 1;
        // }
        return 1;
    },
    // browserDatePicker: true,
    suppressAndOrCondition: true,
};
