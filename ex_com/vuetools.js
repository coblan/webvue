import Vue from 'vue'

export var  vuetool = {
    vueSuper:function(self,kws){
        var mixin =kws.mixin
        var name=kws.fun
        var args = [kws] //kws.args || []
        if (mixin){
            var index = self.$options.mixins .indexOf(mixin)
        }else{
            var index = self.$options.mixins.length
        }
        for(var i=index-1 ;i> -1;i--){
            var mix = self.$options.mixins[i]
            var methods = mix.methods[name]
            if(methods){
                return methods.apply(self,args)
            }
        }
    },
    vueAssign:function(old_row,new_row){
        for(var key in new_row){
            Vue.set(old_row,key,new_row[key])
        }
    },
    vueDelete(obj,nameList){
        ex.each(nameList,name=>{
            Vue.delete(obj,name)
        })
    },
    vueBroadCall:function(self,fun,kws){
        var rt =[]
        cusBroadCall(self,fun,kws,rt)
        return rt
    },
    vueParCall:function(self,fun,kws){
        var rt =[]
        cusParCall(self,fun,kws,rt)
        return rt
    },
    vueBroadcase:function(){

    },
    vueParStore:function(self,filter){
        var parent = self.$parent
        while (parent){
            if(parent.childStore){
                if(filter){
                    if(typeof filter =='function' && filter(parent)){
                        return parent.childStore
                    }else{
                        if(ex.objContain(parent,filter) ){
                            return parent.childStore
                        }
                    }
                }else{
                    return parent.childStore
                }
            }else {
                parent = parent.$parent
            }
        }
    },
    vueEventRout:function(self,event_slots){
        if(!event_slots){
            if(self.head && self.head.event_slots){
                event_slots = self.head.event_slots
            }
        }
        if(! event_slots  ){
            return
        }
        ex.each(event_slots,function(router){
            if(router.event){
                self.$on(router.event,function(e){
                    ex.eval(router.express,{event:e,ps:self.parStore,vc:self,})
                })
            }
            if(router.par_event){
                self.parStore.$on(router.par_event,function(e){
                    ex.eval(router.express,{event:e,ps:self.parStore,vc:self,})
                })
            }

        })
    },
    vueChildBusOn:function(self,event_name,func){
        var parent =self.$parent
        while (parent){
            if(parent.childBus){
                break
            }else{
                parent = parent.$parent
            }
        }
        if(parent){
            parent.childbus.$on(event_name,func)
        }
    },
    vuexParName:function(self){
        var par = self.$parent
        while(par){
            if(par.store_name){
                return par.store_name
            }else{
                par = par.$parent
            }
        }
    },
    vuexEmit:function(self,event_name,event){
        var parName = ex.vuexParName(self)
        if(parName){
            self.$store.state[parName].childbus.$emit(event_name,event)
        }
    },
    vuexOn:function(self,event_name,func){
        var parName = ex.vuexParName(self)
        if(parName){
            self.$store.state[parName].childbus.$on(event_name,func)
        }
    },
    vueDispatch:function(self,event,kws){
        var kws= kws || {}
        kws.source=self
        var shouldPropagate = self.$emit( event,kws);
        if (!shouldPropagate) return;
        var parent = self.$parent;
        // use object event to indicate non-source emit
        // on parents
        while (parent) {
            shouldPropagate = parent.$emit( event,kws);
            parent = shouldPropagate ? parent.$parent : null;
        }
        return self;
    },
    vueExtend:function(par,mixins){
        if(! $.isArray(mixins) ){
            mixins=[mixins]
        }
        var mixins = ex.map(mixins,function(item){
            if(typeof item =='string'){
                return window[item]
            }else{
                return item
            }
        })

        var real_par = $.extend({}, par);
        if(real_par.mixins){
            var orgin_mixins = [].concat(real_par.mixins)
        }else{
            var orgin_mixins =[]
        }

        delete real_par.mixins
        if (orgin_mixins){
            var list = orgin_mixins
        }else{
            var list=[]
        }
        list.push(real_par)
        list=list.concat(mixins)
        var final_obj = list[list.length-1]
        final_obj.mixins=list.slice(0,list.length-1)
        return final_obj
    }
}

function cusBroadCall(self,fun,kws,rt){
    if(! self.$children){return}
    for(var i =0;i<self.$children.length;i++){
        var child =self.$children[i]
        if(child[fun]){
            rt.push(child[fun](kws))
        }
        cusBroadCall(child,fun,kws,rt)
    }
}
function cusParCall(self,fun,kws,rt){
    if(! self.$parent){return}
    var par =self.$parent
    if(par[fun]){
        rt.push(par[fun](kws))
    }
    cusParCall(par,fun,kws,rt)

    //for(var i =0;i<self.$parent.length;i++){
    //    var par =self.$parent[i]
    //    if(par[fun]){
    //        rt.push(par[fun](kws))
    //    }
    //    cusParCall(par,fun,kws,rt)
    //}
}