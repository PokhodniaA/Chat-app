<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        label="Input your message."
        solo
        v-model="text"
        @keydown.enter="sendNewMessage"
        @click:append="sendNewMessage"
        append-icon="mdi-send"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    sendNewMessage() {
      this.$socket.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id,
        },
        (data) => {
          if (typeof data === 'string') {
            console.error("Can't send message(")
          } else {
            this.text = ''
          }
        }
      )
    },
  },
}
</script>