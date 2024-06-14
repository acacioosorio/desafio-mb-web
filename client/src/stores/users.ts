import { defineStore } from "pinia";
import { signIn } from '../services/userService'

export const useUsersStore = defineStore({
	id: "users-store",
	state: () => {
		return {
			signIn: {
				status: 'init'
			},
		}
	},
	actions: {
		async signInUser(params: any) {		
			this.signIn.status = 'pending'	
			try {
				let { data } = await signIn(params)
				console.log("signInUser Response !", data)
				return data
				this.signIn.status = 'init'	
			} catch (error) {
				throw error
				this.signIn.status = 'error'	
			}
		},
	},
	getters: {
		getsignInStatus: (state) => state.signIn.status,
	}
})