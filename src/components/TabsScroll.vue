<template>
    <div class="model_platform_main">
        <div class="model_platform_header">
            <div>
                <img style="width: 312px; height: 24px; margin-right: 160px;"
                    src="@/assets/model_platform_header.png" />
            </div>
        </div>

        <div class="model_platform_content">
            <!-- 此处放tabes 组件 -->
            <div>
                <div class="tabs" ref="tabsRef">
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
                            <div v-for="(item, idx) in tab.items" :key="idx" class="sub-item">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="model_platform_footer">

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';

const tabs = ref([
    {
        title: 'Tab 1',
        items: ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    },
    {
        title: 'Tab 2',
        items: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
        title: 'Tab 3',
        items: ['Item 3-1', 'Item 3-2', 'Item 3-3'],
    },
]);

const activeTabIndex = ref(0);
const sections = ref([]);
const contentRef = ref(null);
const vueTabs = ref(null);
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
        sections.value[index].scrollIntoView({ behavior: 'smooth' });
        activeTabIndex.value = index;
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
    tabPostionY.value = tabsRef.value.getBoundingClientRect().y
    tabHeight.value = tabsRef.value?.clientHeight

    // 监听滚动事件
    window.addEventListener('scroll', scroll, true)

    vueTabs.value = tabsRef.value
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

</script>

<style lang="less">
.model_platform_main {
    display: flex;
    flex-direction: column;
    padding-left: 64px;
    padding-right: 64px;
}

.model_platform_header {
    margin-top: 50px;
    margin-bottom: 20px;
}

.model_platform_content {
    flex: 1;
    max-height: 500px;
    overflow-x: auto;
}


.tabs {
    display: flex;
    background-color: #f0f0f0;
}

.tab {
    padding: 10px 20px;
    cursor: pointer;
}

.tab.active {
    background-color: #ffffff;
    border-bottom: 2px solid #42b983;
}

.content {
    height: 400px;
    overflow-y: auto;
    position: relative;
}

.section {
    padding: 20px;
    min-height: 200px;
}

.sub-items {
    margin-top: 10px;
}

.sub-item {
    padding: 5px 0;
}
</style>