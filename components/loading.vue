<template>
    <div class="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="10"></v-progress-circular>
    </div>
</template>
<style>
.loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;background-color: rgba(255, 255, 255,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
</style>