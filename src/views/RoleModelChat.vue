<template>
    <div class="chat-container">
        <div class="chat-content-body">
            <div class="chat-header"></div>
            <div class="chat-messages" id="chat-messages">
                <div v-for="(message, index) in messages" :key="index"
                    :class="{ 'message-sent': message.role === 'user', 'message-received': message.role === 'assistant' }">
                    <div class="message-content" v-enhance-code v-html="message.renderedText"></div>
                </div>
            </div>

            <div class="chat-input">
                <input v-model="newMessage" type="text" placeholder="Type your message..." @keyup.enter="userSendMessage" />
                <button @click="userSendMessage">{{ sendButton }}</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeMount,inject } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import hljs from 'highlight.js';
import base_url from '@/config';
import 'highlight.js/styles/atom-one-dark.css'; // 使用深色主题



const $request = inject('$request')
const isFirst = ref(true);

const router = useRouter();
const lastDiv = ref(null)
const sendButton = ref('Send');
const replying = ref(false);
const stop = ref(false);
const newMessage = ref('');
const route = useRoute();
const roleId = ref(route.query.roleId)
const conversationId = ref(null)
const messages = ref([
    // { text: 'Hello!', role: 'user', renderedText: 'Hello!' },
    { text: 'Hi, how can I help you?', role: 'assistant', renderedText: 'Hi, how can I help you?' },
]);

// 设置 marked 选项
marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-'
});

const renderMessage = (text) => {
    return enhanceCodeBlock(marked(text, { langPrefix: 'lang-' }));

};

const highlightCodeBlocks = () => {
    document.querySelectorAll('pre code').forEach((block) => {
        if (!block.classList.contains('hljs')) {
            hljs.highlightElement(block);
        }
    });
};

const userSendMessage = async () => {
    // 用户输入
    if (newMessage.value.trim() !== '' && replying.value === false) {
        await sendMessage(newMessage.value);
    }
    // 停止回答
    if (replying.value === true && sendButton.value === 'Stop') {
        stop.value = true;
    }
}


const sendMessage = async (message) => {
    messages.value.push({ text: message, role: 'user', renderedText: message });
    const userMessage = message;
    newMessage.value = '';
    // 当前屏幕滚动到用户提问处
    // 拿到 最后一个 message-sent class 的元素
    await nextTick();
    let querySelector = document.querySelector('.message-sent:last-child');
    if (querySelector) {
        querySelector.scrollIntoView({ behavior: 'smooth' });
    }
    await streamRequest(userMessage);

    
};

// const sendMessage = async () => {

//     if (newMessage.value.trim() !== '' && replying.value === false) {
//         messages.value.push({ text: newMessage.value, role: 'user', renderedText: newMessage.value });
//         const userMessage = newMessage.value;
//         newMessage.value = '';
//         // 当前屏幕滚动到用户提问处
//         // 拿到 最后一个 message-sent class 的元素
//         await nextTick();
//         let querySelector = document.querySelector('.message-sent:last-child');
//         if (querySelector) {
//             querySelector.scrollIntoView({ behavior: 'smooth' });
//         }
//         await streamRequest(userMessage);
//     }
//     // 停止回答
//     if (replying.value === true && sendButton.value === 'Stop') {
//         stop.value = true;
//     }
// };

const enhanceCodeBlock = (content) => {
    let enhance = content.replace(/<pre><code/g, '<pre><div class="enhance"><div class="lang">CODE</div><div class="copyCode">Copy<i class="el-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"></path></svg></i></div></div><code')
    return enhance
}




//自定义指令增强代码块功能
const vEnhanceCode = (el) => {
    let codeBlocks = el.querySelectorAll('pre');
    if (!codeBlocks || codeBlocks.length == 0) {
        return
    }
    //   console.log(codeBlocks)
    codeBlocks.forEach((codeBlock, i) => {
        // console.log(codeBlock)
        // 获取代码块中的语言标识
        const code = codeBlock.querySelector("code")
        let lang = null;
        const classList = code.classList;
        for (let className of classList) {
            if (className.startsWith('language-')) {
                lang = className.substring(9); // 去掉 "language-" 前缀
                break;
            }
        }
        //首字母大写
        if (lang) {
            lang = lang.charAt(0).toUpperCase() + lang.slice(1)
        }
        // 获取增强入口
        let enhance = codeBlock.querySelector(".enhance")
        if (enhance) {
            // 判断是否已经注册
            const origin = enhance.querySelector(".lang").innerHTML
            if (origin != "CODE") {
                return
            }
            // 替换预定义的Code标识
            enhance.querySelector(".lang").innerHTML = lang
            // 注册复制按钮事件
            let copyCode = enhance.querySelector(".copyCode")
            // 判断是否有注册事件
            if (copyCode) {
                copyCode.removeEventListener("click", () => { })
            }
            copyCode.addEventListener("click", () => {
                copy(code.innerText)
            })

        }
    })
    // 寻找到最后的任何子元素，屏幕滚动到这里 增加防抖处理

    // let curLastDiv = el.querySelectorAll('div')[el.querySelectorAll('div').length - 1]
    // if(lastDiv.value !== curLastDiv){
    //     lastDiv.value = curLastDiv
    //     curLastDiv.scrollIntoView({ behavior: 'smooth' });
    // }
}
//监听代码滚动


