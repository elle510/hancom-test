import React, {
    useState,
    // useEffect,
    // useMemo,
    useCallback,
    // useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import * as api from '../api';

const List = (props) => {
    const { routes } = props;
    const [word, setWord] = useState('');

    // useEffect(() => {
    //     console.log('props', props);
    //     api.search('스포츠');
    // }, []);

    const handleChange = useCallback((e) => {
        setWord(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        api.search(word);
    }, [word]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.keyCode === 13) {
                handleSubmit();
            }
        },
        [handleSubmit],
    );

    // https://www.googleapis.com/youtube/v3/search?part=snippet&q=sports&type=video&key=AIzaSyBvQVSuIt4gEeRdpvcM6Fy1GzqYOtSBexM
    return (
        <div className="page">
            <div className="page-header">header</div>
            <div
                className="page-content"
                // className="page-content page-has-grid" / content안 그리드 있을때 클래스
            >
                <label>
                    <input
                        type="text"
                        value={word}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </label>
                <button type="button" onClick={handleSubmit}>
                    검색
                </button>
                <Link to="/list/player">Player</Link>
                {routes.map((route) => (
                    <RouteWithSubRoutes key={uuidv4()} {...route} />
                ))}
            </div>
        </div>
    );
};

export default List;
