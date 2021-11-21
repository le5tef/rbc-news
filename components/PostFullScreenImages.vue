<template>
  <div>
    <v-dialog v-model="show">
      <v-carousel
        height="100%"
        v-model="imageId"
        hide-delimiters
        v-if="post"
        :show-arrows="post.media.length > 1"
      >
        <v-carousel-item
          v-for="(image, i) in post.media"
          :key="i"
          :src="image[`rbc_news:url`][0]"
        >
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      model: "",
    };
  },
  computed: {
    ...mapState("rss", ["feed", "postId"]),
    imageId: {
      set(value) {
        this.$store.commit("rss/setImageId", value);
      },
      get() {
        return this.$store.state.rss.imageId;
      },
    },
    show: {
      set(value) {
        this.$store.commit("rss/setShowPopUp", value);
      },
      get() {
        return this.$store.state.rss.showPopUp;
      },
    },
    post() {
      if (!this.feed.items) {
        return null;
      }
      return this.feed.items.find((x) => {
        return x.id == this.postId;
      });
    },
  },
};
</script>