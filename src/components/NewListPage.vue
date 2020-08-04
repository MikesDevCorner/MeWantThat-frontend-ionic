<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>New List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item class="nameinput">
        <ion-label position="floating">New List</ion-label>
        <ion-input type="text" 
                  :value="listName" 
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
        let response = await this.$api.addList(this.listName);
        if (response.status === 201) {
          this.$router.replace({ name: "all-lists" });
          this.presentToast("List created successfully");
        } else {
          this.presentAlert(
            "Error",
            "Some error occured during creation of your list"
          );
        }
        this.hideLoading();
      } else {
        this.presentToast("Listname should not be empty");
      }
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