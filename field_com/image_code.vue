<template>
    <div class="image-code field-input"  style="text-align: left;position: relative;">
        <input name="image_code"  class="image_code form-control input-sm"
               v-model="row[head.name]" type="text" placeholder="图片验证码">
        <img class="myimage" @click="getImageCode()" :src="'data:image/gif;base64,'+image_data" alt="">
        <!--<a href="#" @click="getImageCode()">换张图</a>-->
    </div>
</template>
<script>
    export default {
        props:['row','head'],
        data:function(){
        var parStore=ex.vueParStore(this)
        return {
            image_data:'',
            parStore:parStore,
        }
    },
        mounted:function(){
//this.getImageCode()
            this.getImageCode()
        },
        methods:{
            getImageCode:function(){
                ex.eval(this.head.get_image_express,{vc:this})
//                var self=this
//                service_get("/validate/gernate",function(data){
//                    self.parStore.state.image_key = data.Key
//                    self.image_data=data.Value
//                })
            },
            setData(key,image_data){
                self.parStore.state.image_key = key
                self.image_data=image_data
            }

        }
    }

</script>

<style scoped lang="scss">
.image-code{
    display: flex;
    justify-content:space-between;
}
    .myimage{
        cursor: pointer;
    }
</style>


