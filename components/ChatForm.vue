<template>
  <div class="input-container">
    <textarea
      v-model="text"
      @click="openLoginModal"
      @keydown.enter="addMessage"
    ></textarea>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <div class="image-container">
        <img src="~/assets/google_sign_in.png" v-on:click="login" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { db, firebase } from "~/plugins/firebase";

import Vue from "vue";
import { mapActions } from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

export default {
  data() {
    return {
      text: null,
      dialogVisible: false
    };
  },
  methods: {
    // setUserを簡潔に呼び出せるようにする為、mapMutationsにてmethodsに読み込み
    ...mapActions(["setUser"]),
    // ログインモーダルを表示
    openLoginModal() {
      this.dialogVisible = true;
    },
    // メッセージ送信
    addMessage(event) {
      // 日本語入力中のEnterキー押下は対象外
      if (this.keyDownedForJPConversion(event)) {
        return;
      }
      const channelId = this.$route.params.id;
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          text: this.text,
          createdAt: new Date().getTime()
        })
        .then(() => {
          this.text = null;
        });
    },
    // 日本語入力中のEnterキー押下を検知
    keyDownedForJPConversion(event) {
      const codeForConversion = 229;
      return event.keyCode === codeForConversion;
    },
    // ログイン処理
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const user = result.user;
          this.setUser(user);
          console.log(this.$store.state.user);
          this.dialogVisible = false;
        })
        .catch(error => {
          window.alert(error);
        });
    }
  }
};
</script>

<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
}

textarea {
  width: 100%;
  height: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
}

img {
  width: 70%;
  cursor: pointer;
}
</style>
