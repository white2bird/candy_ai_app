<template>
    <div class="form-wrapper">
        <div class="form-container">
            <el-form :model="formData" :rules="formRules" ref="dynamicForm" label-width="120px" label-position="top">
                <el-row :gutter="20">
                    <!-- 动态生成表单项 -->
                    <el-col v-for="(field, index) in formFields" :key="index" :span="24" class="form-item">
                        <!-- 文本输入框 -->
                        <el-form-item :label="field.name" :prop="field.name" v-if="field.type === 'text'"
                            class="no-border-input">
                            <el-input style="border: 0; border-style: none;" type="textarea"
                                v-model="formData[field.name]" :placeholder="field.placeholder || ''"
                                :maxlength="field.maxLength || null"></el-input>
                        </el-form-item>

                        <!-- 文件上传项 -->
                        <el-form-item :label="field.name" :prop="field.name" v-if="field.type === 'file'">
                            <el-upload class="upload-demo" action="#" :limit="1"
                                :on-change="(file) => handleFileChange(file, field.name)"
                                :before-upload="validateFileType" :file-list="formData[field.name]">
                                <el-button slot="trigger" type="primary">上传{{ field.name }}</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    {{ field.placeholder || '请选择上传文件' }}
                                </div>
                            </el-upload>
                        </el-form-item>

                        <!-- 图片上传项 -->
                        <el-form-item :label="field.name" :prop="field.name" v-if="field.type === 'image'">
                            <el-upload class="upload-demo" action="#" list-type="picture-card"
                                :limit="field.maxCount || 1" :on-change="(file) => handleFileChange(file, field.name)"
                                :before-upload="validateImageType" :file-list="formData[field.name]">
                                <el-icon></el-icon>
                                <div slot="tip" class="el-upload__tip">
                                    {{ field.placeholder || '请上传图片' }}
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item class="form-item-button">
                    <el-button class="answer-button" type="primary" @click="submitForm">一键生成回答</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, inject, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const $request = inject('$request')
const router = useRouter()
// 解析后端返回的表单字段
const formFields = ref([])
const dynamicForm = ref(null)
// 动态生成表单数据和校验规则
const formData = reactive({})
const formRules = reactive({})

const params = { id: '1', name: 'ly', phone: 13246566476, age: 23 }
// 提交表单
const submitForm = () => {
    dynamicForm.value.validate((valid) => {
        if (valid) {

            var data = toRaw(formData)
            console.log('data', data)
            // data = {name: '12', value: '12'}
            console.log('pass', Object.entries(formData)
                .map(([key, value]) => `${key}:${value}`)
                .join('\r\n'))
            router.push({
                name: 'chat',
                state:  {data}


            })
        }
    })

}

// 重置表单
const resetForm = () => {
    const form = ref('dynamicForm')
    form.value.resetFields()
}

// 处理文件上传
const handleFileChange = (file, fieldName) => {
    formData[fieldName] = [file]  // 模拟文件保存
}

// 文件类型验证
const validateFileType = (file) => {
    const isAccepted = ['application/pdf', 'application/vnd.ms-powerpoint'].includes(file.type)
    if (!isAccepted) {
        ElMessage.error('只支持上传PPT或PDF文件')
    }
    return isAccepted
}

// 图片类型验证
const validateImageType = (file) => {
    const isImage = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isImage) {
        ElMessage.error('只支持上传图片格式为 JPEG 或 PNG')
    }
    return isImage
}

onBeforeMount(() => {
    // 在组件加载前执行，例如从后端获取表单数据

    $request.get('/formItem/getFormItemListByRoleId?roleId=1')
        .then(res => {
            formFields.value = res
            formFields.value.forEach((field) => {
                formData[field.name] = field.type === 'file' || field.type === 'image' ? [] : ''
                if (field.required !== true) {
                    return
                }
                formRules[field.name] = [{ required: true, message: `${field.name}是必填项`, trigger: 'blur' }]
                // 继续增加校验
                var vad = { trigger: 'blur' }
                var msg = ''
                if (field.min) {
                    vad.min = field.min
                    msg = `${field.name}至少${field.min}字`

                }
                if (field.max) {
                    vad.max = field.max
                    msg = `${field.name}最多${field.max}字`
                }
                if (field.min && field.max) {
                    msg = `${field.name}至少${field.min}字，最多${field.max}字`
                }
                if (msg !== '') {
                    vad.message = msg
                    formRules[field.name].push(vad)
                }

            })

        })
})

onMounted(() => {
})


</script>

<style lang="less" scoped>
.no-border-input .el-input--medium .el-input__inner {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0;

    //   & >>> .el-input__inner {
    //     border: 0;
    //   }
    .el-textarea__inner {
        border: 0;
    }
}

.form-wrapper {
    width: 100%;
    background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
    width: 50%;
    /* 占据页面的 80% 宽度 */
    margin: 20px auto;
    /* 保证居中 */
    padding: 20px;

    /* margin: 0 20px; */
    display: flex;
    flex-direction: column;
    /* background-color: #f5f5f5;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
    /* 可选的视觉效果 */
    box-sizing: border-box;
    /* 包括 padding 和 border 在宽度计算中 */
}

.upload-demo {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-item {
    background-color: white;
    /* background-color: red; */
    margin-bottom: 10px;
    padding-top: 10px;
    border-radius: 10px;

    * {
        // padding-bottom: 20px;
    }
}

.form-item-button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
}

.answer-button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}
</style>