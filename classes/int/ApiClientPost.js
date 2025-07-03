import { peakFetch } from "../../extras/peakFetch.js";

export class ApiClientPost {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}
	async postMessage(guildId, channelId, content) {
		const data = await peakFetch(`${this.apiUrl}/message/post`, {
			guildId,
			channelId,
			content
		}, this.token);

		console.log(data);

		if (data.status === 200) {
			return data.payload.payload;
		}

		return null;
	}
	login(token) {
		this.token = token;
	}
}
