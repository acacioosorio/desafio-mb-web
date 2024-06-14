import httpService from "./httpService"

export const signIn = async (params: any): Promise<any> => {
	return httpService.post(`/registration`, params)
}