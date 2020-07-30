<template>
  <div id="load-file">
    <form novalidate>
      <flex-row noWrap align-v="center" id="file">
        <md-field>
          <label>M3U8 File (click to upload)</label>
          <md-file @md-change="load($event)" />
        </md-field>
      </flex-row>
    </form>
  </div>
</template>

<script>
import { M3u8Service } from "@/services/m3u8_service";

export default {
  name: "LoadFile",
  methods: {    
    load: function($event) {
      let file = $event[0];
      let service = new M3u8Service();
      service.loadFile(file).then(
        (channels) => {
          this.$emit("loaded", channels);
        }
      );
    }
  }
}
</script>

<style>
#load-file { 
  width: 600px;
  padding: 16px;
}
</style>