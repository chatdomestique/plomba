import EventEmitter from "eventemitter3";

export class Semaphore extends EventEmitter {
	constructor() {
		super();

		this.value = 0;
	}
	increase() {
		this.value++;
	}
	decrease() {
		if (this.value < 0) {
			throw new Error("Decreasing semaphore below zero!");
		}

		this.value--;

		if (this.value === 0) {
			this.emit("zero");
		}
	}
	promise() {
		return new Promise((resolve) => {
			this.on("zero", resolve)
		});
	}
}
