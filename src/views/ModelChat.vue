<template>
    <div class="chat-container">
        <div class="chat-content-body">
            <div class="chat-header"></div>
            <div class="chat-messages">
                <div v-for="(message, index) in messages" :key="index"
                    :class="{ 'message-sent': message.sent, 'message-received': !message.sent }">
                    <div class="message-content">
                        <p>{{ message.text }}</p>
                    </div>
                </div>
                {{ formatResponseText }}
            </div>

            <div class="chat-input">
                <input v-model="newMessage" type="text" placeholder="Type your message..." @keyup.enter="sendMessage" />
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
const newMessage = ref('')
const $request = inject('$request')
const response = ref('');
const responseText = ref('')
const prevLen = ref(0);


const formatResponseText = computed(() => {
    return formatResponse(response.value)
})

const messages = ref([
    { text: 'Hello!', sent: true, role: 'user' },
    { text: 'Hi, how can I help you?', sent: false, role: 'assistant' },
])


const sendMessage = () => {
    if (this.newMessage.trim() !== '') {
        this.messages.push({ text: this.newMessage, sent: true });
        this.newMessage = '';
    }
}

const streamRequest = async () => {
    try {
        const airesponse = await fetch('http://localhost:8000/ai/chat/message/send-stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                // 你的请求参数
                "conversationId": 1,
                "content": "写一个python的代码",
                "useContext": false
                // 其他参数
            }),
        });

        if (!airesponse.ok) {
            throw new Error(`HTTP error status: ${airesponse.status}`);
        }
        const reader = airesponse.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = ''; // 缓冲区存储不完整的数据块

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // buffer += decoder.decode(value, { stream: true });
            buffer += decoder.decode(value);
            const parts = buffer.split('\n\n');
            buffer = parts.pop() || ''; // 保留不完整的部分  
            parts.forEach(part => {
                if(part.startsWith('data:')){
                    const jsonData = JSON.parse(part.slice(5));
                    response.value += jsonData.data.receive.content
                }
            });


        }
        console.log(response)

        // 处理最后一个数据块
        // if (buffer.trim() !== '') {
        //     try {
        //         const jsonData = JSON.parse(buffer.trim());
        //         if (jsonData.data && jsonData.data.receive && jsonData.data.receive.content) {
        //             receiveContent.value += jsonData.data.receive.content;
        //         }
        //     } catch (error) {
        //         console.error('Error parsing JSON:', error);
        //     }
        // }
    } catch (error) {
        console.error('Error fetching stream data:', error);
    }
};


// const streamRequest = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:8000/ai/chat/message/send-stream', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.setRequestHeader('token', localStorage.getItem('token')); // 如果需要授权

//     xhr.onprogress = (e) => {
//         const responseText = e.target.responseText;
//         console.log('Received data:', responseText);

//     };

//     xhr.onload = () => {
//         console.log('Stream data fetching completed.');
//     };

//     xhr.onerror = () => {
//         console.error('Error fetching stream data.');
//     };

//     xhr.send(JSON.stringify({
//         "conversationId": 1,
//         "content": "你好",
//         "useContext": false
//     }));
// };
const formatResponse = (text) => {
    return text;
};

onMounted(async () => {
    await streamRequest()
})


</script>

<style scoped>
.chat-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 0 30px;

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
    display: flex;
    margin-bottom: 10px;
    align-items: center;
}

.message-sent {
    justify-content: flex-end;
}

.message-received {
    justify-content: flex-start;
}

.message-content {
    max-width: 60%;
    /* padding: 10px; */
    padding: 0 10px;
    border-radius: 10px;
    background-color: #e0e0e0;
}

.message-sent .message-content {
    background-color: #007bff;
    color: white;
}

.chat-input {
    display: flex;
    gap: 10px;
}

.chat-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.chat-input button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chat-input button:hover {
    background-color: #0056b3;
}
</style>