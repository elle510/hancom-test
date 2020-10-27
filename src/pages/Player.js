/* eslint-disable jsx-a11y/iframe-has-title */
import React, {
    // useState,
    useEffect,
    // useMemo,
    // useCallback,
    useRef,
} from 'react';
import { useParams /* , useLocation */ } from 'react-router-dom';

const Player = () => {
    const player = useRef(null);
    const done = useRef(false);

    const { videoId } = useParams();
    // const location = useLocation();
    // const { state: { videoId } } = location;

    const onPlayerReady = (e) => {
        // console.log('onPlayerReady');
        e.target.playVideo();
    };

    const onPlayerStateChange = (e) => {
        // console.log('onPlayerStateChange', e.data);
        if (e.data === window.YT.PlayerState.PLAYING && !done.current) {
            // setTimeout(() => {
            //     player.current.stopVideo();
            // }, 6000);
            done.current = true;
        }
    };

    useEffect(() => {
        if (window.YT) {
            // console.log('===111 window.YT', window.YT);
            // window.onYouTubeIframeAPIReady = () => {
            //     console.log('onYouTubeIframeAPIReady');
            //     // eslint-disable-next-line no-unused-vars
            //     player.current = new window.YT.Player('player', {
            //         height: '360',
            //         width: '640',
            //         videoId: 'M7lc1UVf-VE',
            //         playerVars: {
            //             autoplay: 1,
            //             controls: 0,
            //             fs: 0,
            //         },
            //         events: {
            //             'onReady': onPlayerReady,
            //             'onStateChange': onPlayerStateChange
            //         }
            //     });
            // }
            player.current = new window.YT.Player('player', {
                height: '360',
                width: '640',
                // videoId: 'M7lc1UVf-VE',
                // videoId: 'yCcaWFUhROw',
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    fs: 0,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }else {
            console.error('can not load player');
        }
    }, []);

    useEffect(() => {
        // console.log('===222 videoId', videoId);
        if (typeof player.current.loadVideoById === 'function') {
            player.current.loadVideoById(videoId);
        }
    }, [videoId]);

    return (
        <div id="player" />
    );
}

export default Player
