<template>
  <div class="c-YoutubeComponent">
    <div id="player"></div>
  </div>
</template>

<script>
import fitvids from "fitvids"
import $ from 'jquery'

export default {
  name: 'YoutubeComponent',
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      player: null,
      playerStatus: null,
      playerStatusInterval: null,
    }
  },
  methods: {
    initYoutube() {
      const _ = this;
      this.player = new YT.Player("player", {
        width: 600,
        height: 400,
        videoId: _.video.ytId,
        playerVars: {
          start: _.video.startTime,
          end: _.video.endTime,
          autoplay: 1,
          // rel: 0,
          // enablejsapi: 1,
          // origin: 'http://localhost:8081'
        },
        events: {
          onReady: _.onPlayerReady,
          // onStateChange: _.onPlayerStateChange, //Not work
        }
      });

    },
    onPlayerReady(evt) {

      fitvids()
      this.getPlayerStatus()

    },
    getPlayerStatus(){
      this.playerStatusInterval = setInterval(()=>{
        // console.log('i', this.playerStatus)
        this.playerStatus = this.player.getPlayerState()

        if(this.playerStatus === 0 ){
          this.reInitPlayer()
        }

        // if(this.playerStatus === 2){
        //   let x = document.querySelector("iframe").contentWindow
        //   x.document.querySelector("body").style.backgroundColor = "blue";
        // }

      },250)
    },
    reInitPlayer(){
      this.player.destroy()
      this.initYoutube()
    },
  },
  mounted(){

    this.initYoutube()

    setTimeout(()=>{
      console.log('PlayerState',this.player.getPlayerState())
    },2000)
  },
  beforeDestroy(){
    // console.log('player destroyed')
    // this.player.destroy()
    clearInterval(this.playerStatusInterval)
  }
}
</script>

<style lang="scss">

.c-YoutubeComponent{

}

</style>