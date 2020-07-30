<template>
  <div id="load-countries">
    <form novalidate>
      <flex-row noWrap align-v="center" id="countries">
        <md-icon>flag</md-icon>
        <md-autocomplete v-model="country" @md-selected="selected()" :md-options="countries">
          <label>Country</label>
        </md-autocomplete>
      </flex-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoadCountries",
  data: () => ({
    countries: [],
    country: null,
  }),
  methods: {
    selected: function() {
      let channels = this.$store.channelsService.findCountry(this.country);
      this.$emit("loaded", channels);
    }
  },
  mounted() {
    this.$store.channelsService.load().then(
      () => {
        this.countries = this.$store.channelsService.countries();
      }
    );
  }
}
</script>

<style>
#load-countries { 
  width: 600px;
  padding: 16px;
}
#load-countries #countries .md-icon { margin-right: 16px; }
</style>