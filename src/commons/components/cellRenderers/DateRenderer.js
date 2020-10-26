import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Icon from 'polestar-icons';
import { Tooltip, LinkText } from 'polestar-ui-kit';

class DateRenderer extends Component {
    static propTypes = {
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        onClick: PropTypes.func,
    };

    static defaultProps = {
        showTime: true,
    };

    onClick = () => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.node);
        }
    }

    getFormat = () => {
        // 향 후 locale 정보와 showTime 에 따라 format 설정한다.
        const { showTime } = this.props;
        const format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

        return format;
    }

    renderDate = () => {
        const {
            value,
            blankDisplay,
        } = this.props;

        let displayDate;
        const fmt = this.getFormat();

        // Unix Timestamp
        if (typeof value === 'number' && Math.floor(value) === value) {
            displayDate = moment(value).format(fmt);
        } else if (value instanceof Date) { // typeof value.getMonth === 'function'
            displayDate = moment(value).format(fmt);
        } else if (moment.isMoment(value)) {
            displayDate = value.format(fmt);
        } else if (!value || typeof value === 'undefined') {
            displayDate = blankDisplay;
        } else {
            displayDate = 'Invalid Date';
        }

        return <Tooltip placement="topLeft" title={displayDate}> {displayDate} </Tooltip>;
    }

    renderIcon = () => {
        const { icon, node } = this.props;

        const _icon = typeof icon === 'function' ? icon(node) : icon;
        const iconEl = typeof _icon === 'string' ? <Icon name={_icon} /> : _icon;
        return iconEl;
    }

    render() {
        return (
            <span className="grid-renderer">
                {this.renderIcon()}
                {this.props.onClick
                    ? (
                        <LinkText
                            text={this.renderDate()}
                            onClick={this.onClick}
                        />
                    )
                    : this.renderDate()}
            </span>
        );
    }
}

export default DateRenderer;
