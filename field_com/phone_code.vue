<template>
    <div  style="position: relative;" class="phone-code flex field-input">
        <input  type="text" class="form-control input-sm" v-model="row[head.name]"
                :id="'id_'+head.name" :name="head.name"
                :placeholder="head.placeholder" :autofocus="head.autofocus" :maxlength='head.maxlength'>

        <button style="width: 9em"
                type="button"
                class="btn btn-default btn-sm"
                :disabled="time_left > 0"
                @click="get_phone_code()" v-text="vcodeLabel"></button>
        <!--:disabled="parStore.state.vcode_count !=0"-->
    </div>
</template>
<script>
    export default{
        props:['row','head'],
        data:function(){
            var parStore=ex.vueParStore(this)
            return {
                time_left:0 ,
                parStore:parStore,
            }
        },
        mounted(){
            setInterval(()=>{
                this.time_left -=1
            },1000)
        },
        computed:{
            vcodeLabel:function(){
                if(this.time_left >0){
                    return this.time_left+'s'
                }else{
                    return '获取验证码'
                }
//                if(this.parStore.state.vcode_count != 0){
//                    return ''+this.parStore.state.vcode_count+' s'
//                }else{
//                    return '获取验证码'
//                }
            },

        },
        methods:{
            get_phone_code(){
               ex.eval(this.head.get_code_express,{vc:this,ps:this.parStore})
            },
            startTime(){
                this.time_left = this.head.time_span
            },
            check_phone:function(Phone){
                var mt =/^1[3-9]\d{9}$/.exec(Phone)
                if(mt){return true}
                else {return false}
            },

//get_phone_code:function(){
//var phone = this.row[this.head.phone_field]
//var img_code = this.row[this.head.img_code_field]
////var com_vcode =kws.com_vcode
//var ph =$(this.$el).find('#id_'+this.hea).trigger("validate")
//var image_code_input_element=$(this.$el).find('[name=image_code]')
//var image_code =image_code_input_element.trigger("validate")
//
//if(ph.isValid() && image_code.isValid()){
//    self.checkImageCode(this.row.Phone,this.row.image_key,this.row.image_code,image_code_input_element)
//}

//if(this.head.isValid()){
//    self.checkImageCode(self.row.Phone,self.row.image_key,self.row.image_code,image_code_input_element)
//}

//var self=this
//this.$emit('trigger-get-code',function(){
//    self.checkImageCode(self.row.Phone,self.row.image_key,self.row.image_code,image_code_input_element)
//})
//},

//sendGetCodeOrder:function(){
//    ex.vueParCall(this,'get_phone_code',{com_vcode:this})
//    //this.$emit('field-event',{fun:'get_phone_code'})
//
//},
//checkImageCode:function(phone,image_key,image_code,image_code_input_element){
//    var self=this
//    $(self.$el).find('input').trigger("hidemsg")
//
//    //if(this.row.image_code && this.hasValidPhone){
//    var data={
//        Phone:phone,
//        Key:image_key,
//        Answer:image_code,
//    }
//    cfg.show_load()
//    service_post('/anonymity/vcode/generate',data,function(resp){
//        if(resp.error_description){
//            image_code_input_element.trigger("showmsg", ["error", resp.error_description ])
//        }else if(resp.success){
//            setTimeout(function(){
//                self.countGetVCodeAgain()
//            },1000)
//        }
//        // else {
//        //    $(self.$el).find('.image_code').trigger("showmsg", ["error", resp.error_description ])
//        //}
//
//    },false)
//    //}
//},
//countGetVCodeAgain:function(){
//    var self=this
//    self.vcode_count=120
//    var idx = setInterval(function(){
//        self.vcode_count -=1
//        if(self.vcode_count<=0){
//            clearInterval(idx)
//            self.vcode_count=0
//        }
//    },1000)
//},
        }
    }
</script>
