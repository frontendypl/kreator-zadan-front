<template>
  <nav class=" c-AppHeaderComponent navbar bg-dark text-light">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand text-light" href="#">{{list.name}}</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeaderComponent',
  props: {
    list: {
      type: Object
    }
  }
}
</script>