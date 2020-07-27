<template>
  <div id="load-by-uploaded-file">
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
import { M3u8Service } from "../../services/M3u8Service";

export default {
  name: "LoadByUploadedFile",
  methods: {    
    load: function($event) {
      let file = $event[0];
      let service = new M3u8Service();
      service.loadFile(file).then(
        (m3u8Data) => {
          this.$emit("loaded", m3u8Data);
        }
      );
    }
  }
}
</script>

<style>
#load-by-uploaded-file { 
  width: 600px;
  padding: 16px;
}
</style>