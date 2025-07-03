export class Message {
	constructor(messageDataObject) {
		this.id = messageDataObject.messageId;
		this.content = messageDataObject.content;
		this.creationTimestamp = messageDataObject.timestamp;
		this.channelId = messageDataObject.channelId;
		this.authorId = messageDataObject.authorId;
		this.guildId = messageDataObject.guildId;
	}
}
