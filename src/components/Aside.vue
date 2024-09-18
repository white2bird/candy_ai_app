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
            <div> 111</div>
            <div> 222</div>
        </div>
        <div class="aside-footer">
            <ElButton style="overflow: auto;">button</ElButton>
        </div>
    </div>
</template>


<script setup>
import { ElButton } from 'element-plus';


let imageurl = "/images/touxiang.jpg"

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

.aside-body{
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    /* justify-content: space-between; */
    align-items: center;

    div{
        margin-bottom: 20px;
        height: 50px;
        width: 80%;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgb(240,240,240);
    }
}


.aside-footer {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: red;

    justify-content: center;
    align-items: center;
    // padding-bottom: 20px;
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