<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="650">
      <v-list subheader>
        <v-subheader>Users.</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">
              mdi-message-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exitUser">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-toolbar-title>Room: {{ user.room }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    ...mapMutations(['clearData']),
    exitUser() {
      this.$socket.emit('leftChat', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.clearData()
      })
    },
  },
  computed: mapState(['user', 'users']),
}
</script>
