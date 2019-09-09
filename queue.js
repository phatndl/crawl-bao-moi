var Queue = class _Queue{
    constructor(elNumber){
        this.data = [];
        this.elNumber = elNumber;
    }

    get length(){
        return this.data.length;
    }

    get first(){
        return this.data[0];
    }

    get last(){
        return this.data[this.length - 1];
    }

    add(record){
        if (this.length < this.elNumber){
            this.data.unshift(record);
            return true;
        }
        return false;
    }

    remove(){
        this.data.pop();
    }


}

module.exports = Queue;