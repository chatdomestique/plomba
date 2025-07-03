import { ApiClientAuth } from "./ApiClientAuth.js";
import { ApiClientData } from "./ApiClientData.js";
import { ApiClientPost } from "./ApiClientPost.js";

export class ApiClient {
	constructor(apiUrl) {
		this.auth = new ApiClientAuth(apiUrl);
		this.data = new ApiClientData(apiUrl);
		this.post = new ApiClientPost(apiUrl);
	}
	login(token) {
		this.token = token;

		this.auth.login(token);
		this.data.login(token);
		this.post.login(token);
	}
}
