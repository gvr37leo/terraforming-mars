import { Knot } from "./models/knot";

enum QueryType{child,descendant,parent,ancestor}

class QueryPart{
    queryType:QueryType
    data:any
}

export class KnotQueryDB{

    idIndex = new Map<string,Knot>()
    parentFk = new Map<string,string[]>();

    queryTypeMap = {
        ">":QueryType.child,
        "/":QueryType.descendant,
        "^":QueryType.parent,
        "|":QueryType.ancestor,
    }

    constructor(public data:Knot[]){
        for(var item of data){
            this.idIndex.set(item._id,item)
            this.upsert(item.parent,item,this.parentFk)
        }
    }

    private upsert(key:string,knot:Knot,map:Map<string,string[]>){
        if(map.has(key)){
            map.get(key).push(knot._id)
        }else{
            map.set(key,[knot._id])
        }
    }

    searchQuery(query:string){
        return this.search(this.queryParser(query))
    }

    objects2Query(objects:any[]){
        return objects.map(o => {
            return {
                queryType:QueryType.descendant,
                data:o,
            }
        })
    }

    searchObjects(objects:any[]){
        return this.search(this.objects2Query(objects))
    }

    searchObjdefs(strings:string[]){
        return this.searchObjects(strings.map(s => {return {objdef:s}}))
    }

    
    search(query:QueryPart[]):Knot[]{
        var roots = this.data.filter(k => k.parent == null)
        var result = roots.map(r => this.searchFrom(r,query)).flat(1)
        return result
    }

    searchFrom(self:Knot,query:QueryPart[]):Knot[]{
        var hits = [self]
        for(var i = 0; i < query.length;i++){
            var result = []
            if(query[i].queryType == QueryType.child){
                result = hits.map(k => this.findDirectDescendants(k,query[i].data)) 
            }else if(query[i].queryType == QueryType.descendant){
                result = hits.map(k => this.findFirstDescendants(k,query[i].data)) 
            }else if(query[i].queryType == QueryType.parent){
                result = hits.map(k => this.findParent(k,query[i].data)) 
            }else if(query[i].queryType == QueryType.ancestor){
                result = hits.map(k => this.findAncestor(k,query[i].data)) 
            }
            hits = result.flat(1)
        }
        return hits
    }
    
    findDirectDescendants(self:Knot,query:QueryPart):Knot[]{
        if(equals(query,self)){
            return [self]
        }else{
            var children = this.getChildren(self)
            return children.filter(k => equals(query,k))
        }
    }
    
    findParent(self:Knot,query:QueryPart):Knot[]{
        if(equals(query,self)){
            return [self]
        }else{
            var knots = this.data.filter(k => k._id == self.parent)
            return knots
        }
    }
    
    findAncestor(self:Knot,query:QueryPart):Knot[]{
        if(equals(query,self)){
            return [self]
        }else{
            var parent = this.data.filter(k => k._id == self.parent)
            var hits = parent.map(k => this.findAncestor(k,query)).flat(1)
            return hits
        }
    }
    
    findFirstDescendants(self:Knot,query:QueryPart):Knot[]{
        if(equals(query,self)){
            return [self]
        }else{
            var children = this.getChildren(self)
            var hits = children.map(k => this.findFirstDescendants(k,query)).flat(1)
            return hits
        }
    }

    getKnot(id:string){
        return this.idIndex.get(id)
    }
    
    getParent(self:Knot):Knot{
        return this.idIndex.get(self.parent)
    }

    getChildren(self:Knot):Knot[]{
        var childrenids = this.parentFk.get(self._id)
        if(childrenids == null){
            return []
        }
        return childrenids.map(id => this.idIndex.get(id))
    }

    queryParser(query:string):QueryPart[]{
    
        var parts = query.split(' ')
        var result:QueryPart[] = [{
            queryType:QueryType.descendant,
            data:JSON.parse(parts[0])
        }]
        for(var i = 1; i < parts.length; i += 2){
            result.push({
                queryType:this.queryTypeMap[parts[i]],
                data:JSON.parse(parts[i + 1])
            })
        }
        return result
    }
}

function equals(query,object){
    for(var prop in query){
        if(query[prop] != object[prop]){
            return false
        }
    }
    return true
}