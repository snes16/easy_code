<template>
  <UpButton />
  <SearchBar v-model="searchTerm" @search="handleSearch" />
    <div class="characters" v-if="charactersByPage.length">
      <CharacterCard
        v-for="character in charactersByPage"
        :key="character.id"
        :character="character"
      />
    </div>
  <LoaderSpinner v-if="isLoading" />
  <p v-if="!charactersByPage.length">Нет результатов.</p>
  <Pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-changed="handlePageChange"
  />
</template>

<script>
import SearchBar from '@/components/common/SearchBar.vue';
import LoaderSpinner from '@/components/common/LoaderSpinner.vue';
import UpButton from '@/components/common/UpButton.vue';
import Pagination from '@/components/common/Pagination.vue';
import { debounce } from '@/tools/tools';
import CharacterCard from '@/components/characters/CharacterCard.vue'

export default {
  components: {
    CharacterCard,
    SearchBar,
    LoaderSpinner,
    UpButton,
    Pagination,
  },
  data() {
    return {
      searchTerm: '',
      isLoading: false,
      currentPage: 1,
      debouncedSearch: null,
    };
  },
  computed: {
    totalPages() {
      return this.$store.state.charactersModule.totalPages;
    },
    charactersByPage() {
      return this.$store.state.charactersModule.charactersByPage;
    },
  },
  methods: {
    fetchCharactersByPage(page, searchTerm = '') {
      this.isLoading = true;
      this.$store.dispatch('charactersModule/fetchCharactersByPage', { page, searchTerm})
        .catch((error) => {
          console.error("Error fetching characters:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleSearch(searchTerm) {
      this.currentPage = 1;
      this.debouncedSearch(searchTerm);
    },
    performSearch(searchTerm){
      this.fetchCharactersByPage(this.currentPage, searchTerm)
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchCharactersByPage(newPage, this.searchTerm);
    },
  },
  mounted() {
    this.fetchCharactersByPage(this.currentPage);
    this.debouncedSearch = debounce(this.performSearch, 500);
  },
  watch: {
    searchTerm(newVal) {
      if (!newVal) {
        this.handleSearch('');
      }
    }
  }
};
</script>

<style scoped>
.characters {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
