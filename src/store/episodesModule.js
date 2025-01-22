import axios from "axios";

const state = {
  episodes: [],
  episode: {
    id: 0,
    name: "",
    air_date: "",
    episode: "",
    characters: [],
    url: "",
  },
  isLoading: false,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

const mutations = {
  SET_EPISODES(state, payload) {
    state.episodes = [...state.episodes, ...payload];
  },
  SET_EPISODE(state, payload) {
    state.episode = payload;
  },
  SET_LOADING(stat, payload) {
    state.isLoading = payload;
  },
  SET_COUNT(state, payload) {
    state.totalCount = payload;
  },
  SET_PAGE(state, payload) {
    state.currentPage = payload;
  },
  SET_TOTAL_PAGES(state, payload) {
    state.totalPages = payload;
  },
  SET_CHARACTER(state, payload) {
    state.episode.characters.splice(payload.index, 1, payload.character);
  },
};

const actions = {
  async fetchEpisodes({ commit }) {
    if (state.isLoading || state.currentPage > state.totalPages) return;
    commit("SET_LOADING", true);

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/?page=${state.currentPage}`);
      const episodes = res.data.results;
      const totalCount = res.data.info.count;
      const totalPages = res.data.info.pages;

      if (episodes) {
        commit("SET_EPISODES", episodes);
        commit("SET_TOTAL_PAGES", totalPages);
        commit("SET_PAGE", state.currentPage + 1);
        commit("SET_COUNT", totalCount);
      }
    } catch (error) {
      console.error("Failed to fetch episodes", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchEpisode({ commit }, id) {
    commit("SET_LOADING", true);

    try {
      const episodesRes = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);

      if (episodesRes.data) {
        commit("SET_EPISODE", episodesRes.data);
      }

      const characterUrls = episodesRes.data.characters;
      characterUrls.forEach((url, index) => {
        axios
          .get(url)
          .then((characterRes) => {
            if (characterRes.data) {
              commit("SET_CHARACTER", { index, character: characterRes.data });
            }
          })
          .catch((error) => console.error("Failed to fetch character", error));
      });
    } catch (error) {
      console.error("Failed to fetch episode", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

// Episodes module
const episodesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default episodesModule;
