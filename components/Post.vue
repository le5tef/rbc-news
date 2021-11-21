<template>
  <v-card class="mx-auto my-2" elevation="5">
    <v-carousel
      hide-delimiters
      v-if="post.media"
      :show-arrows="post.media.length > 1"
    >
      <v-carousel-item
        v-for="(image, i) in post.media"
        @click="openImage({ postId: post.id, imageId: i })"
        :key="i"
        :src="image[`rbc_news:url`][0]"
      >
      </v-carousel-item>
    </v-carousel>

    <v-card-title class="word-break">{{ post.title }}</v-card-title>

    <v-divider />

    <v-card-text class="text--primary">
      <div>{{ post.fullText.trim() || post.anons }}</div>
    </v-card-text>
    <v-divider />
    <v-card-subtitle class="pb-0">
      {{ post.author }} <br v-if="post.author" />{{
        $moment(post.pubDate).format("DD.MM.YY, HH:mm ")
      }}
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer />
      <v-btn color="orange" :href="post.link" target="_blank" text>
        Статья РБК
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    post: {
      type: Object,
    },
    summary: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions("rss", ["openImage"]),
  },
  computed: {
    image() {
      return this.post.enclosure.type.search("image")
        ? "https://static8.depositphotos.com/1008504/984/i/600/depositphotos_9843276-stock-photo-the-word-news.jpg"
        : this.post.enclosure.url;
    },
  },
};
</script>
<style scoped>
.word-break {
  word-break: break-word;
}
</style>