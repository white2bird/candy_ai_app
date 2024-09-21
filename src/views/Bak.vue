<template>
    <div class="form-container">
        <el-form :model="formData" :rules="formRules" ref="dynamicForm" style="width: 100%;">
            <!-- 动态生成表单项 -->
            <el-row v-for="(field, index) in formFields" :key="index" class="form-row">
                <el-col :span="48" style="display: flex; flex-direction: column; align-items: center;" class="form-cl-col">
                    <span>{{ field.name }}</span>
                    <el-form-item label-width="auto" :prop="field.name" v-if="field.type === 'text'">
                        <el-input v-model="formData[field.name]" :placeholder="field.placeholder || ''"
                            :maxlength="field.maxLength || null"></el-input>
                    </el-form-item>

                    <!-- 文件上传项 -->
                    <el-form-item :prop="field.name" v-if="field.type === 'file'">
                        <el-upload class="upload-demo" action="#" :limit="1"
                            :on-change="(file) => handleFileChange(file, field.name)" :before-upload="validateFileType"
                            :file-list="formData[field.name]">
                            <el-button slot="trigger" type="primary">上传{{ field.name }}</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{ field.placeholder || '请选择上传文件' }}
                            </div>
                        </el-upload>
                    </el-form-item>

                    <!-- 图片上传项 -->
                    <el-form-item  :prop="field.name" v-if="field.type === 'image'">
                        <el-upload class="upload-demo" action="#" list-type="picture-card" :limit="field.maxCount || 1"
                            :on-change="(file) => handleFileChange(file, field.name)" :before-upload="validateImageType"
                            :file-list="formData[field.name]">
                            <el-icon>
                                <!-- <plus> -->
                            </el-icon>
                            <div slot="tip" class="el-upload__tip">
                                {{ field.placeholder || '请上传图片' }}
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// JSON 数据模拟
const formFields = ref([
    // { type: 'file', name: '教案模板', placeholder: '上传您的教案模板', required: true },
    // { type: 'image', name: '教材内容', placeholder: '上传教材内容图片，输出的教案内容更精确。', maxCount: 10 },
    { type: 'text', name: '年级', placeholder: '例如，二年级', required: true },
    { type: 'text', name: '学科', placeholder: '例如，语文', required: true },
    { type: 'text', name: '课题', placeholder: '例如，《小蝌蚪找妈妈》' },
    { type: 'text', name: '教学目标', placeholder: '例如，正确流利、有感情地分角色朗读课文等', required: true, maxLength: 1000 },
])

// 动态生成表单数据和校验规则
const formData = reactive({})
const formRules = reactive({})

formFields.value.forEach((field) => {
    formData[field.name] = field.type === 'file' || field.type === 'image' ? [] : ''
    if (field.required) {
        formRules[field.name] = [{ required: true, message: `${field.name}是必填项`, trigger: 'blur' }]
    }
})

// 提交表单
const submitForm = () => {
    const form = ref('dynamicForm')
    console.log('formData', formData)
    form.value.validate((valid) => {
        if (valid) {
            ElMessage.success('表单提交成功')
        } else {
            ElMessage.error('请填写完整的表单')
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
</script>

<style scoped>
.form-container {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 60%;
    padding: 20px;
}

.upload-demo {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form-row{
    /* background-color: red; */
    margin-bottom: 20px;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    /* width: 70%; */
}
.form-el-col{
    display: flex;
    margin: 0 auto;
    flex: 1;
}
</style>