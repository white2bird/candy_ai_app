<template>
    <div class="aside">
        <div class="aside-header">
            <el-avatar :size="55" shape='circle' :src=imageurl style="margin-top: 15px;margin-bottom: 20px;"
                :lazy="true" />

            <div class="info">
                <strong>Lyubov Kurach</strong>
            </div>
            <!-- <el-avatar :size="25" shape='square' :src=vipimage_activate :v-show="vip_show" />
            <el-avatar :size="25" shape='square' :src=vipimage v-show="!vip_show" /> -->
            <el-divider>
                <el-icon></el-icon>
            </el-divider>
        </div>
        <div class="aside-body">
            <div v-for="(item,index) in menu_list" @click="itemClick(index)" :style="{'display': 'flex', 'justify-content': 'space-around', 'background-color': current_index === index ? 'rgb(240, 240, 240)' : ''}">
                <div style="display: flex; width: 40%; justify-content: center;">
                    <img style="width: 40%; height: auto;" :src="item.icon" alt="">
                </div>
                <div style="display: flex; width: 40%; justify-content: start;">
                    <RouterLink :to="item.path">{{ item.name }}</RouterLink>
                </div>
                <!-- </div> -->
            </div>
           
        </div>
        <div class="aside-footer">
            <!-- todo hidden处理 -->
            <div class="exitButton" :style="{'visibility': 'hidden'}"> 
                <ElButton style="overflow: auto;">exit</ElButton>
            </div>
            <div class="loginButton">
                <ElButton style="overflow: auto;">button</ElButton>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ElButton } from 'element-plus';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const current_index = ref(0)
let imageurl = "/images/touxiang.jpg"

let menu_list = [
    { name: '应用', icon: '/images/apps.png', path: '/' },
    { name: '我的', icon: '/images/own_my.png', path: '/my' }
]


const itemClick = (index) => {
    console.log(index)
    current_index.value = index
    let route = menu_list[index].path
    console.log('---path---', route)
}


</script>

<style lang="less" scoped>
.aside {

    display: flex;

    flex-direction: column;
    height: 100%;

    /* align-items: center; */
    position: relative;

}

.aside-header {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-bottom: 20px;
}

.aside-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    /* justify-content: space-between; */
    align-items: center;

    >div {
        margin-bottom: 20px;
        height: 50px;
        width: 90%;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: rgb(240, 240, 240);
    }
}


.ElButton{
    overflow: auto;
}
.aside-footer {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: red;
    flex-direction: column;
    padding-right:10px;

    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.exitButton {
    background-color: red;
    padding: 0px;
    transform: translate(10px, 5px); /* 偏移元素 */
    max-width: 100%; /* 避免子元素超出父容器 */
    max-height: 100%;
}

.router-link-active {
    text-decoration: none;
    /* color:#409eff; */
    color: #5d5cde;
}

a {
    text-decoration: none;
    color: grey;
}
</style>