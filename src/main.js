import Vue from "vue";
import Vuex from "vuex";

import { MdToolbar, MdField, MdButton, MdAvatar, MdDialog, MdMenu, MdList, MdTabs } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

import VueFlex from "vue-flex";
import "vue-flex/dist/vue-flex.css";

import VueResource from "vue-resource";

import VueBetterDPlayer from "vue-better-dplayer";

import App from "./App.vue";

Vue.use(Vuex);
Vue.use(MdToolbar);
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdAvatar);
Vue.use(MdDialog);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdTabs);
Vue.use(VueFlex);
Vue.use(VueResource);
Vue.use(VueBetterDPlayer);
Vue.config.productionTip = false;

import { ChannelsService } from "@/services/channels_service";

const store = new Vuex.Store({
  state: {
    channelsService: null
  }
})

new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.channelsService = new ChannelsService(this.$http);
    // this.$store.channelsService.load().then();
  }
}).$mount("#app");
