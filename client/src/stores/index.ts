import { defineStore } from "pinia";

export const useUIStore = defineStore({
	id: "ui-store",
	state: () => {
		return {
			toast: {
				show: false,
				message: '',
				type: '',
			},
		}
	},
	actions: {
		async showToast(show: boolean, message: string, type: string, time: number) {

			this.toast = { show, message, type }

			setTimeout(() => {
				this.toast = {
					show: false,
					message: '',
					type: '',
				}
			}, time);
		},
	},
	getters: {
		getToast: (state) => state.toast,
	}
})