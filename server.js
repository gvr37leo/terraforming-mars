var express = require('express')
var app = express()

app.use(express.static('./'))

app.listen(8000, () => {
    console.log('listening')
})

function initLobby(){
    var lobby = {

    }


}

//call on lobby gamestart
function initGame(parent){
    var gameid = 0
    var game = {
        generation:0,
        phase:'research',
        firstplayerMarker:0,
        playerturnmarker:0,
    }

    insertMeter('temperature',-30,8,2,-30,gameid)
    insertMeter('oxygen',0,14,1,0,gameid)

    //var guests = goUpAndDown([lobbydef.id,playersfolder.id])
    var playerfolderid = insertObject('playerfolder',gameid,{})
    var guests = []
    for(var guest of guests){
        initPlayer(playerfolderid)
        //todo:insert guest data into player
    }

    var deckfolderid = insertObject('deckfolder',gameid,{})
    var discardfolderid = insertObject('discardfolder',gameid,{})

    
}

function goUpAndDOwn(srcknotid,objdefnames){
    //could also do this by mapping name to objdefids
    //var objdefids = objdefnames.map(name => objdef.find(od => od.name == name)._id)
    //searchup(objdefids[0])
    //for(i = 1; i < objdefids.length)

    //search up to the first objdefids
    //then go down 1 step for each objdefid
    //then get all children of that knot in other func
}



function insertObject(objdefname,parent,object){
    return null
}

function insertMeter(name,min,max,step,current,parent){
    insertObject('meter',parent,{
        name,
        min,
        max,
        step,
        current,
    })
}

function initCard(parent){
    var cardid = insertObject('card',parent,{
        name:'',
        // rules
        cost:0,
        victorypoints:0,//maybe implement algae as end of turn/generation/game effect and have it update it's cards victorypoints
        mulliganSelected:false,
        imageurl:'',
        microbes:0,
        animals:0,
        tapped:false,
        flavortext:'',
        // effect
        //description
    })
    
    //todo:this is just as a test, tags should be added depending on the card
    insertObject('tag',cardid,{
        name:'space',
    })
}



function initPlayer(parent){
     
     var playerid = insertObject('player',parent,{
        name:'playername',
        guestcookieid:'',
        actions:2,
        maxActions:2,
        terrapoints:0,
    })

    insertResource('money',playerid,0,0,0,1)
    insertResource('metal',playerid,0,0,0,2)
    insertResource('titanium',playerid,0,0,0,3)
    insertResource('plants',playerid,0,0,0,0)
    insertResource('energy',playerid,0,0,0,0)
    insertResource('heat',playerid,0,0,0,0)

    insertObject('handfolder',playerid,{})
    insertObject('playedfolder',playerid,{})
    insertObject('mulliganfolder',playerid,{})
}

function insertResource(name,parent,minimum,production,current,moneyvalue){
    insertObject('resource',parent,{
        name,
        minimum,
        production,
        current,
        moneyvalue,
    })
}

function processEvents(knotid){
    
}


//database structure

/*
server
    lobbys:Lobby[]
        players:Guest[]
            cookieid
            ready?
            name
        
        
        game:Game
            events:event[]
                type:string
                data:any
            generation:number
            phase:string
            firstplayerMarker:number
            playerturnmarker:number
            o2meter:Meter
                min:number
                max:number
                step:number
                current:number
            heatmeter:Meter
            tilegrid:TileSpot[]
                tileSpot
                    type:ocean,ground

                tile:Tile
                    owner:Player
                    type:sea,city,forest
            players:Player[]
                name:string
                guestcookieid:string
                actions:number
                maxActions:number
                hand:Card[]
                played:Card[]
                terrapoints:number
                money:Resource
                metal:Resource
                titanium:Resource
                plants:Resource
                electricity:Resource
                heat:Resource
                mulliganhand:Card[]
            discardpile:Card[]
            deck:Card[]
                name:string
                rules:Rule[],:callback
                cost:number
                victorypoints:number
                tags:Tag[]
                mulliganSelected:boolean
                imageurl:string
                microbes:number
                animals:number
                tapped:boolean
                flavortext:string
                effect:callback
                description:callback



*/
  
