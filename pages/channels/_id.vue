<template>
  <div class="container">
    <div class="chats-layout">
      <messages />
    </div>
    <div class="input-layout">
      <chat-form />
    </div>
  </div>
</template>

<script>
import Messages from "~/components/Messages.vue";
import ChatForm from "~/components/ChatForm.vue";

export default {
  components: {
    Messages,
    ChatForm
  },
  mounted() {
    console.log(process.env.FIREBASE_API_KEY);
    // console.log(process.env.FIREBASE_AUTH_DOMAIN);
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.chats-layout {
  overflow: scroll;
  height: 90%;
}

.input-layout {
  height: 10%;
}
</style>
