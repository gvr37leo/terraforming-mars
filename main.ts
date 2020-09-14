/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="src/EventSystem.ts" />
/// <reference path="src/card.ts" />
/// <reference path="src/cards.ts" />
/// <reference path="src/events.ts" />
/// <reference path="src/game.ts" />
/// <reference path="src/player.ts" />
/// <reference path="src/awardsmilestone.ts" />
/// <reference path="src/utils.ts" />


var game:Game

includeHTML().then(() => {
    game = new Game(document.querySelector('#gamecontainer'))
    game.players.push(new Player())
    game.players.push(new Player())
    game.players.push(new Player())
    game.players.push(new Player())
    
    game.render()
})