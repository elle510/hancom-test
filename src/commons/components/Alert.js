import { Alert as PSAlert } from 'polestar-ui-kit';

PSAlert.config({ top: 100, duration: 2 });

const Alert = {
    success(text, duration, onClose) {
        PSAlert.success(text, duration, onClose);
    },
    error(text, duration = 5, onClose) {
        PSAlert.error(text, duration, onClose);
    },
    warning(text, duration, onClose) {
        PSAlert.warning(text, duration, onClose);
    },
    info(text, duration, onClose) {
        PSAlert.info(text, duration, onClose);
    },
};

export default Alert;
