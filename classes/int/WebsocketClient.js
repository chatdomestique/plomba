import EventEmitter from "eventemitter3";
import WebSocket from "isomorphic-ws";

export class WebsocketClient extends EventEmitter {
	constructor(gatewayUrl) {
		super();
		this.gatewayUrl = gatewayUrl;
		this.suicide = false;
	}
	connect(token) {
		this.token = token;
		this.ws = new WebSocket(this.gatewayUrl, [this.token]);

		return this.ws;
	}
	applyEvents() {
		this.ws.onerror = (e) => {
			this.emit("error", e);
		}

		this.ws.onopen = () => {
			this.emit("open");
		}

		this.ws.onclose = async () => {
			this.emit("close");

			if (this.suicide) {
				return;
			}

			await new Promise((a) => setTimeout(a, 500));
			this.login(String(this.token));
		}

		this.ws.onmessage = (data) => {
			let message;

			try {
				message = JSON.parse(data.data);

				if (typeof message !== "object" || message === null) throw new Error("nope");
			} catch (e) {
				console.log(e);
				return;
			}

			this.emit("message", message);
			return;
		}
	}
	suicide() {
		this.suicide = true;
		this.ws.close();
	}
	login(token) {
		this.connect(token);
		this.applyEvents(this.ws);
	}
}
