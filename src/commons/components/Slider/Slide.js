import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
    width: 100%;
    height: 70vh;
`;

const Slide = (props) => {
    const { img } = props;

    return <IMG src={img} />;
};

export default Slide;
