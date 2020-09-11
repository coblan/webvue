<template>
    <div class="nice-fields">
        <component v-for="head in heads" :is="head.editor" :head="head" :row="row"></component>
    </div>
</template>
<script>
    require('./scss/simField.scss')

    export default {
        props:['heads','row','option'],
        mounted(){
//            ex.load_js('https://cdn.jsdelivr.net/npm/nice-validator@1.1.4/dist/jquery.validator.min.js?local=zh-CN').then(()=>{
//
//            })
            this.update_nice()

        },
        computed:{
            head_fv_rules(){
                var ls=[]
                ex.each(this.heads,head=>{
                    var tmp=''
                    if(head.required){
                    tmp+='required'
                }
                if(head.fv_rule){
                    tmp += head.fv_rule
                }
                ls.push(head.name+ tmp)
            })
                return ls.join(';')
            }
        },
        methods:{
            update_nice(){
                var self=this
                var validate_fields={}
                ex.each(this.heads,function(head){
                    var ls=[]
                    if(head.readonly){
                        return
                    }
                    if(head.fv_rule){
                        ls.push(head.fv_rule)
                    }
                    if( head.required){
                        if(!head.fv_rule || head.fv_rule.search('required')==-1){// 规则不包含 required的时候，再添加上去
                            ls.push('required')
                        }
                    }

                    if(head.validate_showError){
                        validate_fields[head.name]={
                            rule:ls.join(';'),
                            msg:head.fv_msg,
                            msgClass:'hide',
                            invalid:function(e,b){
                                var label =head.label
                                ex.eval(head.validate_showError,{msg:b.msg,head:head})
                            },
                            valid : function(element, result){
                                ex.eval(head.validate_clearError,{head:head})
                            }
                        }
                    }else{
                        validate_fields[head.name]={
                            rule:ls.join(';'),
                            msg:head.fv_msg,

                        }
                    }

                })
                this.nice_validator =$(this.$el).validator({
                    fields: validate_fields,
                });

            },
            isValid:function(){
                var nice_rt = this.nice_validator.isValid()
                return nice_rt
            },
            showErrors:function(errors){
                var real_input = $(this.$el).find('.real-input')
                if(real_input.length !=0){
                    real_input.trigger("showmsg", ["error", errors[k].join(';')]);
                }

                var no_name_error=[]
                for(var k in errors){
                    var head = ex.findone(this.heads,{name:k})
                    if(head){
                        if(head.validate_showError){
                            ex.eval(head.validate_showError,{head:this.head,msg:errors[k].join(';')})
                        }else{
                            $(this.$el).find('[name='+k+']').trigger("showmsg", ["error", errors[k].join(';')]);
                        }
                    }else{
                        //$(this.$el).find('[name='+k+']').trigger("showmsg", ["error", errors[k].join(';')]);
                        no_name_error.push(errors[k].join(';'))
                    }
                }
                if(no_name_error.length > 0){
                    cfg.showError( no_name_error.join(';'))
                }
            }
        }
    }
</script>