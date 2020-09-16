function getgameboardrefs():GameBoardElement{
    var gameboardtemplate = document.querySelector('#gameboardtemplate')
    var html = string2html(gameboardtemplate.innerHTML)

    return {
        root:html,
        oxygenmeter:html.querySelector('#oxygenmeter'),
        standardprojects:html.querySelector('#standardprojects'),
        tileboard:html.querySelector('#tileboard'),
        temperaturemeter:html.querySelector('#temperaturemeter'),
        milestones:html.querySelector('#milestones'),
        awards:html.querySelector('#awards'),
        players:html.querySelector('#players'),
    }
}

function updateGameBoardData(gameboard:Game){
    var html = gameboard.gameboardElement

    html.awards
    html.milestones
    html.oxygenmeter.innerText = gameboard.oxygen.current.toString()
    html.temperaturemeter.innerText = gameboard.temperature.current.toString()
    html.standardprojects
    for(var player of this.players){
        this.updatePlayerData(player)
    }
    html.tileboard
}

function getplayerrefs():PlayerElement{
    var playertemplate = document.querySelector('#playertemplate')
    var html = string2html(playertemplate.innerHTML)

    return{
        root:html,
        playername:html.querySelector('#playername'),
        resources:html.querySelector('#resources'),
        cards:html.querySelector('#cards'),
        board:html.querySelector('#board'),
        playerturntoken:html.querySelector('#playerturntoken'),
        playerstarttoken:html.querySelector('#playerstarttoken'),
    }
}

function updatePlayerData(player:Player){
    var html = player.playerElement
    html.playername.innerText = player.name
    html.playerstarttoken.innerText = (game.firsplayerMarker == player.id) ? 'true' : 'false'
    html.playerturntoken.innerText = (game.playerturnMarker == player.id) ? 'true' : 'false'

    for(var card of player.hand){
        this.updateCardData(card)
    }
    for(var card of player.board){
        this.updateCardData(card)
    }
    this.updateResourceData(player.money)
    this.updateResourceData(player.metal)
    this.updateResourceData(player.titanium)
    this.updateResourceData(player.forest)
    this.updateResourceData(player.electricity)
    this.updateResourceData(player.heat)
}

function getResourceRefs():ResourceElement{
    var playertemplate = document.querySelector('#resourcetemplate')
    var html = string2html(playertemplate.innerHTML)

    return{
        root:html,
        label:html.querySelector('#label'),
        instock:html.querySelector('#instock'),
        moneyvalue:html.querySelector('#moneyvalue'),
        production:html.querySelector('#production'),
    }
}

function updateResourceData(resource:Resource){
    var html = resource.element
    html.label.innerText = resource.name.toString()
    html.instock.innerText = resource.instock.toString()
    html.moneyvalue.innerText = resource.moneyvalue.toString()
    html.production.innerText = resource.production.toString()
}

function getcardrefs():CardElement{
    var cardtemplate = document.querySelector('#cardtemplate')
    var html = string2html(cardtemplate.innerHTML)

    return{
        root:html,
        title:html.querySelector('#title'),
        image:html.querySelector('#image'),
        cardid:html.querySelector('#cardid'),
        effect:html.querySelector('#effect'),
        flavortext:html.querySelector('#flavortext'),
    }
}

function updateCardData(card:Card){
    var html = card.cardElement
    html.cardid.innerText = card.id.toString()
    html.effect.innerHTML = ''
    html.effect.appendChild(card.render(card))
    html.flavortext.innerText = card.flavortext
    html.image.src = card.imageurl
    html.title.innerText = card.title
}