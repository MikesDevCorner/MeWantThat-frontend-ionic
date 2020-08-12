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
  ion-loading.my-loading-class .loading-wrapper {
    background: transparent;
    box-shadow: none;
  }

  :root {
  --ion-color-primary: #2196f3;
  --ion-color-primary-rgb: 33,150,243;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255,255,255;
  --ion-color-primary-shade: #2386d5;
  --ion-color-primary-tint: #2079c0;
}
</style>