const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('复制成功');
    }).catch((error) => {
        console.error('Failed to copy code:', error);
    });
};





onMounted(async () => {
    // setupCopyButtons();
    let scrollTimeout = null;
    const el = document.getElementById('chat-messages');
    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const newElements = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
                if (newElements.length > 0) {
                    const curLastElement = newElements[0];
                    if (lastDiv.value !== curLastElement) {
                        // 处理一下抖动
                        lastDiv.value = curLastElement;
                        // 清除之前的定时器，避免重复触发
                        if (scrollTimeout) {
                            clearTimeout(scrollTimeout);
                        }

                        // 设置一个新的定时器，实现防抖效果
                        scrollTimeout = setTimeout(() => {
                            curLastElement.scrollIntoView({ behavior: 'smooth' });
                        }, 100); // 可以根据实际情况调整延迟时间
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(el, {
        childList: true,
        subtree: true,
    });
    // 处理第一次回答
    if(isFirst.value === true){
       isFirst.value = false
       const roleIdData = await $request.post('/ai/chat/conversation/create-my', {roleId: roleId.value});
       conversationId.value = roleIdData.data;
       await firstAnswer();
    }
    
});

const firstAnswer = async () => {
    const data = history.state.data
    const formattedString = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
    console.log(formattedString)
    await sendMessage(formattedString)
}

const streamRequest = async (userMessage) => {
    try {
        const aiResponse = await fetch(base_url+'/ai/chat/message/send-stream-appoint-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "conversationId": conversationId.value,
                "content": userMessage,
                "useContext": false
            }),
        });
        if (!aiResponse.ok) {
            if (aiResponse.status === 401) {
                ElMessage.error('登录状态已过期，请重新登录')
                router.push('/login')
            } else {
                throw new Error(`HTTP error status: ${aiResponse.status}`);
            }
        }

        // 设置状态
        sendButton.value = 'Stop'
        replying.value = true
        const reader = aiResponse.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let assistantMessage = { text: '', role: 'assistant', renderedText: '' };
        messages.value.push(assistantMessage);

        while (true) {
            const { done, value } = await reader.read();
            if (done || stop.value === true) {
                stop.value = false
                sendButton.value = 'Send'
                replying.value = false;
                break
            };

            buffer += decoder.decode(value);

            const parts = buffer.split('\n\n');
            buffer = parts.pop() || '';

            parts.forEach(part => {
                if (part.startsWith('data:')) {
                    const jsonData = JSON.parse(part.slice(5));
                    assistantMessage.text += jsonData.data.receive.content.replace('\n\n', '\r\n');
                    assistantMessage.renderedText = renderMessage(assistantMessage.text);
                }
            });

            // 强制更新视图
            messages.value = [...messages.value];
            await nextTick();
            highlightCodeBlocks();


        }
    } catch (error) {
        console.error('Error fetching stream data:', error);
        messages.value.push({
            text: 'Sorry, an error occurred while processing your request.',
            role: 'assistant',
            renderedText: 'Sorry, an error occurred while processing your request.'
        });
    }
};
</script>

<style lang="less" scoped>
/* 保持原有样式 */
.chat-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 0 50px;

}

.chat-content-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 20px;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    margin-top: 20px;
}


.message-sent,
.message-received {
    margin-bottom: 10px;
    // max-width: 60%;
}

.message-sent {
    text-align: right;
    white-space: pre-line;
}

.message-received {
    text-align: left;
}

.message-content {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 55%;
}

.message-sent .message-content {
    background-color: #fff;
}

.message-received .message-content {
    background-color: #fff;
}

/* 新增和修改的样式 */
.message-content pre {
    position: relative;
    background-color: #282c34;
    border-radius: 6px;
    padding: 1em;
    margin: 0.5em 0;
}

.message-content code {
    color: #abb2bf;
    font-family: 'Courier New', Courier, monospace;
}

.enhance {
    display: flex;
    justify-content: space-around;
    color: white;
    padding: 0px 10px;
    border-radius: 5px 5px 0 0;
    background: #343541de;
}

:deep(.enhance) {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 0px 10px;
    border-radius: 5px 5px 0 0;
    background: #343541de;
}

.copyCode.clicked {
    color: green;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
}

.chat-input input {
    flex-grow: 1;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 30px;
    outline: none;
    box-shadow: none;
    transition: all 0.3s ease;
    margin-right: 10px;
}

.chat-input input:focus {
    border-color: #0084ff;
    box-shadow: 0 0 5px rgba(0, 132, 255, 0.2);
}

.chat-input button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #0084ff;
    color: white;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.chat-input button:hover {
    background-color: #006bbf;
}

.chat-input button:active {
    background-color: #004c8c;
}
</style>