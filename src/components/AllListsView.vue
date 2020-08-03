<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Shopping Lists</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <ion-item button v-for="(list, index) in lists" :key="index">
          <ion-ripple-effect></ion-ripple-effect>
          <font-awesome-icon icon="list" style="color:#3880ff; margin-right: 35px;" />
          <ion-label @click="openList(list)">
            <h2>{{list.listenname}}</h2>
            <ion-note>{{list.updated_at}}</ion-note>
          </ion-label>
          <ion-button fill="clear" size="large" slot="end" @click="removeList(list)">
            <font-awesome-icon icon="trash" style="color:#666;" />
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addList">
          <font-awesome-icon icon="plus" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>

import { Plugins } from '@capacitor/core'

export default {
  name: "AllListsView",
  mounted() {
    this.refreshList();
    if(this.alreadySubscribed === false) {
      Plugins.App.addListener('backButton', function() { 
        Plugins.App.exitApp();
      });
      this.alreadySubscribed = true;
    }
  },
  data() {
    return {
      lists: [],
      alreadySubscribed: false
    };
  },
  methods: {
    async refreshList() {
      this.showLoading();
      let response = await this.$api.getLists();
      this.lists = response.data;
      this.hideLoading();
    },
    openList(list) {
      this.$router.push({
        name: "single-list-view",
        params: { listid: list.id, title: list.listenname }
      });
    },
    addList() {
      this.$router.push({ name: "new-list" });
    },
    async removeList(list) {
      this.showLoading();
      let response = await this.$api.removeList(list);
      if (response.status === 204) {
        this.refreshList();
        this.presentToast("Löschen erfolgreich.");
      } else {
        this.presentAlert(
          "Fehler",
          "Leider ist beim Löschen etwas schief gegangen."
        );
      }
    }
  }
};
</script>


<style scoped>
</style>