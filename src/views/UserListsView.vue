<template>
  <div class="v-UserListsView container mt-5 p-5">
   <div class="row gy-4" >
    <div class="col-12 align-items-center d-flex border-bottom" v-for="list in userLists" :key="list._id">

      <b class="fs-1 me-5">
        <a :href="`${frontUrl}/#/${list.shortCode}`" class="text-black text-decoration-none">
          {{list.name}}
        </a>
      </b>
      <a  class="btn btn-success"
          :href="`${frontUrl}/#/${list.shortCode}`">
        {{list.shortCode}}
      </a>
    </div>
   </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"

//TODO
//zrobić zwykłe linki (a href) do konkretnej listy zadań

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['userLists']),
    ...mapGetters(['frontUrl'])
  }
}
</script>

<style lang="scss">

.v-UserListsView{
  background-color: rgba(255,255,255,0.8);
  border-radius: 2rem;
}

@media (max-width: 450px){
  .col-12{
    justify-content: space-between;
  }
}

</style>