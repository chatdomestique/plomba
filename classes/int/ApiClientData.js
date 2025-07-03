import { peakFetchGET } from "../../extras/peakFetchGET.js";

export class ApiClientData {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}
	async getUserData(userId) {
		const data = await peakFetchGET(`${this.apiUrl}/data/user/${userId}`, this.token);

		if (data.status === 200) {
			return data.payload.payload;
		}

		return null;
	}
	async getChannelData(channelId) {
		const data = await peakFetchGET(`${this.apiUrl}/data/channel/${channelId}`, this.token);

		if (data.status === 200) {
			return data.payload.payload;
		}

		return null;
	}
	async getGuildData(channelId) {
		const data = await peakFetchGET(`${this.apiUrl}/data/guild/${channelId}`, this.token);

		if (data.status === 200) {
			return data.payload.payload;
		}

		return null;
	}
	login(token) {
		this.token = token;
	}
}
