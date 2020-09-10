<template>
    <div class="sim-fields">
        <component v-for="head in heads" :is="head.editor" :head="head" :row="row"></component>
    </div>
</template>
<script>
    require('./scss/simField.scss')
    export default {
        props:['heads','row','option']
    }
</script>