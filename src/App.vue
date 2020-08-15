<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
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
      --background: #062f77;
  }

  ion-loading.my-loading-class .loading-wrapper {
    background: transparent;
    box-shadow: none;
  }

  ion-note {
    color: #888;
  }

  :root {
  --ion-color-primary: #2196f3;
  --ion-color-primary-rgb: 33,150,243;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255,255,255;
  --ion-color-primary-shade: #2386d5;
  --ion-color-primary-tint: #2079c0;
  --ion-color-secondary: #062f77;
  }
</style>