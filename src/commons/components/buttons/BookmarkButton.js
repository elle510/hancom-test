import React, {
    useState,
    useCallback,
} from 'react';

import { Button, translate } from 'polestar-ui-kit';

const BookmarkButton = (props) => {
    const { bookmark: bookmarkProp } = props;
    const [bookmark, setBookmark] = useState(bookmarkProp);

    // getDerivedStateFromProps
    if (bookmarkProp !== bookmark) {
        setBookmark(bookmarkProp);
    }

    const handleClick = useCallback(() => {
        setBookmark(!bookmark);
        if (props.onClick) {
            props.onClick();
        }
    }, [bookmark, props]);

    const color = bookmark ? '#283651' : '#a9afba';
    const tooltipMessage = bookmark ? translate('deleteBookmark') : translate('addBookmark');

    return (
        <Button
            className="breadcrumb-bookmark"
            icon="bookmark"
            shape="circle"
            style={{ borderColor: `${color}`, color: `${color}` }}
            onClick={handleClick}
            tooltip={tooltipMessage}
        />
    );
};

export default BookmarkButton;
