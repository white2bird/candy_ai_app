<template>
    <div class="role_platform">
         <TabsScroll></TabsScroll>
    </div>
</template>

<script setup>
import TabsScroll from '@/components/TabsScroll.vue';
</script>

<style scoped>
.role_platform{
    display: flex;
    background-image: url('/images/background.jpg');
    background-clip: content-box;
    height: 100%;
    flex: 1;
    padding-left: 64px;
    padding-right: 64px;

}

</style>