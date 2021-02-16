<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Users.</v-subheader>

        <v-list-item v-for="user in users" :key="user.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id == 2 ? 'primary' : 'grey'">
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
      <div>
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
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    }
  },
  methods: {
    ...mapMutations(['clearData']),
    exitUser() {
      this.$router.push('/?message=leftChat')
      this.clearData()
    },
  },
  computed: mapState(['user']),
}
</script>
