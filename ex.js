import {urlparse} from './ex_com/urlparse'
import {vuetool} from './ex_com/vuetools'
import {code} from './ex_com/code'
import validate from './ex_com/validate'
import  {collection} from  './ex_com/collection'
import  {os} from './ex_com/os'
var ex ={}

Object.assign(ex,urlparse)
Object.assign(ex,vuetool)
Object.assign(ex,code)
Object.assign(ex,validate)
Object.assign(ex,collection)

ex.os = os
export default ex