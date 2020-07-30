<template>
  <div id="load-url">
    <form novalidate>
      <flex-row noWrap align-v="center" id="url">
        <md-field>
          <md-icon>link</md-icon>
          <label>M3U8 URL</label>
          <md-input v-model="url"></md-input>
        </md-field>
        <md-button v-on:click="load" class="md-raised">Load</md-button>
      </flex-row>      
    </form>
  </div>
</template>

<script>
import { M3u8Service } from "@/services/m3u8_service";

export default {
  name: "LoadURL",
  data: () => ({
    url: "http://i.mjh.nz/nzau/kodi-tv.m3u8"
  }),
  methods: {
    load: function() {
      let service = new M3u8Service(this.$http);
      service.loadURL(this.url).then(
        (m3u8Data) => {
          this.$emit("loaded", m3u8Data);
        }
      );
    }
  }
}
</script>

<style>
#load-url { 
  width: 600px;
  padding: 16px;
}
#load-url #url md-field {
  width: 450px;
}
</style>