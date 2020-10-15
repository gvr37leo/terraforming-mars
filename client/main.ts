/// <reference path="./node_modules/vectorx/vector.ts" />
/// <reference path="./node_modules/utilsx/utils.ts" />
/// <reference path="./src/ajax.ts" />
/// <reference path="./src/modal.ts" />
/// <reference path="./src/gameinterface.ts" />
/// <reference path="./src/templatedefs.ts" />
/// <reference path="./src/templates.ts" />
/// <reference path="./src/utils.ts" />
/// <reference path="./src/models/knot.ts" />
/// <reference path="./src/models/award.ts" />
/// <reference path="./src/models/card.ts" />
/// <reference path="./src/models/corporation.ts" />
/// <reference path="./src/models/events.ts" />
/// <reference path="./src/models/game.ts" />
/// <reference path="./src/models/meter.ts" />
/// <reference path="./src/models/milestone.ts" />
/// <reference path="./src/models/player.ts" />
/// <reference path="./src/models/resource.ts" />





// var modal = new Modal()
// document.body.appendChild(modal.rootelement)
// var asd = string2html(`<div>hello</div>`)
// modal.set(asd)
includeHTML().then(() => {
    getGameData().then(data => {
        var gameinterface = new GameInterface()
        gameinterface.initHTML(data)
        gameinterface.setData(data)
        document.body.appendChild(gameinterface.gameboardElement.root)
    })
})


