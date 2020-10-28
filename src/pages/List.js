import React, {
    useState,
    // useEffect,
    // useMemo,
    useCallback,
    // useRef,
} from 'react';
import { BrowserRouter as Router, /* Link, */ Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Slider } from 'commons/components';

import RouteWithSubRoutes from '../routes/RouteWithSubRoutes';
import * as api from '../api';

const List = (props) => {
    const { routes } = props;
    // console.log('routes', routes);
    const [word, setWord] = useState('');
    const [searchItems, setSearchItems] = useState([]);

    // useEffect(() => {
    //     console.log('props', props);
    //     api.search('스포츠');
    // }, []);

    const handleChange = useCallback((e) => {
        setWord(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        // https://console.developers.google.com/apis
        // https://developers.google.com/youtube/v3/docs/search
        api.search(word).then(response => {
            const { items } = response;
            // const _items = items.map(item => {
            //     const { snippet } = item;
            //     return snippet;
            // });
            setSearchItems(items);
        }); 
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
        <Router>
            <div className="page">
                {/* <div className="page-header">
                    <Link to="/list/yCcaWFUhROw">Player</Link>
                </div> */}
                <div
                    className="page-content"
                >
                    <div>
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
                    </div>
                    <Slider items={searchItems} />
                    <Switch>
                        {routes.map((route) => (
                            <RouteWithSubRoutes key={uuidv4()} {...route} />
                        ))}
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default List;
