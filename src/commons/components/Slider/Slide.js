import React, {
    // useState,
    // useEffect,
    // useMemo,
    useCallback,
    // useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';

// const IMG = styled.img`
//     width: 100%;
//     height: 70vh;
// `;

const Slide = (props) => {
    const { item } = props;
    const { id: { videoId }, snippet: { title, thumbnails } } = item;
    const { default: { url, width, height }} = thumbnails;

    const history = useHistory();

    const handleClick = useCallback(() => {
        // const pathname = `/list/player/${node.data.id}`;
        // console.log('handleClick', props);
        const pathname = `/list/${videoId}`;
        history.push({
            pathname,
            // state: { videoId },
            // search,
        });
    }, [history, videoId]);

    return (
        <div>
            <img src={url} style={{ width, height, cursor: 'pointer' }} alt="" onClick={handleClick} />
            <div className="tooltip">
                {title.length < 5 ? title : `${title.substring(0, 5)}...`}
                <span className="tooltiptext">{title}</span>
            </div>
        </div>
    );
};

export default Slide;
