<template>
  <div class="message">
    <div v-if="name === 'admin'" class="message__system">
      <p class="text-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="message__wrap">
      <div class="message__user" :class="{ owner }">
        <small
          ><strong>{{ name }}</strong></small
        >
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  &__system {
    margin-bottom: 1rem;
    p {
      margin-bottom: 1rem;
    }
  }

  &__user {
    margin: 0 1rem;
    padding: 1rem;
    width: 60%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 4px;
    background: #1976d2;
    position: relative;
    margin-bottom: 1rem;
    overflow-wrap: break-word;

    p {
      margin-bottom: 0;
    }
  }

  &__wrap {
    display: flex;
    flex-direction: column;
  }
}

.owner {
  background: #ccc;
  color: #000;
  align-self: flex-end;
}
</style>