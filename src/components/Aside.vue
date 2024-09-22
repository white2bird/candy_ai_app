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
            <div v-for="(item, index) in menu_list" @click="itemClick(index)"
                :style="{ 'display': 'flex', 'justify-content': 'space-around', 'background-color': current_index === index ? 'rgb(240, 240, 240)' : '' }">
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
            <div class="exitButton" :style="{ 'visibility': exitButtonVisibility ? 'visible' : 'hidden' }">
                <ElButton style="overflow: auto; font-size: 13px;" @click="logout" v-click-outside="hideDropdown">退出登录
                </ElButton>
            </div>
            <div class="loginButton">
                <ElButton style="overflow: auto;" @click="loginOrRegister" @mouseenter="mouseenter">{{
                    loginOrRegisterButtonName }}</ElButton>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ElButton, ClickOutside as vClickOutside } from 'element-plus';
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


const router = useRouter()
const store = useStore()

const $request = inject('$request')
const current_index = ref(0)
const exitButtonVisibility = ref(false)
const loginOrRegisterButtonName = computed(() =>
    store.state.loginButtonName
)

let imageurl = "/images/touxiang.jpg"
let menu_list = [
    { name: '应用', icon: '/images/apps.png', path: '/' },
    { name: '我的', icon: '/images/own_my.png', path: '/my' },
    { name: '聊天', icon: '/images/own_my.png', path: '/home/normalChat' },
]


const itemClick = (index) => {
    console.log(index)
    current_index.value = index
    let route = menu_list[index].path
    console.log('---path---', route)
}

const logined = computed(() => { return store.state.loginButtonName !== '登录/注册' }
)

const hideDropdown = () => {
    // 使其不可见
    if (logined.value === true) {
        exitButtonVisibility.value = false
    }
}

const logout = () => {
    $request.get('/user/logout')
        .then(res => {
            console.log('logout', res)
            window.localStorage.clear()
            exitButtonVisibility.value = false
            store.dispatch('updateUsername', '登录/注册')
        })

}


const loginOrRegister = () => {
    if (logined.value === true) {
        // 已经登陆
        exitButtonVisibility.value = true;
        return
    }
    // 非登陆情况
    router.push('/login')
}

const mouseenter = () => {
    if (logined.value === true) {
        // 已经登陆
        exitButtonVisibility.value = true;
        return
    }
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

.aside-footer {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    // background-color: red;
    flex-direction: column;
    padding-right: 10px;

    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.exitButton {
    // background-color: red;
    padding: 0px;

    // height: 40px;
    transform: translate(10px, 5px);
    /* 偏移元素 */
    max-width: 100%;
    /* 避免子元素超出父容器 */
    max-height: 100%;
    overflow: hidden;

}

.loginButton {
    // background
    max-width: 100%;
    /* 避免子元素超出父容器 */
    // min-width: 88px;
    max-height: 100%;
    text-overflow: clip;
    overflow: hidden;
    text-align: center;

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