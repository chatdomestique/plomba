import { ApiClient } from "../int/ApiClient.js";
import { LiveWebsocketClient } from "../int/LiveWebsocketClient.js";
import { CacheMonster } from "../cache/CacheMonster.js";
import { EventEmitter } from "eventemitter3";
import { Semaphore } from "../sync/Semaphore.js";
import { Message } from "../ext/Message.js"

export class Client extends EventEmitter {
	constructor() {
		super();

		this.gatewayUrl = "wss://api.chat.eqilia.eu/api/v0/live/ws";

		this.live = new LiveWebsocketClient();

		this.api = new ApiClient("https://api.chat.eqilia.eu/api/v0");
		this.initial = {};
		this.initial.guildIds = [];
		this.initial.channelIds = [];
		this.initial.semaphore = new Semaphore();

		this.guilds = new CacheMonster((objectId) => this.api.data.getGuildData(objectId));
		this.channels = new CacheMonster((objectId) => this.api.data.getChannelData(objectId));
		this.users = new CacheMonster((objectId) => this.api.data.getUserData(objectId));
		// this.messages = new CacheMonster((objectId) => this.api.data.getMessageData(objectId));
	}

	applyEvents() {
		this.initial.semaphore.increase();

		this.initial.semaphore.promise().then(() => {
			this.emit("ready");
		});

		this.live.on("debug", (str) => {
			this.emit("debug", `[Live] ${str}`);
		});
		this.live.on("self", async (userId) => {
			this.self = await this.users.get(this.live.self);
		});
		this.live.on("guildAvailable", (guildId) => {
			this.initial.semaphore.increase();
			this.initial.guildIds.push(guildId);
		});
		this.live.once("serverFinished", async () => {
			for (let i = 0; i < this.initial.guildIds.length; i++) {
				const guildId = this.initial.guildIds[i];
				const guild = await this.guilds.get(guildId);

				for (let j = 0; j < guild.channelIds.length; j++) {
					this.initial.channelIds.push(guild.channelIds[i]);
					this.initial.semaphore.increase();
				}

				this.initial.semaphore.decrease();
			}

			for (let i = 0; i < this.initial.channelIds.length; i++) {
				const channelId = this.initial.channelIds[i];
				const channel = await this.channels.get(channelId);

				this.initial.semaphore.decrease();
			}

			this.initial.semaphore.decrease();
		});
		this.live.on("messageCreate", async (message) => {
			this.emit("messageCreate", message);
		});
	}

	login(token) {
		this.live.login(token);
		this.api.login(token);
		this.applyEvents();
	}
}
