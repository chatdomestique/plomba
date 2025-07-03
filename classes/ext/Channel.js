export class Channel {
	constructor(channelDataObject) {
		this.id = channelDataObject.id;
		this.name = channelDataObject.name;
		this.topic = channelDataObject.topic;
		this.guildId = channelDataObject.guildId;
	}
}
