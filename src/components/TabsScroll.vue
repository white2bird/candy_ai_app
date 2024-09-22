<template>
    <div class="model_platform_main">
        <div class="model_platform_header">
            <div>
                <img style="width: 312px; height: 24px; margin-right: 160px;" src="/images/model_platform_header.png" />
            </div>
        </div>

        <div class="model_platform_content">
            <!-- 此处放tabes 组件 -->
            <div>
                <div class="tabs" ref="tabsRef" style="overflow: hidden;">
                    <div v-for="(tab, index) in tabs" :key="index"
                        :class="['tab', { active: activeTabIndex === index }]" @click="scrollToSection(index)">
                        {{ tab.title }}

                    </div>
                </div>

                <!-- Content Sections -->
                <div class="content" ref="contentRef">
                    <div v-for="(tab, index) in tabs" :key="index" class="section">
                        <h2>{{ tab.title }}</h2>
                        <div class="sub-items">
                            <div v-for="(item, idx) in tab.items" :key="idx" class="sub-item"
                                @click="choseRole(index, idx)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="model_platform_footer">
            北京公安局备案 号：京ICP备2021010001号-1
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, getCurrentInstance, inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $request = inject('$request');

const tabs = ref([
    // {
    //     title: 'AI2教学',
    //     items: [{name: '角色1', id: 1}, ],
    // },

]);

const activeTabIndex = ref(0);
const sections = ref([]);
const contentRef = ref(null);
const vueTabs = ref([]);
const tabsRef = ref(null);
const click_to_tab = ref(false);

const tabPostionY = ref(0);
const tabHeight = ref(0);

const pageInstance = getCurrentInstance();
// 获取dom节点对象


let observer = null;
let set_click_close;
const scrollToSection = (index) => {
    console.log('clickedout', index)
    console.log(sections.value)
    if (sections.value[index]) {
        console.log('clicked', index)
        clearTimeout(set_click_close)
        click_to_tab.value = true
        sections.value[index].scrollIntoView({ behavior: 'smooth' })
        activeTabIndex.value = index
        // 防止抖动
        set_click_close = setTimeout(() => {
            // 防止滚动事件影响点击态
            click_to_tab.value = false
        }, 600)
    }
};

const initRoles = async () => {
    const res = await $request.get('/aiChatRoleType/get-tabs-items')
    console.log(res)
    tabs.value = res
    await nextTick();
    // 初始化 sections
    const current_section = contentRef.value.querySelectorAll('.section');
    console.log('获取 section 元素：', current_section);
    if (current_section !== undefined && current_section !== null && current_section.length > 0) {
        sections.value = current_section;
    }

    // 获取 tabs DOM 节点
    vueTabs.value = tabsRef.value.querySelectorAll('.tab');
    tabPostionY.value = tabsRef.value.getBoundingClientRect().y;
    tabHeight.value = tabsRef.value?.clientHeight;


};

onBeforeMount(() => {
    initRoles();
});

onBeforeUnmount(() => {
    // 在组件卸载时移除监听事件
    window.removeEventListener('scroll', scroll);
});

onMounted(async () => {
    // 等待下一次 DOM 更新，确保所有的 refs 都已被正确赋值

    await nextTick();

    // 获取所有的 section 元素
    const current_section = contentRef.value.querySelectorAll('.section');
    console.log('---------', current_section)
    vueTabs.value = tabsRef.value.querySelectorAll('.tab');
    console.log(vueTabs)
    tabPostionY.value = tabsRef.value.getBoundingClientRect().y
    tabHeight.value = tabsRef.value?.clientHeight

    // 监听滚动事件
    window.addEventListener('scroll', scroll, true)
    if (current_section !== undefined && current_section !== null && current_section.length > 0) {
        sections.value = current_section;
    }

});



let scrollTimeout;
// 监听滚动事件
const scroll = () => {
    if (click_to_tab.value == true) {
        return
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        for (let a = sections.value.length - 1; a >= 0; a--) {
            if (sections.value[a].getBoundingClientRect().y <= tabPostionY.value + tabHeight.value) {
                activeTabIndex.value = a;
                break;
            }
        }
    }, 200)
}


onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});

const choseRole = (tab_index, item_index) => {
    console.log('happened click', tab_index, item_index)
    router.push('/home/roleInit/' + tabs.value[tab_index]['items'][item_index].id)

}

</script>

<style lang="less">
.model_platform_main {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    padding-left: 64px;
    padding-right: 64px;
}

.model_platform_header {
    margin-top: 50px;
    margin-bottom: 20px;
}

.model_platform_content {
    flex: 1;
    max-height: 80%;
    overflow-x: auto;
    margin-bottom: 60px;
}

.model_platform_footer {
    display: flex;
    flex-shrink: 1;
    height: 50px;
    font-size: 20px;
    // background-color: red;
    position: absolute;
    width: 70%;
    margin: 0 auto;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    bottom: 0px;
    z-index: 5;
}


.tabs {
    display: flex;
    top: 0;
    margin-left: 20px;
    margin-top: 40px;
    position: sticky;
    z-index: 1;
    // overflow: scroll;
    // scroll-behavior: smooth;
    // background-color: #f0f0f0;
}

.tab {
    border-radius: 5px;
    padding: 10px 20px;
    margin-right: 10px;
    // background-color: #e0e0e0;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    // background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
    // background-color: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
    max-width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-grow: 1;
    flex-shrink: 1;
}


.tab.active {
    background-color: #ffffff;
    background-image: none;
    // border-bottom: 2px solid #42b983;
}

.content {
    // max-height: 700px;
    overflow-y: auto;
    position: relative;
}

.section {
    padding: 20px;
    min-height: 200px;
}

.sub-items {
    margin-top: 10px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}

.sub-item {
    cursor: pointer;
    display: flex;
    height: 50px;
    width: 100px;
    // background-color: red;
    background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    font-size: 18px;
}
</style>