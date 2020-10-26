import { colorHelper } from 'commons/helpers';

/**
 * 가용성(AvailabilityStatus) 아이콘
 */
export const availabilityStatusIcon = (status) => {
    const statusStr = status && status.toLowerCase();
    const color = colorHelper.getAvailabilityColor(statusStr);

    if (statusStr === 'up') {
        return { name: 'arrow-circle-up', color };
    }
    if (statusStr === 'down') {
        return { name: 'arrow-circle-down', color };
    }
    if (statusStr === 'disabled') {
        return { name: 'minus-circle', color };
    }
    if (statusStr === 'unknown') {
        return { name: 'question-circle', color };
    }

    // ALL 인 경우
    return { name: 'check-circle', color: 'blue' };
};

const iconHelper = {
    availabilityStatusIcon,
};

export default iconHelper;
