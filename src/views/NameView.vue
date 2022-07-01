<template>
  <div class="v-EnterView w-100 mt-auto mb-auto">

    <div class="container text-center">
      <form class="w-40">
        <div class="row">
          <div class="col">
            <h1>Twoje imię</h1>
          </div>
        </div>
        <div class="row gx-2 justify-content-center">
          <div class="col col-xl-5">
            <input type="text" id="enter-code-input" class="form-control form-control-lg w-100 fs-1 mb-2 text-center">
          </div>
          <div class="col col-auto">
            <button class="btn btn-primary text-light btn-lg"><i class="bi bi-check fs-1"></i></button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="enter-code-input">Wpisz swoje imię/pseudonim lub inicjały</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">


</style>