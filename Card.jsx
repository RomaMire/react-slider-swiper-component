import React from "react";
import { useRef, useState, useEffect } from "react";
import styles from "./swiper.module.scss";

export default function Card({ src, alt, idx, currSlide }) {
	const imgRef = useRef();
	const [active, setActive] = useState(false); // this state determinates the current active img and next set the style for active slide (in the middle)

	useEffect(() => {
		let windowCenter = window.innerWidth / 2;

		let cardCenterPosition = parseInt(
			Math.floor(
				imgRef?.current.offsetWidth / 2 +
					imgRef?.current.getBoundingClientRect().left
			)
		);
		let cardDistance = Math.floor(Math.abs(windowCenter - cardCenterPosition)); // you can use the  'cardDistance' as a different value for each your card - it is calculated according to its position
		imgRef.current.style.transform = `scale(${0.9})`;
		imgRef.current.style.opacity = 0.6;

		if (cardCenterPosition <= windowCenter) {
			// set the particular styles for both : the slides on the left form the middle, and the next 'if()' set styles for the slides on right from the center
			//imgRef.current.style.transform += `translate3d(0px, 0px,${-10}px)`;
			//imgRef.current.style.transform += `rotateY(${-25}deg)`;
			//imgRef.current.style.transform += `translate3d(0px, 0px,${
			//	-1 * cardDistance
			//}px)`;
			imgRef.current.style.opacity = 0.6;
		}
		if (cardCenterPosition > windowCenter) {
			//imgRef.current.style.transform += `translate3d(0px, 0px,${10}px)`;
			//imgRef.current.style.transform += `rotateY(${25}deg)`;
			//	imgRef.current.style.transform += `translate3d(0px, 0px,${
			//	-1 * cardDistance
			//	}px)`;
			imgRef.current.style.opacity = 0.6;
		}

		if (currSlide * 1 === imgRef.current.dataset.number * 1) {
			setActive(true);
			//imgRef.current.style.transform = `rotateY((0)deg)`;
			imgRef.current.style.transform = `translate3d(0px, 0px,${0}px)`;
			imgRef.current.style.transform = `scale(${1})`;
			imgRef.current.style.opacity = 1;
		} else {
			setActive(false);
		}
	}, [currSlide]);

	return (
		<>
			<div
				className={
					active
						? styles.swiper__card_box
						: `${styles.swiper__card_box} ${styles.swiper__card_box_disactive}`
				}
			>
				<img
					src={src}
					alt={alt}
					data-number={idx + 1}
					ref={imgRef}
					className={
						active ? `${styles.swiper__active}` : `${styles.swiper__disactive}`
					}
				></img>
			</div>
		</>
	);
}
