export class Guild {
	constructor(guildDataObject) {
		this.id = guildDataObject.id;
		this.name = guildDataObject.name;
		this.topic = guildDataObject.topic;
		this.channelIds = guildDataObject.channelIds;
	}
}
