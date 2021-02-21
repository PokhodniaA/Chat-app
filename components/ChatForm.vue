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

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import snackBarMixin from '@/mixins/snackBar'

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
            this.showSnackBar("Can't send message(")
            // this.$store.commit.showError("Can't send message(")
          } else {
            this.text = ''
          }
        }
      )
    },
  },
  mixins: [snackBarMixin],
}
</script>