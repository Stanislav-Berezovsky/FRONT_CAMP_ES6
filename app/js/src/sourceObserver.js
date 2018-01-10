export default class SourceObserver {
	constructor(){
		this.subscribers = [];
	}

    addSubscription(subscriber) { 
    	this.subscribers.push(subscriber);
    }

    removeSubscription(subscriber) {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);
    }

    setSourceValue(sourceValue){
    	this.sourceValue = sourceValue;
    	this.notifySubscrivers();
    }

    notifySubscrivers() {
        this.subscribers.forEach((subscriber) => subscriber.update(this.sourceValue));
    }
}