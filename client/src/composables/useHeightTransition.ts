import { nextTick } from 'vue';

type HTMLElementWithStyle = HTMLElement & {
	style: {
		height: string;
	};
	scrollHeight: number;
};

export function useHeightTransition() {
	const beforeEnter = (el: HTMLElementWithStyle) => {
		el.style.height = '0';
	};

	const enter = (el: HTMLElementWithStyle) => {
		el.style.height = `${el.scrollHeight}px`;
	};

	const afterEnter = (el: HTMLElementWithStyle) => {
		el.style.height = 'auto';
	};

	const beforeLeave = (el: HTMLElementWithStyle) => {
		el.style.height = `${el.scrollHeight}px`;
	};

	const leave = (el: HTMLElementWithStyle) => {
		el.style.height = '0';
	};

	const afterLeave = (el: HTMLElementWithStyle) => {
		el.style.height = 'auto';
	};

	const adjustHeight = () => {
		nextTick().then(() => {
			const el = document.querySelector('.step-container') as HTMLElementWithStyle | null;
			if (el) {
				el.style.height = `${el.scrollHeight}px`;
			}
		});
	};

	return {
		beforeEnter,
		enter,
		afterEnter,
		beforeLeave,
		leave,
		afterLeave,
		adjustHeight,
	};
}
