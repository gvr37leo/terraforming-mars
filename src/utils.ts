function remove<T>(arr:T[],id:number){
    var index = arr.findIndex((i:any) => i.id == id)
    return arr.splice(index,1)[0]
}

function findbyid<T>(arr:T[],id:number){
    return arr.find((i:any) => i.id == id)
}