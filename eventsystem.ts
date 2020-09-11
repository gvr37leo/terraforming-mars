class Box<T>{
    beforeChange:EventSystem<T> = new EventSystem()
    afterChange:EventSystem<T> = new EventSystem()

    constructor(public value:T){

    }

    get():T{
        return this.value
    }

    set(val:T){
        if(val != this.value){
            this.beforeChange.trigger(this.value)
            this.value = val
            this.afterChange.trigger(this.value)
        }
    }
}

class PEvent<T>{
    cbset:Set<EventListeneras<T>> = new Set()
    handled:boolean = false

    constructor(public value:T){

    }
    
}

type EventListeneras<T> = (val:T,e:PEvent<T>) => void

class EventSystem<T>{
    listeners:EventListeneras<T>[] = []

    constructor(){

    }

    listen(cb:EventListeneras<T>){
        this.listeners.push(cb)
    }

    trigger(val:T){
        this.continue(new PEvent(val)) 
    }

    continue(e:PEvent<T>){
        for (var cb of this.listeners) {
            if(e.cbset.has(cb) == false){
                e.cbset.add(cb)
                cb(e.value,e)
                if(e.handled){
                    break
                }
            }
        }
    }
}