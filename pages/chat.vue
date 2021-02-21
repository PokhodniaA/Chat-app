<template>
  <div class="chat">
    <div class="chat__list" ref="block">
      <Message
        v-for="message in messages"
        :key="message.text"
        :name="message.name"
        :text="message.text"
        :owner="message.id === user.id"
      />
    </div>

    <div class="chat__form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'

export default {
  middleware: ['chat'],
  head() {
    return {
      title: `Your room ${this.user.room}`,
    }
  },
  computed: mapState(['user', 'messages']),
  components: { Message, ChatForm },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  position: relative;
  overflow: hidden;

  &__list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }

  &__form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }
}
</style>