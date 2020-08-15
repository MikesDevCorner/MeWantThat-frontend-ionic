<template>
  <ion-page>
    <ion-content color="primary">
      <ion-grid>
        <ion-row color="primary" class="ion-justify-content-center">
          <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
            <div class="ion-text-center hl">
              <h1 v-if="register===false">Shopping List</h1>
              <h3 v-if="register===true">Register an Account for Shopping List</h3>
            </div>
            <div class="ion-padding" style="margin: 4px;">
              <ion-item v-if="register">
                <ion-label position="floating">Name</ion-label>
                <ion-input type="text" 
                          :value="name"
                          inputmode="text"
                          @input="name=$event.target.value"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">E-Mail</ion-label>
                <ion-input type="email"
                          :value="email"
                          inputmode="email"
                          @input="email=$event.target.value"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password"
                          :value="password"
                          inputmode="text"
                          @input="password=$event.target.value"></ion-input>
              </ion-item>
              <ion-item v-if="register">
                <ion-label position="floating">Password again</ion-label>
                <ion-input type="password"
                          :value="passwordconfirm"
                          inputmode="text"
                          @input="passwordconfirm=$event.target.value"></ion-input>
              </ion-item>
              <div class="lbutton">
                <ion-button expand="block" @click="login">{{ register ? 'Register' : 'Login' }}</ion-button>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="changeToRegister">
          <font-awesome-icon class="fa-lg" v-if="register" icon="sign-in-alt" />
          <font-awesome-icon class="fa-lg" v-if="!register" icon="user-plus" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      register: false,
      email: "",
      password: "",
      passwordconfirm: "",
      name: ""
    };
  },
  methods: {
    changeToRegister() {
      this.register = !this.register
    },
    async login() {
      this.email = this.email.trim();
      if (this.email !== "" && this.password !== "") {
        this.showLoading();
        try {
          let response = null
          if(this.register === true) {
            response = await this.$api.register(
              this.name,
              this.email,
              this.password,
              this.passwordconfirm
            )
          } else {
            response = await this.$api.login(
              this.email,
              this.password
            )
          }
          if (response.status === 202) {
            this.$router.replace({name: "all-lists"});
            this.presentToast("Login successful")
          } else if(response.status === 201) {
            this.$router.replace({name: "all-lists"});
            this.presentToast("Registered successful and logged in")
          } else if(response.status === 401) {
            this.presentToast("Please check E-Mail and Password and try again");
          }
          this.hideLoading()
        } catch(e) {
          this.hideLoading();
          this.presentToast("Something went wrong on contacting the API: "+e.message);
        }
      } else {
        this.presentToast("Please check your input fields")
      }
    },
    goBack() {
      this.$router.replace({
        name: "single-list-view",
        params: { listid: this.listid, title: this.title }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  ion-content{
    --ion-background-color:#2196f3;
  }

  .lbutton {
    margin: -2px;
    margin-top: 30px;
  }

  ion-button {
    --background: #062f77;
  }

  ion-item {
      --background: #2196f3;
      --color: #fff;
      margin-bottom: 5px;
      --highlight-color-focused	: #062f77;
      --padding-end: 0px;
      --padding-start: 0px;
      --highlight-height: 1px;
      /*--show-full-highlight: true;*/
  }

  .hl {
    margin-bottom: 40px;
    padding: 0px 32px;
  }

  .hl > h1 {
    font-size: 43px;
    font-weight: normal;
    text-align: center;
    margin-top: 40px;
  }

  .hl > h3 {
    font-size: 30px;
    font-weight: normal;
    text-align: left;
  }



</style>