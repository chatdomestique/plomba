import { WebsocketClient } from "./WebsocketClient.js";
import { Message } from "../ext/Message.js";

import EventEmitter from "eventemitter3";

export class LiveWebsocketClient extends EventEmitter {
	constructor() {
		super();
		this.live = new WebsocketClient("wss://api.chat.eqilia.eu/api/v0/live/ws");
	}
	applyEvents() {
		this.live.on("message", (msg) => {
			switch (msg.type) {
			case "authStatus":
				if (msg.payload.success) {
					this.emit("authStatus", true);
					this.emit("debug", "Authentication successful");
				} else {
					this.live.suicide();
					this.emit("debug", "Authentication failed");
					this.emit("authStatus", false);
				}
				break;
			case "messageCreate":
				this.emit("messageCreate", new Message(msg.payload));
				break;
			case "guildAvailable":
				this.emit("guildAvailable", msg.payload.uuid);
				break;
			case "channelAvailable":
				this.emit("channelAvailable", msg.payload.uuid);
				break;
			case "serverFinished":
				this.emit("serverFinished");
				break;
			default:
				this.emit("debug", `Unhandled event ${msg.type} received!`);
				break;
			}
		});
	}
	login(token) {
		this.applyEvents();
		this.live.login(token);
	}
}
