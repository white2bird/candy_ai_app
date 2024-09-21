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
            </div>

            <div class="chat-input">
                <input v-model="newMessage" type="text" placeholder="Type your message..." @keyup.enter="sendMessage" />
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: '',
            messages: [
                { text: 'Hello!', sent: true, role: 'user' },
                { text: 'Hi, how can I help you?', sent: false, role: 'assistant' },
            ],
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({ text: this.newMessage, sent: true });
                this.newMessage = '';
            }
        },
    },
};
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