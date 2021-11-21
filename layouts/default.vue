<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fill-height class="align-start">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import Header from "@/components/Header.vue";
export default {
  name: "default",
  components: {
    Header,
  },
  methods: {
    ...mapActions("rss", ["fetchData"]),
  },
  mounted() {
    this.fetchData();
  },
};
</script>
