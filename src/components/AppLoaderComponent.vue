<template>
  <div class="c-AppLoaderComponent position-fixed w-100 h-100 d-flex top-0 flex-column align-items-center justify-content-center">
    <div class="row">
      <div class="col">
        <div class="spinner-grow text-primary" role="status">
        </div>
        <div class="spinner-grow text-secondary" role="status">
        </div>
        <div class="spinner-grow text-success" role="status">
        </div>
        <div class="spinner-grow text-danger" role="status">
        </div>
        <div class="spinner-grow text-warning" role="status">
        </div>
<!--        <div class="spinner-grow text-info" role="status">-->
<!--        </div>-->
<!--        <div class="spinner-grow text-light" role="status">-->
<!--        </div>-->
<!--        <div class="spinner-grow text-dark" role="status">-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoaderComponent'
}
</script>

<style lang="scss">
.c-AppLoaderComponent {
  z-index: 100;
  background-color: rgba(0,0,0,0.9);

  .spinner-grow{
    margin: 1em;
  }
}
</style>