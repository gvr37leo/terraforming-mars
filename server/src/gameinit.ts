
var gamedata = []
var idcounter = 0;
export function getData(){
    return gamedata
}
function initLobby(){
    var lobby = {

    }
}

//call on lobby gamestart
export function initGame(){
    var gameid = insertObject('game',null,{
        generation:0,
        phase:'research',
        firstplayerMarker:0,
        playerturnmarker:0,
    })
    

    initMeter('temperature',-30,8,2,-30,gameid)
    initMeter('oxygen',0,14,1,0,gameid)

    //var guests = goUpAndDown([lobbydef.id,playersfolder.id])
    var playerfolderid = insertObject('playerfolder',gameid,{})
    var guests = []
    for(var i = 0; i < 4; i++){
        initPlayer(playerfolderid)
        //todo:insert guest data into player
    }

    var deckfolderid = insertObject('deckfolder',gameid,{})
    for(var i = 0; i < 50;i++){
        initCard(deckfolderid)
    }
    var discardfolderid = insertObject('discardfolder',gameid,{})
    var eventfolder = insertObject('eventfolder',gameid,{})
    
    var awardsfolderid = insertObject('awardsfolder',gameid,{})
    insertObject('award',awardsfolderid,{
        name:'gardener',
        funded:false,
    })
    insertObject('award',awardsfolderid,{
        name:'gardener',
        funded:false,
    })
    insertObject('award',awardsfolderid,{
        name:'gardener',
        funded:false,
    })
    insertObject('award',awardsfolderid,{
        name:'gardener',
        funded:false,
    })

    var milestonefolderid = insertObject('milestonefolder',gameid,{})
    insertObject('milestone',milestonefolderid,{
        name:'buildings',
        claimedBy:null,
    })
    insertObject('milestone',milestonefolderid,{
        name:'buildings',
        claimedBy:null,
    })
    insertObject('milestone',milestonefolderid,{
        name:'buildings',
        claimedBy:null,
    })
    insertObject('milestone',milestonefolderid,{
        name:'buildings',
        claimedBy:null,
    })
}

function initAward(){
    
}

function initMilestone(){

}


function initMeter(name,min,max,step,current,parent){
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
        name:'card',
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


var playercounter = 0
function initPlayer(parent){
     
     var playerid = insertObject('player',parent,{
        name:`player:${playercounter++}`,
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



function insertObject(objdefname,parent,object){
    object.parent = parent
    object.objdef = objdefname
    object._id = idcounter++
    gamedata.push(object)
    return object._id
}

