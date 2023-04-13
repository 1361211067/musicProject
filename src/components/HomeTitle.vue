<template>
    <h3>
        <slot></slot>
    </h3>
</template>

<script>
export default {
    name: 'HomeTitle',
}
</script>

<style lang="less" scoped>
h3 {
    border-left: 3px solid #d43c33;
    padding-left: 10px;
    line-height: 1em;
    margin: 15px 0;
}
</style>