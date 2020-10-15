function removebyid<T>(arr:T[],id:number){
    var index = arr.findIndex((i:any) => i.id == id)
    return arr.splice(index,1)[0]
}

function remove<T>(arr:T[],item:T){
    var index = arr.findIndex((v:any) => v == item)
    return arr.splice(index,1)[0]
}

function findbyid<T>(arr:T[],id:number){
    return arr.find((i:any) => i.id == id)
}


function includeHTML(){
    var templates = document.querySelectorAll('template')
    var promises:Promise<void>[] = []
    for(let template of templates){
        var url = template.getAttribute('src')
        var promise = fetch(url,)
        .then(res => res.text())
        .then(res => {
            template.innerHTML = res
        })
        promises.push(promise)
    }
    return Promise.all(promises)
}



function createQuery(query:string):any[]{
    var parts = query.split('/')

    var res = parts.map(part => {
        var splittedparts = part.split(',')
        
        if(splittedparts.length == 1){
            return {
                objdef:splittedparts[0]
            }
        }
        if(splittedparts.length == 2){
            var jsondata = JSON.parse(splittedparts[1])
            jsondata.objdef = splittedparts[0]
        }
    })
    return res
}

function searchData(querystring:string,knots:Knot[]):any[]{
    var query = createQuery(querystring)
    var parentSet = new Set<string>()
    var firstpart = query[0]
    knots.filter(k => equals(firstpart,k)).forEach(k => parentSet.add(k._id))

    var childknots:Knot[]
    for(var i = 1; i < query.length;i++){
        childknots = knots.filter(k => equals(k,query[i]) && parentSet.has(k.parent))
        parentSet = new Set<string>()
        childknots.forEach(k => parentSet.add(k._id))
    }

    return childknots
}

function equals(query,object){
    for(var prop in query){
        if(query[prop] != object[prop]){
            return false
        }
    }
    return true
}
