import { peakFetch } from "../../extras/peakFetch.js";

export class ApiClientAuth {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
	}
	async registerAccount(username, password) {
		const regreq = await peakFetch(`${this.apiUrl}/auth/register`, {
			username,
			password
		});

		return {
			success: regreq.status === 200,
			status: regreq.status,
			payload: regreq.payload
		};
	}
	async loginAccount(username, password) {
		const regreq = await peakFetch(`${this.apiUrl}/auth/register`, {
			username,
			password
		});

		return {
			success: regreq.status === 200,
			status: regreq.status,
			payload: regreq.payload
		};
	}
	login(token) {
		this.token = token;
	}
}
