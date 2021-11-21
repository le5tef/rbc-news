<template>
  <v-row no-gutters class="fill-height">
    <v-col
      cols="12"
      sm="10"
      md="8"
      offset-sm="1"
      offset-md="2"
      class="d-flex align-center"
    >
      <Post v-if="post" :post="post" />
    </v-col>
    <PopUp />
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import PopUp from "@/components/PostFullScreenImages.vue";
import Post from "@/components/Post.vue";
export default {
  components: {
    Post,
    PopUp,
  },
  computed: {
    ...mapState("rss", ["feed"]),
    post() {
      if (!this.feed.items) {
        return null;
      }
      return this.feed.items.find((x) => {
        return x.id == this.$route.params.id;
      });
    },
  },
};
</script>