<template>
  <div id="load-m3u8">
    <form novalidate>
      <flex-row noWrap align-v="center">
        <md-field id="url">
          <label>m3u8 URL</label>
          <md-input v-model="url"></md-input>
        </md-field>
        <md-button v-on:click="load" class="md-raised">Load</md-button>
      </flex-row>
    </form>
  </div>
</template>

<script>
import { M3u8Service } from "../services/M3u8Service";

export default {
  name: "LoadM3u8",
  data: () => ({
    url: "http://i.mjh.nz/nzau/kodi-tv.m3u8"
  }),
  methods: {
    load: function() {
      let service = new M3u8Service(this.$http);
      service.load(this.url).then(
        (m3u8Data) => {
          this.$emit("m3u8Data", m3u8Data);
        }
      );
    }
  }
}
</script>

<style scoped>
#load-m3u8 { padding: 16px; }
#load-m3u8 #url { width: 450px; }
</style>