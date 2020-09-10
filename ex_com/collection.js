export var collection={
    findone:function (collection,obj_or_func) {

        for(var i=0;i<collection.length;i++){
            var now_obj=collection[i]
            if(typeof(obj_or_func)=='function'){
                var func=obj_or_func
                var match=func(now_obj)
            }else{
                var obj=obj_or_func
                var match=true
                for(var key in obj){
                    if(key.startsWith('_')){
                        continue
                    }
                    if (obj[key] !== now_obj[key]){
                        match =false
                        break
                    }
                }
            }

            if(match){
                return now_obj
            }
        }


        return null
    },
    find:function (collection,obj) {
        out=[]
        for(var i=0;i<collection.length;i++){
            var now_obj=collection[i]
            var match=true
            for(var key in obj){
                if (obj[key] !== now_obj[key]){
                    match =false
                    break
                }
            }
            if(match){
                out.push(now_obj)
            }
        }
        return out
    },
    each:function (array,func) {
        for(var i=0;i<array.length;i++){
            var rt = func(array[i])
            if(rt=='break'){break;}
            else if(rt=='continue'){continue;}
        }
    },
    map:function (array,func) {
        var out=[]
        for(var i=0;i<array.length;i++){
            out.push(func(array[i]))
        }
        return out
    },
    isin:function (obj,array,func) {
        if(func){
            for(var i=0;i<array.length;i++){
                if(func(array[i])){
                    return true
                }
            }
            return false
        }else{
            return array.indexOf(obj)!=-1
        }
    },
    filter:function (array,func_or_obj) {
        var out=[]
        if(typeof func_or_obj == 'function'){
            for(var x=0;x<array.length;x++){
                if(func_or_obj(array[x])){
                    out.push(array[x])
                }
            }
        }else{
            var obj=func_or_obj
            ex.each(array,function(doc){
                var match=true
                for(var key in obj){
                    if(doc[key]!== obj[key]){
                        match=false
                        break
                    }
                }
                if(match){
                    out.push(doc)
                }
            })

        }
        return out
    },
    exclude:function(array,func_or_obj){
        var out=[]
        if(typeof func_or_obj == 'function'){
            for(var x=0;x<array.length;x++){
                if(!func_or_obj(array[x])){
                    out.push(array[x])
                }
            }
        }else{
            var obj=func_or_obj
            ex.each(array,function(doc){
                var match=true
                for(var key in obj){
                    if(doc[key]!== obj[key]){
                        match=false
                        break
                    }
                }
                if(!match){
                    out.push(doc)
                }
            })

        }
        return out
    },
    any:function(array,func) {
        for(var x=0;x<array.length;x++){
            if(func(array[x])){
                return true
            }
        }
        return false
    },
    extend:function(array1,array2){
        array1.push.apply(array1,array2)
        return array1
    },
    remove:function (array,func_or_obj) {
        var index_ls=[]
        if (typeof func_or_obj == 'function'){
            var func=func_or_obj
            for(var i=0;i<array.length;i++){
                if(func(array[i])){
                    index_ls.push(i)
                }
            }
        }else if(typeof func_or_obj=='object'){
            var obj=func_or_obj
            for(var i=0;i<array.length;i++){
                var match=true
                for(var key in obj){
                    if(obj[key]!== array[i][key]){
                        match=false
                        break
                    }
                }
                if(match){
                    index_ls.push(i)
                }
            }
        }else{
            // 删除一个直接返回了
            return array.splice(array.indexOf(func_or_obj),1)
        }
        var rm_item=[]
        index_ls.reverse()
        for(var x=0;x<index_ls.length;x++){
            var rm=array.splice(index_ls[x],1)
            rm_item= rm.concat(rm_item)
        }
        return rm_item
    },
    sort_by_names:function(array,name_list,keep){
        /*按照name_list来筛选和排列array，如果keep=true，落选的项会append到array后面。
         @array: [{name:'age',..},{contry:'china'}]
         @name_list:['contry','name']
         返回:按照name_list排序后的array
         * */
        var out_list=[]
        ex.each(name_list,function(name){
            var item = ex.findone(array,{name:name})
            if (item){
                out_list.push(item)
            }
        })
        if(keep){
            ex.each(array,function(item){
                if(!ex.isin(item,out_list)){
                    out_list.push(item)
                }
            })
        }
        return out_list
    },
    walk:function(array,callback,key){
        var key = key || 'children'
        ex.each(array,function(item){
            callback(item)
            if(item[key]){
                ex.walk(item[key],callback,key)
            }
        })
    }
}