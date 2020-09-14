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