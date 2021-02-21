<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card min-width="500">
        <v-card-title>Nuxt Chat</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>


<script>
import { mapMutations } from 'vuex'
import snackBarMixin from '@/mixins/snackBar'

export default {
  layout: 'empty',
  head: {
    title: 'Welcome to Nuxt Chat!',
  },
  sockets: {
    connect() {
      console.log('Socket io connected')
    },
  },
  mixins: [snackBarMixin],
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 16) || 'Name must be less than 16 characters',
    ],
    room: '',
    roomRules: [(v) => !!v || 'Room is required'],
  }),

  methods: {
    ...mapMutations(['setUser']),
    validate() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
        }

        this.$socket.emit('userJoined', user, (data) => {
          if (typeof data === 'string') {
            // Возможноздесь проверку не нужно делать
            console.log('error', data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    },
  },
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'leftChat':
        this.errorText = 'You are left the chat!'
        break
      case 'noUser':
        this.errorText = 'Fill in all the fields'
        break
    }

    this.snackbar = !!message
  },
}
</script>
