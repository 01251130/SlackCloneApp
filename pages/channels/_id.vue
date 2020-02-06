<template>
  <div class="container">
    <div class="chats-layout">
      <messages v-bind:messages="messages" />
    </div>
    <div class="input-layout">
      <chat-form />
    </div>
  </div>
</template>

<script>
import Messages from "~/components/Messages.vue";
import ChatForm from "~/components/ChatForm.vue";
import { db } from "~/plugins/firebase";

export default {
  components: {
    Messages,
    ChatForm
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    const channelId = this.$route.params.id; // 現在のURLからidを取得
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        // messagesコレクションに対して、スナップショットとの差分のみを取得
        snapshot.docChanges().forEach(change => {
          const doc = change.doc;
          // 変更種別が「追加」のみを対象とする
          if (change.type === "added") {
            this.messages.push({ id: doc.id, ...doc.data() });
          }
        });
      });
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
