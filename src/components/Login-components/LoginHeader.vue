<template>
    <div class="header">
        <el-image src="/images/weblogo.png" fit="fill" :lazy="true" />

        <div class="art-font">
            Candy AI
        </div>
    </div>
    
</template>

<script setup name='LoginForm'>
//导入
</script>

<style scoped>
.header{
    height: 100%;
    display: flex;
    padding-left: 30px;
}
.el-image{
    width: 60px; height: 60px ;
}
.art-font{
    font-size: 20px;
    padding-left: 15px;
    font-weight: bold;
}

@font-face {
      font-family: 'MyFont';
      src: url('/web/static/font/DFPOP/DFPOP1B.TTF') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
</style>