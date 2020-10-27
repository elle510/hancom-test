// https://krpeppermint100.medium.com/js-react-hooks%EB%A1%9C-carousel-slider-%EB%A7%8C%EB%93%A4%EA%B8%B0-2e558151bbee
import React, {
    useState,
    useEffect,
    // useMemo,
    useCallback,
    useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Slide from './Slide';

import './style.scss';

// const TOTAL_SLIDES = 2;

// 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
// const Container = styled.div`
//     width: 60%;
//     overflow: hidden;
// `;

// const Button = styled.button`
//     all: unset;
//     border: 1px solid coral;
//     padding: 0.5em 0.5em;
//     color: coral;
//     border-radius: 10px;
//     &:hover {
//         transition: all 0.3s ease-in-out;
//         background-color: coral;
//         color: #fff;
//     }
// `;

// const ButtonStyle = { 
//     border: '1px solid coral',
//     padding: '0.5em 0.5em',
//     color: 'coral',
//     borderRadius: '10px',
// };

// 이미지들을 가로로 나열합니다.
const SliderContainer = styled.div`
    width: 100%;
    display: flex;
`;

const Slider = (props) => {
    const { items } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const TOTAL_SLIDES = items.length || 0;

    const nextSlide = useCallback(() => {
        if (currentSlide >= TOTAL_SLIDES) {
            // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }, [TOTAL_SLIDES, currentSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }, [TOTAL_SLIDES, currentSlide]);

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        const movePx = currentSlide * 120;
        slideRef.current.style.transform = `translateX(-${movePx}px)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    return (
        <div style={{ display: 'flex' }}>
            {/* <Button onClick={prevSlide} disabled>◀</Button> */}
            <button 
                type="button" 
                onClick={prevSlide} 
                disabled={currentSlide === 0} 
                style={{ cursor: currentSlide === 0 ? 'default' : 'pointer'}}
            >
                ◀
            </button>
            <div style={{ width: '60%', overflow: 'hidden' }}>
                <div style={{ width: '100%', textAlign: 'center' }}>{currentSlide}</div>
            
                <SliderContainer ref={slideRef}>
                    {items && items.length > 0 
                        ? items.map((item) => {
                            return <Slide key={uuidv4()} item={item} />;
                        }) 
                        : <div style={{ width: '100%', textAlign: 'center' }}>데이터 없음</div>
                    }
                    {/* <Slide img={img1} />
                <Slide img={img2} />
                <Slide img={img3} /> */}
                </SliderContainer>
            </div>
            {/* <Button onClick={nextSlide}>▶</Button> */}
            <button 
                type="button" 
                onClick={nextSlide} 
                disabled={TOTAL_SLIDES === currentSlide + 1 || TOTAL_SLIDES === 0 } 
                style={{ cursor: TOTAL_SLIDES === currentSlide + 1 || TOTAL_SLIDES === 0 
                    ? 'default' 
                    : 'pointer' 
                }}
            >
                ▶
            </button>
        </div>
    );
};

export default Slider;
