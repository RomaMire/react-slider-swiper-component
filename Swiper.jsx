import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from "./swiper.module.scss";

import Card from "./Card";

export default function Swiper(props) {
	const { slides } = props;

	const slideWidth = 300; // the same value as in the scss card width!

	const cardsRef = useRef();

	const [index, setIndex] = useState(0);

	const [leftBtnActive, setLeftBtnActive] = useState(true);
	const [rigthBtnActive, setRigthBtnActive] = useState(true);

	let centerSlideNumber = Math.floor(slides.length / 2 + 1);
	const [currSlide, setCurrSlide] = useState(centerSlideNumber);

	const swipeRight = () => {
		setIndex((prevIndex) => prevIndex + 1);
		setCurrSlide((prevCurrSlide) => prevCurrSlide + 1);
	};

	const swipeLeft = () => {
		setIndex((prevIndex) => prevIndex - 1);
		setCurrSlide((prevCurrSlide) => prevCurrSlide - 1);
	};

	useEffect(() => {
		cardsRef.current.style.transform = `translate3d(${
			-index * slideWidth
		}px,0px,0px)`;

		if (currSlide < slides.length) {
			setRigthBtnActive(true);
		} else {
			setRigthBtnActive(false);
		}

		if (currSlide - 1 > 0) {
			setLeftBtnActive(true);
		} else {
			setLeftBtnActive(false);
		}
	}, [index, currSlide, slides.length]);

	return (
		<div className={styles.swiper}>
			<div className={styles.swiper__cards_container}>
				<div className={styles.swiper__cards_box} ref={cardsRef}>
					{slides.map((slide, index) => {
						return (
							<Card
								key={index}
								src={slide.src}
								alt={slide.alt}
								idx={index}
								currSlide={currSlide}
							></Card>
						);
					})}
				</div>
				<div className={styles.swiper__controls}>
					<button
						onClick={swipeLeft}
						disabled={!leftBtnActive}
						style={!leftBtnActive ? { opacity: `${0.5}` } : { opacity: `${1}` }}
					>
						&lt;
					</button>
					<span className={styles.swiper__numbers}>
						{currSlide + " / " + slides.length}
					</span>
					<button
						onClick={swipeRight}
						disabled={!rigthBtnActive}
						style={
							!rigthBtnActive ? { opacity: `${0.5}` } : { opacity: `${1}` }
						}
					>
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
}
