// https://krpeppermint100.medium.com/js-react-hooks%EB%A1%9C-carousel-slider-%EB%A7%8C%EB%93%A4%EA%B8%B0-2e558151bbee
import React, {
    useState,
    useEffect,
    // useMemo,
    useCallback,
    useRef,
} from 'react';
import styled from 'styled-components';

import Slide from './Slide';

const TOTAL_SLIDES = 2;

// 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
const Container = styled.div`
    width: 60%;
    overflow: hidden;
`;

const Button = styled.button`
    all: unset;
    border: 1px solid coral;
    padding: 0.5em 2em;
    color: coral;
    border-radius: 10px;
    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: coral;
        color: #fff;
    }
`;

// 이미지들을 가로로 나열합니다.
const SliderContainer = styled.div`
    width: 100%;
    display: flex;
`;

const Slider = (props) => {
    const { items } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    const nextSlide = useCallback(() => {
        if (currentSlide >= TOTAL_SLIDES) {
            // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }, [currentSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }, [currentSlide]);

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    return (
        <Container>
            {currentSlide}
            <SliderContainer ref={slideRef}>
                {items.map((item) => {
                    return <Slide img={item} />;
                })}
                {/* <Slide img={img1} />
                <Slide img={img2} />
                <Slide img={img3} /> */}
            </SliderContainer>
            <Button onClick={prevSlide}>Previous Slide</Button>
            <Button onClick={nextSlide}>Next Slide</Button>
        </Container>
    );
};

export default Slider;
