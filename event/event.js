var EventEmitter = require("events");

module.exports = class Event extends EventEmitter{
    add(event, callback){
        this.addListener(event, callback);
    }

    emitEvent(event){
        this.emit(event)
    }
}
