import {initGame,getData} from './src/gameinit'
var {processGameEvents} = require('./serverfiles/gamelogic')
var express = require('express')
var app = express()
initGame('')
var gamedata = getData()

app.use(express.static('./'))

app.listen(8000, () => {
    console.log('listening')
})

app.get('/api/getgame', (req,res) => {
    res.send(gamedata)
})

app.post('/api/pushevent',(req,res) => {
    var eventfolder = gamedata.find(k => k.name == 'eventqueue')
    var event = req.data
    gamedata.push({
        parent:eventfolder.id,
        type:event.type,
        data:event.data
    })
    processGameEvents(gamedata)
    res.send(gamedata)
})




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
  
