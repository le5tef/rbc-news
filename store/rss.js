import RSSParser from "rss-parser";

export const state = () => ({
  feed: {},
  error: '',
  loading: false,
  search: '',
  showPopUp: false,
  postId: '',
  imageId: '',
  ordering: '',
  page: 1,

})

export const mutations = {
  loading(state, value) {
    state.loading = value
  },
  setFeed(state, feed) {
    state.feed = feed

  },
  setError(state, err) {
    state.error = err
  },
  setSearch(state, data) {
    state.search = data
  },
  setOrdering(state, order) {
    state.ordering = order
  },
  setPostId(state, value) {
    state.postId = value
  },
  setImageId(state, value) {
    state.imageId = value
  },
  setShowPopUp(state, value) {
    state.showPopUp = value
  },
  setPage(state, value) {
    state.page = value
  },

}
export const getters = {
  filteredPosts(state) {
    if (!state.feed.items) return [];
    let posts = JSON.parse(JSON.stringify(state.feed.items));
    if (state.search != "") {
      posts = state.feed.items.filter((article) =>
        state.search
          .split(" ")
          .map((word) =>
            article.title.match(new RegExp(`(^| )+(${word})`, "i"))
          )
          .every((x) => x)
      );
    }
    if (state.ordering != "") {
      if (state.ordering === "newest") {
        posts.sort(function (a, b) {
          var c = new Date(a.pubDate);
          var d = new Date(b.pubDate);

          return d - c;
        });
      }
      if (state.ordering === "oldest") {
        posts.sort(function (a, b) {
          var c = new Date(a.pubDate);
          var d = new Date(b.pubDate);
          return c - d;
        });
      }
    }
    return posts;
  },
  paginatedPosts(state, getters) {
    return getters.filteredPosts.slice((state.page - 1) * 5, state.page * 5)
  }
}
export const actions = {
  openImage({ commit }, { postId, imageId }) {
    commit('setPostId', postId);
    commit('setImageId', imageId);
    commit('setShowPopUp', true);
  },
  async fetchData({ commit }) {
    commit('loading', true);
    commit('setError', '');
    commit('setFeed', {});
    try {
      const data = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://static.feed.rbc.ru/rbc/logical/footer/news.rss')}`)
      if (data.ok) {
        const text = JSON.parse(await data.text()).contents;
        const parser = new RSSParser({
          customFields: {
            item: [
              ['rbc_news:full-text', 'fullText'],
              ['rbc_news:news_id', 'id'],
              ['rbc_news:anons', 'anons'],
              ['rbc_news:image', 'media', { keepArray: true }]
            ]
          }
        });
        parser.parseString(text, (err, parsed) => {
          commit('loading', false)

          if (err) {
            commit('setError', `Ошибка при парсинге RSS ленты ${err.toString()}`);
          } else {

            commit('setFeed', parsed);

          }
        });
      } else {
        commit('setError', 'Ошибка при загрузке');
        commit('loading', false)
      }
    } catch (e) {
      console.log(e);
      if (e.toString() === "TypeError: Failed to fetch") {
        commit('setError', 'Ошибка политики CORS');
      } else {
        commit('setError', `Неизвестная ошибка: ${e.toString()}`);
      }

      commit('loading', false)
    }
  },
}
