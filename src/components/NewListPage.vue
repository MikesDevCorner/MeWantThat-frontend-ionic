<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <font-awesome-icon icon="power-off" @click="logout" />
          </ion-button>
        </ion-buttons>
        <ion-title>New List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item class="nameinput">
        <ion-label position="floating">New List</ion-label>
        <ion-input type="text" 
                  :value="listName" 
                  maxlength="60"
                  required
                  @input="listName=$event.target.value"></ion-input>
      </ion-item>
      <div class="icenter">
        <ion-button color="light" @click="saveList">Save</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "NewListPage",
  data() {
    return {
      listName: ""
    };
  },
  methods: {
    async saveList() {
      this.listName = this.listName.trim();
      if (this.listName !== "") {
        this.showLoading();
        try {
          let response = await this.$api.addList(this.listName);
          this.hideLoading();
          if (response.status === 201) {
            this.$router.replace({ name: "all-lists" });
            this.presentToast("List created successfully");
          }
        } catch(e) {
          this.hideLoading();
          this.presentAlert(
            "Error",
            "Some error occured during creation of your list"
          );
        }
      } else {
        this.presentToast("Listname should not be empty");
      }
    },
    async logout() {
      await this.$api.logout();
      this.$router.replace({
        name: "login"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nameinput {
  margin-top: 40px;
  margin-bottom: 20px;
}
.icenter {
  text-align: center;
}
</style>