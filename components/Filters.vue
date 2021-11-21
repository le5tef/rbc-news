<template>
  <v-row no-gutters>
    <v-col cols="12" sm="4" class="d-flex align-center">
      <v-select
        hide-details
        dense
        :items="orderTypes"
        label="Сортировка"
        v-model="ordering"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="7" offset-sm="1">
      <v-text-field
        v-model="search"
        placeholder="Введите название..."
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      orderTypes: [
        { value: "oldest", text: "От старых к новым" },
        { value: "newest", text: "От новых к старым" },
      ],
    };
  },
  methods: {
    ...mapMutations("rss", ["setSearch", "setOrdering", "setPage"]),
  },
  computed: {
    search: {
      set(val) {
        this.setSearch(val);
        this.setPage(1);
      },
      get() {
        return this.$store.state.rss.search;
      },
    },
    ordering: {
      set(val) {
        this.setOrdering(val);
      },
      get() {
        return this.$store.state.rss.ordering;
      },
    },
  },
};
</script>