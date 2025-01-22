import axios from "axios";

const state = {
  characters: [],
  charactersByPage: [],
  character: {
    id: 0,
    name: "",
    status: "",
    image: "",
    episode: [],
  },
  totalCount: null,
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
};

const mutations = {
  SET_CHARACTERS(state, payload) {
    state.characters = [...state.characters, ...payload];
  },
  SET_CHARACTERS_BY_PAGE(state, payload) {
    state.charactersByPage = payload;
  },
  SET_COUNT(state, payload) {
    state.totalCount = payload;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_PAGE(state, payload) {
    state.currentPage = payload;
  },
  SET_TOTAL_PAGES(state, payload) {
    state.totalPages = payload;
  },
  SET_CHARACTER(state, payload) {
    state.character = payload;
  },
  SET_EPISODE(state, payload) {
    state.character.episode.splice(payload.index, 1, payload.episode);
  },
};

const actions = {
  async fetchCharacters({ commit }) {
    if (state.isLoading || state.currentPage > state.totalPages) return;
    commit("SET_LOADING", true);

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${state.currentPage}`);
      const characters = res.data.results;
      const totalCount = res.data.info.count;
      const totalPages = res.data.info.pages;

      if (characters) {
        commit("SET_CHARACTERS", characters);
        commit("SET_TOTAL_PAGES", totalPages);
        commit("SET_PAGE", state.currentPage + 1);
        commit("SET_COUNT", totalCount);
      }
    } catch (error) {
      console.error("Failed to fetch characters", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchCharactersByPage({ commit }, page) {
    commit('SET_LOADING', true)
    axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(response => {
        commit('SET_CHARACTERS_BY_PAGE', response.data.results)
        commit('SET_TOTAL_PAGES', response.data.info.pages)
        commit('SET_PAGE', page)
      })
      .catch(error => {
        console.error('Ошибка при загрузке персонажей:', error)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  async fetchCharacterById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      const character = res.data;

      if (character) {
        commit("SET_CHARACTER", character);
      }

      const episodesUrl = character.episode;

      episodesUrl.forEach((url, index) => {
        axios
          .get(url)
          .then((result) => commit("SET_EPISODE", { index, episode: result.data }))
          .catch((error) => console.error("Failed to fetch", error));
      });
    } catch (error) {
      console.error("Failed to fetch character", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const charactersModule = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default charactersModule;
