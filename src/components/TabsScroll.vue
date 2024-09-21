<template>
    <div class="model_platform_main">
        <div class="model_platform_header">
            <div>
                <img style="width: 312px; height: 24px; margin-right: 160px;"
                    src="/images/model_platform_header.png" />
            </div>
        </div>

        <div class="model_platform_content">
            <!-- 此处放tabes 组件 -->
            <div>
                <div class="tabs" ref="tabsRef" style="overflow: hidden;">
                    <div v-for="(tab, index) in tabs" :key="index"
                        :class="['tab', { active: activeTabIndex === index }]" @click="scrollToSection(index)">
                        {{ tab.title }}
                        {{ index }}
                    </div>
                </div>

                <!-- Content Sections -->
                <div class="content" ref="contentRef">
                    <div v-for="(tab, index) in tabs" :key="index" class="section">
                        <h2>{{ tab.title }}</h2>
                        <div class="sub-items">
                            <div v-for="(item, idx) in tab.items" :key="idx" class="sub-item" @click="choseRole(index,idx)">
                                {{ item }}
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
import { ref, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tabs = ref([
    {
        title: 'Tab 1',
        items: ['Item 1-1', 'Item 1-2', 'Item 1-3', 'Item 1-4', 'Item 1-5', 'Item 1-6', 'Item 1-7', 'Item 1-8'],
    },
    {
        title: 'Tab 2',
        items: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
        title: 'Tab 3',
        items: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
    {
        title: 'Tab 4',
        items: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
    {
        title: 'Tab 5',
        items: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
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
    if (sections.value[index]) {
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

onMounted(async () => {
    // 等待下一次 DOM 更新，确保所有的 refs 都已被正确赋值
    await nextTick();
    // 获取所有的 section 元素
    const current_section = contentRef.value.querySelectorAll('.section');
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
    router.push('/home/roleInit/' + item_index)

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
    margin:0 auto;
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
    margin-top:40px;
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
    justify-content:center;
    align-items: center;
    margin-right: 30px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    font-size: 18px;
}
</style>