<template>
  <div id="load-m3u8">
    <form novalidate>
      <flex-row noWrap align-v="center" id="url">
        <md-field>
          <md-icon>link</md-icon>
          <label>m3u8 URL</label>
          <md-input v-model="url"></md-input>
        </md-field>
        <md-button v-on:click="loadURL" class="md-raised">Load</md-button>
      </flex-row>
      <flex-row noWrap align-v="center" id="file">
        <md-field>
          <label>m3u8 File</label>
          <md-file @md-change="loadFile($event)" />
        </md-field>
      </flex-row>
      <flex-row noWrap align-v="center" id="countries">
        <md-field>
          <md-icon>flag</md-icon>
          <label for="country">Country</label>
          <md-select v-model="country" name="country" id="country" @md-selected="countrySelected()">
            <md-option v-for="country in countries"  :key="country" :value="country">{{country}}</md-option>
          </md-select>
        </md-field>
      </flex-row>
    </form>
  </div>
</template>

<script>
import { M3u8Service } from "../services/M3u8Service";
import { ChannelsService } from "../services/ChannelsService";

export default {
  name: "LoadM3u8",
  data: () => ({
    channelsService: null,
    url: "http://i.mjh.nz/nzau/kodi-tv.m3u8",
    file: null,
    countries: [],
    country: null
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
    },
    countrySelected: function() {
      let channels = this.channelsService.findCountry(this.country);
      this.$emit("channels", channels);
    }
  },
  mounted() {
    this.channelsService = new ChannelsService(this.$http);
    this.channelsService.load().then(
      () => {
        this.countries = this.channelsService.countries();
      }
    );
  }
}
</script>

<style>
#load-m3u8 { 
  width: 600px;
  padding: 16px;
}
#load-m3u8 #url md-field {
  width: 450px;
}
#load-m3u8 #countries .md-menu.md-select {
  padding-left: 12px;
}

.md-menu-content {
  min-width: initial;
  max-width: initial;
}
.md-menu-content.md-select-menu {
  width: 600px;
}
</style>