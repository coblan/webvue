
export default {
    //validate({},{name:[required,phone,]},)
    validate(obj,pattern,fail){
        var option = {}
        return new Promise((resovle,reject)=>{
            for(var k in pattern){
                //var value = obj[k]
                var vldList = pattern[k]
                for(var i=0;i<vldList.length;i++){
                    var fun= vldList[i]
                    var rt = fun(k,obj,option)
                    if(rt){
                        if(rt.op == 'break'){
                            break
                        }
                        if(rt.error){
                            reject(rt.error)
                           // fail(rt.error)
                           //resovle(false)
                        }
                    }
                }
            }
            resovle(true)
        })
    },
    vld: {
        name(namestr){
            return (name, obj, option)=> {
                option[name] = namestr
            }
        },
        same(other){
            return (name, obj, option)=> {
                if (obj[name] != obj[other]) {
                    return {error: option[name] + '与' + option[other] + '不一致'}
                }

            }
        },
        required(name, obj, option){
            var value = obj[name]
            if (value == undefined || value == '') {
                return {error: '必填填写' + option[name]}
            }
        },
        phone(name, obj, option){
            var value = obj[name]
            var mt = /^1[3-9]\d{9}$/.exec(value)
            if (!mt) {
                return {error: '手机号码不正确'}
            }
        },
        if_(yes){
            return (name, obj, option)=> {
                if (!yes) {
                    return {op: 'break'}
                }
            }
        },
        len(min, max){
            return (name, obj, option)=> {
                var value = obj[name]
                if (min && value.length < min) {
                    return {error: option[name] + '的长度不能小于' + min}
                }
                if (max && value.length > max) {
                    return {error: option[name] + '的长度不能大于' + max}
                }
            }
        }
    }

}