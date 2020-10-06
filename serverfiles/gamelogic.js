class EventQueue{
    constructor(){
        this.listeners = []
        this.events = []
    }

    listen(){

    }

    process(){

    }
}

var eventqueue = new EventQueue()

function processGameEvents(gamedata){
    var gameknot = gamedata.find(k => k.name == 'game')
    var eventsfolder = gamedata.find(k => k.name == 'eventsqueue')
    var events = gamedata.filter(k => k.parent == eventsfolder._id)
    eventqueue.events.push(...events)


    eventqueue.listen('gamestart',(e) => {
        //shuffle cards
        //phase = turnorder
    })

    eventqueue.listen('phasechange',(e) => {
        var phase = e.data
        if(phase == 'turnorder'){

        }else if(phase == 'order'){

        }else if(phase == 'research'){
            
        }else if(phase == 'action'){
            
        }else if(phase == 'production'){
            
        }
    })

    eventqueue.listen('mulliganConfirmed',(e) => {

    })

    eventqueue.listen('pass',(e) => {

    })

    eventqueue.listen('playcard',(e) => {

    })

    eventqueue.listen('standardproject',(e) => {

    })

    eventqueue.listen('actioncard',(e) => {

    })

    eventqueue.listen('convertplants',(e) => {

    })

    eventqueue.listen('convertheat',(e) => {

    })

    eventqueue.listen('claimmilestone',(e) => {

    })

    eventqueue.listen('fundaward',(e) => {

    })

    eventqueue.listen('tileplaced',(e) => {

    })

    eventqueue.listen('heatincrease',(e) => {

    })

    eventqueue.listen('oxygenincrease',(e) => {

    })

    eventqueue.listen('gamefinished',(e) => {

    })

    eventqueue.process()
    

}


module.exports = {
    processGameEvents
}