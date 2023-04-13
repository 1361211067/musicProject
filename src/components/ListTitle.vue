<template>
   <h3>
        <slot></slot>
    </h3>
</template>

<script>
    export default{
        name:'ListTitle',
    }
</script>

<style lang="less" scoped>
    h3{
        background-color: #eeeff0;
        color: #666;
        font-size: 12px;
        padding: 4px 10px ;
    }
</style>