import React from // useState,
// useContext,
// useEffect,
// useCallback,
// useMemo,
'react';

import { SearchForm as PSSearchForm } from 'polestar-ui-kit';

const SearchForm = (props) => {
    return <PSSearchForm initFieldCount={2} {...props} />;
};

export default SearchForm;
