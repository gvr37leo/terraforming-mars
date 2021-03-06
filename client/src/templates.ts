




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

        company:html.querySelector('#company'),
        resources:html.querySelector('#resources'),
        cards:html.querySelector('#cards'),
        generation:html.querySelector('#generation'),
    }
}

function updateGameBoardData(gameboard){
    var html = gameboard.gameboardElement

    html.awards
    html.milestones
    html.oxygenmeter.innerText = gameboard.oxygen.current.toString()
    html.temperaturemeter.innerText = gameboard.temperature.current.toString()
    html.standardprojects
    for(var player of gameboard.players){
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
        data:null,
    }
}

function updatePlayerData(player){
    var html = player.playerElement
    html.playername.innerText = player.name
}






function updateResourceData(resource:Resource,resourceRef:ResourceElement){
    var html = resourceRef
    html.label.innerText = resource.name.toString()
    html.instock.innerText = resource.instock.toString()
    html.moneyvalue.innerText = resource.moneyvalue.toString()
    html.production.innerText = resource.production.toString()
}

function getReourceRefs():ResourceElement{
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

function updateMilestoneData(milestone){
    var html = milestone.element

    // html.claimedby.innerText = findbyid<Player>(game.players,milestone.claimedBy)?.name ?? 'unclaimed'
    html.title.innerText = milestone.title
}


function getMilestoneTemplate():MilestoneElement{
    var playertemplate = document.querySelector('#milestonetemplate')
    var html = string2html(playertemplate.innerHTML)

    return{
        root:html,
        title:html.querySelector('#title'),
        claimedby:html.querySelector('#claimedby'),
    }
}

function updateAwardData(award){
    var html = award.element
    html.funded.innerText = award.funded ? 'true' : 'false'
    html.title.innerText = award.title
}


function getAwardRefs():AwardElement{
    var playertemplate = document.querySelector('#awardtemplate')
    var html = string2html(playertemplate.innerHTML)

    return{
        root:html,
        title:html.querySelector('#title'),
        funded:html.querySelector('#funded'),
    }
}



function updateStandardprojectData(resource){
    var html = resource.element

    html.price.innerText = resource.price.toString()
    html.product.innerHTML = ''
    html.product.appendChild(resource.renderProduct())
}

function getStandardprojectTemplate():StandardProjectElement{
    var playertemplate = document.querySelector('#standardprojecttemplate')
    var html = string2html(playertemplate.innerHTML)

    return{
        root:html,
        price:html.querySelector('#price'),
        product:html.querySelector('#product'),
    }
}






function getcardrefs():CardElement{
    var cardtemplate = document.querySelector('#cardtemplate')
    var html = string2html(cardtemplate.innerHTML)

    return{
        root:html,
        cost:html.querySelector('#cost'),
        rules:html.querySelector('#rules'),
        tags:html.querySelector('#tags'),
        title:html.querySelector('#title'),
        image:html.querySelector('#image'),
        cardid:html.querySelector('#cardid'),
        effect:html.querySelector('#effect'),
        flavortext:html.querySelector('#flavortext'),
        data:null,
    }
}

function updateCardData(cardref:CardElement,card:Card){
    var html = cardref
    html.cardid.innerText = card._id.toString()
    html.effect.innerHTML = ''
    // html.effect.appendChild(card.renderDescription(card))
    html.flavortext.innerText = card.flavortext
    html.image.src = card.imageurl
    html.title.innerText = card.title
    html.cost.innerText = card.cost.toString()
    // html.rules.innerText = card.rules.length.toString()
    // html.tags.innerText = card.tags.map(t => Tags[t]) .join(',')

}