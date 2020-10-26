// 이상감지 color
export const getAnomalyColor = (value) => {
    if (value >= 90) {
        return '#f40000';
    }
    if (value >= 80) {
        return '#eb6700';
    }
    if (value >= 50) {
        return '#f3ac00';
    }
    if (value >= 30) {
        return '#9acd32';
    }
    return '#00ad00';
};

export const getAnomalyRangeColor = () => {
    return [
        '#00ad00',
        '#00ad00',
        '#00ad00',
        '#9acd32',
        '#9acd32',
        '#f3ac00',
        '#f3ac00',
        '#f3ac00',
        '#eb6700',
        '#f40000',
        '#f40000',
    ];
};

// 알람 color
export const getAlarmColor = (color) => {
    const colorStr = color.toLowerCase();

    let levelColor = '#00ad00';
    if (colorStr === 'green') {
        levelColor = '#00ad00';
    } else if (colorStr === 'gold') {
        levelColor = '#f3ac00';
    } else if (colorStr === 'orange') {
        levelColor = '#eb6700';
    } else if (colorStr === 'red') {
        levelColor = '#f40000';
    } else if (colorStr === 'gray') {
        levelColor = '#606060';
    } else if (colorStr === 'sky') {
        levelColor = '#00c3f4';
    } else if (colorStr === 'azure') {
        levelColor = '#0077e7';
    } else if (colorStr === 'burgundy') {
        levelColor = '#be2649';
    } else if (colorStr === 'purple') {
        levelColor = '#a234e1';
    } else if (colorStr === 'teal') {
        levelColor = '#00638c';
    } else if (colorStr === 'coral') {
        levelColor = '#ff583f';
    } else if (colorStr === 'lime') {
        levelColor = '#8ced0e';
    }
    return levelColor;
};

// 가용성 color
export const getAvailabilityColor = (status, upColor = '#62b515') => {
    const statusStr = status && status.toLowerCase();

    let availabilityColor = upColor;

    if (statusStr === 'down') {
        availabilityColor = '#f22121';
    } else if (statusStr === 'disabled') {
        availabilityColor = '#545454';
    } else if (statusStr === 'unknown') {
        availabilityColor = '#f47320';
    }

    return availabilityColor;
};
