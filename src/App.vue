<template>
  <div id="app">
    <ion-app>
      <ion-menu :disabled="menuDisabled" side="end" menu-id="first" type="overlay" content-id="thepage" ref="menu">
        <ion-header>
          <ion-toolbar color="primary" style="text-align:center; padding: 20px 0;">
            <img alt="Logo" src="./assets/logosm.png" style="width: 40%;">
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
              <ion-item @click="logout">
                <font-awesome-icon class="text-color-primary" icon="power-off" style="margin-right: 35px;" />
                <ion-label>Logout</ion-label>
              </ion-item>
              <ion-item @click="deleteAccount">
                <font-awesome-icon class="text-color-primary" icon="user-minus" style="margin-right: 35px;" />
                <ion-label>Delete Account</ion-label>
              </ion-item>
            </ion-list>
        </ion-content>
      </ion-menu>
      <div id="thepage">
        <ion-vue-router />
      </div>
    </ion-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function () {
    return {
      menuDisabled: true
    }
  },
  created() {
    this.$root.$on('menu-on', () => {
      this.menuDisabled = false;
    })
    this.$root.$on('menu-off', () => {
      this.menuDisabled = true;
    })
  },
  methods: {
    async logout() {
      this.$refs.menu.close();
      await this.$api.logout();
      this.$router.replace({name: "login"});
    },
    async deleteAccount() {
      this.presentAlert(
        "Unregister", 
        "Would you really like to delete your account and all its data permanently from our databases? You cannot undo this action.", 
        undefined, [
          {   text: 'Cancel',
              role: 'cancel',
              handler: () => { },
          },{
              text: 'Delete account',
              handler: async () => {
                this.$refs.menu.close();
                await this.$api.unregister();
                this.$router.replace({name: "login"});
              }
            }
        ]
      )
    }
  }
};
</script>

<style>

  @font-face {
    font-family: 'Ubuntu';
    src: url('assets/Ubuntu-Regular.ttf');
  }

  @font-face {
    font-family: 'Caveat';
    src: url('assets/Caveat-Regular.ttf');
  }

  * {
    font-family: 'Ubuntu';
  }

  .handwritten {
    font-family: 'Caveat';
  }

  #thepage {height: 100%;}

  .mytoast {
    opacity: 0.9;
    --end: 75px;
  }

  ion-title {
    font-size: 19px;
  }

  ion-item {
    --inner-border-width: 0;
  }
   
  ion-fab-button{
      --background: #13293D;
  }

  ion-loading.my-loading-class .loading-wrapper {
    background: transparent;
    box-shadow: none;
  }

  ion-note {
    color: #7A0F0F;
  }

  .text-alt-color {
    color: #7a0f07;
  }

  .text-color-primary {
    color: #2A628F;
  }

  ion-header ion-menu-button {
    --padding-end: 15px;
  }

  :root {
  --ion-color-primary: #2A628F;
  --ion-color-primary-rgb: 42,98,143;
  --ion-color-primary-contrast: #fcf9ed;
  --ion-color-primary-contrast-rgb: 252,249,237;
  --ion-color-primary-shade: #3679ae;
  --ion-color-primary-tint: #265276;
  --ion-color-secondary: #FCF9ED;
  --ion-color-tertiary: #13293D;
  --ion-color-light: #3B2D29;
  --ion-color-medium: #7A0F0F;
  --ion-background-color:#fcf9ed;
  }

  .form-error {
    color: #d93d32;
  }
</style>