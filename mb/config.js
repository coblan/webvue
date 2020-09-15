import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';

export  default {
    showError(msg){
        MessageBox.alert(msg)
    },
    show_load(){
        Indicator.open();
    },
    hide_load(){
        Indicator.close()
    }
}