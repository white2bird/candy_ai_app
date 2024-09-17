<template>
  <div class="ai_all">
      <div class="ai_aside">
        <Aside></Aside>
      </div>

      <div class="ai_main">
         <RouterView></RouterView>
      </div>
  </div>    
</template>
  
  
  
  <script lang='ts' setup name=''>
  //导入
  import { reactive, ref, toRefs, onBeforeMount, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router';
  
  import Aside from '@/components/Aside.vue';

  
  
  
  //方法
  
  
  </script>
  
  <style scoped>
    .ai_all{
      display: flex;
      width: 100%;
      height: 100%;
      background-color: red;
    }
    .ai_aside{
      /* min-width: 20px; */
      flex-grow: 2;
      width: 100%;
      height: 100%;
      background-color: #fff;
      flex-shrink: 10;
    }
    .ai_main{
      display: flex;
      flex-grow: 8;
      flex-shrink: 1;
      background-color: aqua;
      height: 100%;
      width: 100%;
    }
  </style>