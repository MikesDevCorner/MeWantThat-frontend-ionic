<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button menu="first" >
            <font-awesome-icon class="fa-xs" icon="bars"/>
          </ion-menu-button>
        </ion-buttons>
        <ion-title>New List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="gpadding">
        <ion-item class="nameinput">
          <ion-label position="floating">Listname</ion-label>
          <ion-input type="text" 
                    :value="listName" 
                    autofocus="true"
                    maxlength="60"
                    required
                    @ionInput="listName=$event.target.value"></ion-input>
        </ion-item>
        <ion-note class="form-error">{{nameError}}</ion-note>
        <div class="icenter">
          <ion-button :disabled="!formValid" color="tertiary" expand="block" @click="doValidate">Save</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "NewListPage",
  data() {
    return {
      listName: "",
      validate: false
    };
  },
  mounted() {
    this.$root.$emit('menu-on')
  },
  computed: {
    nameError() {
      if(this.validate === true) {
        const re = /^[a-zA-Z0-9üÜäÄöÖß_ ]*$/
        if(re.test(this.listName)) {
          if(this.listName.length > 60) return "Reduce name to less than 60 characters"
          else if(this.listName.length === 0) return "Name should not be empty"
          else return ""
        }
        else return "Only characters and digits are allowed"
      }
      else return ""
    },
    formValid() {
      if(this.validate === false || (this.nameError === "")) return true
      else return false
    },
  },
  methods: {
    doValidate() {
      this.validate = true
      this.$nextTick(() => {
        if(this.formValid === true) this.saveList()
        else this.presentToast("Please check your input fields")
      })
    },
    async saveList() {
      this.validate = false
      this.listName = this.listName.trim();
      this.showLoading();
      try {
        let response = await this.$api.addList(this.listName);
        this.hideLoading();
        if (response.status === 201) {
          this.$router.replace({ name: "all-lists" });
          this.presentToast("List created successfully");
        } else if(response.status === 401) {
          this.hideLoading();
          this.$router.replace({name: "login"});
        }
      } catch(e) {
        this.hideLoading();
        this.presentAlert(
          "Error",
          "Some error occured during creation of your list"
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nameinput {
    margin-top: 40px;
  }
  ion-note {
    margin-bottom: 20px;
  }

  .icenter {
    padding-top: 15px;
  }

  .gpadding {
    margin: 30px;
  }

  ion-item {
      margin-bottom: 5px;
      --padding-end: 0px;
      --padding-start: 0px;
      --highlight-height: 1px;
  }
</style>