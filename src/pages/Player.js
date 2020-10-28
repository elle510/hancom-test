/* eslint-disable jsx-a11y/iframe-has-title */
import React, {
    // useState,
    useEffect,
    // useMemo,
    useCallback,
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

    // Size 조정
    const startX = useRef(0);
    const startY = useRef(0);
    const startWidth = useRef(640);
    const startHeight = useRef(360);
    const videoWidth = useRef(640);
    const videoHeight = useRef(360);

    const handleSize = useCallback(() => {
        const resizer = document.getElementById('resizer');
        resizer.style.left = '640px';

        player.current.setSize(640, 360);
    },[]);

    const handleResizerMove = useCallback((e) => {
        videoWidth.current = startWidth.current + e.clientX - startX.current;
        videoHeight.current = startHeight.current + e.clientY - startY.current;

        const resizer = document.getElementById('resizer');
        resizer.style.left = `${videoWidth.current}px`;
        // console.log('handleResizerMove', startX, startY);
        player.current.setSize(videoWidth.current, videoHeight.current);
    }, []);

    const handleResizerUp = useCallback(() => {
        startWidth.current = videoWidth.current;
        startHeight.current = videoHeight.current;

        document.documentElement.removeEventListener('mousemove', handleResizerMove, false);    
        document.documentElement.removeEventListener('mouseup', handleResizerUp, false);
    }, [handleResizerMove]);

    const handleResizerDown = useCallback((e) => {
        startX.current = e.clientX;
        startY.current = e.clientY;

        document.documentElement.addEventListener('mousemove', handleResizerMove, false);
        document.documentElement.addEventListener('mouseup', handleResizerUp, false);

        // const iframe = document.getElementById('player');
        // iframe.addEventListener("load", () => {
        //     console.log('load');
        //     iframe.contentWindow.document.body.addEventListener('mousemove', handleResizerMove, false);
        //     iframe.contentWindow.document.body.addEventListener('mouseup', handleResizerUp, false);
        // }, false);
        // iframe.contentWindow.document.body.addEventListener('mousemove', handleResizerMove, false);
        // iframe.contentWindow.document.body.addEventListener('mouseup', handleResizerUp, false);
        
    }, [handleResizerMove, handleResizerUp]);

    return (
        <div style={{ marginTop: '5px', position: 'relative' }}>
            <div id="player" onLoad={() => { console.log('onLoad'); }} />
            <div 
                id="resizer"
                style={{
                    width: '10px',
                    height: '10px',
                    background: 'blue',
                    position: 'absolute',
                    // right: 0,
                    // bottom: 0,
                    left: 640,
                    bottom: 0,
                    cursor: 'se-resize',
                }}
                onMouseDown={handleResizerDown}
                // onMouseMove={handleResizerMove}
                // onMouseUp={handleResizerUp}
            />
            <button type="button" style={{ marginLeft: '5px' }} onClick={handleSize}>기본크기</button>
        </div>
    );
}

export default Player
