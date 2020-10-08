/// <reference path="./node_modules/vectorx/vector.ts" />
/// <reference path="./node_modules/utilsx/utils.ts" />
/// <reference path="ajax.ts" />
/// <reference path="modal.ts" />


var modal = new Modal()
document.body.appendChild(modal.rootelement)

var asd = string2html(`<div>hello</div>`)

modal.set(asd)

