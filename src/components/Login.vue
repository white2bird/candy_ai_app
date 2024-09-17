<template>
    <div v-if="visible" class="login-modal">
        <div class="modal-content">
            <h2 style="text-align: center;">糖果AI</h2>
            <!-- 登录表单内容 -->

            <el-tabs v-model="activeName" class="login-tabs">
                <el-tab-pane label="登录" name="login">
                    <el-row class="login-input">
                        <el-col>
                            <el-form-item label="账号:" prop="username">
                                <el-input type="text" placeholder="请输入账号" :disabled="false"
                                    v-model="login_username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="密码:" prop="password">
                                <el-input type="text" placeholder="请输入密码" :disabled="false"
                                    v-model="login_password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="login-button">
                        <ElButton type="primary" @click="handleLogin">登录</ElButton>
                        <ElButton type="primary" @click="handleClose">关闭</ElButton>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <el-row class="login-input">
                        <el-col>
                            <el-form-item label="账号:" prop="register_username">
                                <el-input type="text" placeholder="请输入账号" :disabled="false"
                                    v-model="register_username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="密码:" prop="register_password">
                                <el-input type="text" placeholder="请输入密码" :disabled="false"
                                    v-model="register_password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="确认:" prop="register_again_password">
                                <el-input type="text" placeholder="请再次输入密码" :disabled="false"
                                    v-model="register_again_password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="login-button">
                        <ElButton type="primary" @click="handleRegister">注册</ElButton>
                        <ElButton type="primary" @click="handleClose">关闭</ElButton>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ElButton, ElInput } from 'element-plus';
import { ref, getCurrentInstance, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const $request = inject('$request')
const store = useStore()
const router = useRouter()


// 暴露可见属性
const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['update:visible'])

const activeName = ref('login')
const login_username = ref('')
const login_password = ref('')
const register_username = ref('')
const register_password = ref('')
const register_again_password = ref('')

const handleLogin = () => {
   

    $request.post("/user/login",
        {
            nickname: login_username.value,
            password: login_password.value
        })
        .then(res => {
            store.dispatch('updateUsername', res.userName)
            localStorage.setItem("token", res.token)
            router.push('/')
        }).catch((err) => {
            console.log(err)
         })
}

const handleRegister = () => {
    // todo 校验
    console.log('Register:', register_username.value, register_password.value)

    $request.post("/user/register",
        {
            nickname: register_username.value,
            password: register_password.value
        })
        .then(res => {

        })
    // 跳转登录
    activeName.value = 'login'
}

const navi_to_register = () => {
    router.push('/register')
    handleClose()
}

const handleClose = () => {
    // 通知父组件关闭登录框
    login_username.value = ''
    login_password.value = ''
    register_username.value = ''
    register_password.value = ''
    register_again_password.value = ''
    emit('update:visible', props.visible)
}
</script>

<style scoped>
.login-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: flex-end;
    padding: 10px 20px;
    border-radius: 5px;

}

.login-input {
    display: flex;
    flex-direction: column;

}

.login-button {
    display: flex;
    flex-basis: 50px;
    margin: 10px;
    justify-content: space-around;
}

.navi_register {
    text-decoration: underline;
    color: blue;
}
</style>
