$.validator.config(
    {
        rules: {
            letter_and_number: function(element) {
                if(/(\d)+/.test(element.value) && /[a-zA-Z]+/.test(element.value)){
                    return ''
                }else{
                    return '密码必须包含字母和数字'
                }
            },
            nickname:[/^[\w\u4e00-\u9fa5-]+$/,'只能填写中文、英文、下划线、减号、数字']
        }
    }
);