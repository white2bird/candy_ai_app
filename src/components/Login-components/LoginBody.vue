<template>
    <div class="body">
        <el-card class="card" shadow="always">
            <div>
                <el-image style="width: 240px; height: 60px ; margin-bottom: 20px;" src="/images/login-form-logo.png"
                    fit="fill" :lazy="true" />
            </div>

            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Login" name="login" style="padding: 0 20px">
                    <br>
                    <LoginForm />
                </el-tab-pane>
                <el-tab-pane label="Sign Up" name="signup">
                    <br>
                    <SignUpFrom />
                </el-tab-pane>
            </el-tabs>

        </el-card>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from '@/components/Login-components/LoginForm.vue';
import SignUpFrom from '@/components/Login-components/SignUpForm.vue';
import type { TabsPaneContext } from 'element-plus'


const activeName = ref('login')


const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log('tabclick', tab, event)
}


</script>

<style scoped>

.body {
    display: flex;
    height: 100%;
    width: 100%;
    margin-top: 0px;
    justify-content: end;
}
    
.card{
    /* display: flex; */
    background-color: rgba(255, 255, 255, 0.2); 
    /*半透明白色背景，0.8是透明度 */
    max-width: 440px;
    max-height: 560px;
    margin-right: 10%;
    box-shadow: 0 0 20px;
    border-radius: 20px;
    padding-top: 20px;
    /* margin-top: 20px; */
    /* position:fixed; */
}

/* .body {
    height: 100%;
    width: 100%;
    margin-top: 0px;
}
    
.card{
    background-color: rgba(255, 255, 255, 0.2); 
    width: 440px;
    height: 560px;
    margin-left: 60%;
    box-shadow: 0 0 20px;
    border-radius: 20px;
    padding-top: 20px;
    margin-top: 20px;
    position:fixed;
} */
</style>