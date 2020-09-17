/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="src/EventSystem.ts" />
/// <reference path="src/card.ts" />
/// <reference path="src/cards.ts" />
/// <reference path="src/events.ts" />
/// <reference path="src/game.ts" />
/// <reference path="src/player.ts" />
/// <reference path="src/award.ts" />
/// <reference path="src/milestone.ts" />
/// <reference path="src/standardproject.ts" />
/// <reference path="src/utils.ts" />
/// <reference path="src/templates.ts" />
/// <reference path="src/templatedefs.ts" />
/// <reference path="src/tile.ts" />
/// <reference path="src/meter.ts" />

var game:Game
includeHTML().then(() => {
    game = new Game(document.querySelector('#gamecontainer'))
    game.init()
    game.players.push(new Player(0,'player 1'))
    game.players.push(new Player(1,'player 2'))
    game.players.push(new Player(2,'player 3'))

    game.queueEvent(new GameEvent(EventTypes.gamestart,{}))
    game.processQueue()
    game.render()
})