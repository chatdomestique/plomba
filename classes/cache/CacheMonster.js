export class CacheMonster {
	constructor(fetchFunction) {
		this._fletcher = fetchFunction;
		this.cache = new Map();
	}
	async fetch(objectId) {
		const data = await this._fletcher(objectId);
		this.cache.set(objectId, data);

		return data;
	}
	async get(objectId) {
		let data = this.cache.get(objectId);
		if (data === undefined) {
			data = await this.fetch(objectId);
		}

		return data;
	}
	acquire(objectId) {
		return this.cache.get(objectId);
	}
	forEach(forEachFunction) {
		this.cache.forEach((object) => {
			forEachFunction(object.id);
		});
	}
}
