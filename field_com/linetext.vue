<template>
    <div class="linetext field-input">
        <input type="text" v-model="row[head.name]" :placeholder="head.placeholder" :name="head.name">
    </div>
</template>
<script>
    export default {
        props:['head','row']
    }
</script>