<template>
  <div id="load-m3u8">
    <form novalidate>
      <flex-row noWrap align-v="center">
        <md-field id="url">
          <md-icon>link</md-icon>
          <label>m3u8 URL</label>
          <md-input v-model="url"></md-input>
        </md-field>
        <md-button v-on:click="loadURL" class="md-raised">Load</md-button>
      </flex-row>
      <flex-row noWrap align-v="center">
        <md-field>
          <label>m3u8 File</label>
          <md-file @md-change="loadFile($event)" />
        </md-field>
      </flex-row>
    </form>
  </div>
</template>

<script>
import { M3u8Service } from "../services/M3u8Service";

export default {
  name: "LoadM3u8",
  data: () => ({
    url: "http://i.mjh.nz/nzau/kodi-tv.m3u8",
    file: null
  }),
  methods: {
    loadURL: function() {
      let service = new M3u8Service(this.$http);
      service.loadURL(this.url).then(
        (m3u8Data) => {
          this.$emit("m3u8Data", m3u8Data);
        }
      );
    },
    loadFile: function($event) {
      let file = $event[0];
      let service = new M3u8Service();
      service.loadFile(file).then(
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