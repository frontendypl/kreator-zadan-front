<template>
  <div>
   <p v-for="list in userLists" :key="list._id">
    {{list.name}}
     <a :href="`${frontUrl}/#/${list.shortCode}`">
       {{list.shortCode}}
     </a>
   </p>
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