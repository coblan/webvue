<template>
    <div class="password field-input">
        <input type="password" v-model="row[head.name]" :placeholder="head.placeholder" :name="head.name" :maxlength="head.maxlength">
    </div>
</template>
<script>
    export default {
        props:['head','row']
    }
</script>