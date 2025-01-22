<template>
  <UpButton />
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
import CharacterCard from './CharacterCard.vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import UpButton from '@/components/common/UpButton.vue'
import Pagination from '@/components/common/Pagination.vue'

export default {
  components: {
    CharacterCard,
    LoaderSpinner,
    UpButton,
    Pagination
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return this.$store.state.charactersModule.totalPages;
    },
    charactersByPage() {
      return this.$store.state.charactersModule.charactersByPage;
    }
  },
  methods: {
    fetchCharacters(page = this.currentPage) {
      this.isLoading = true
      this.$store.dispatch('charactersModule/fetchCharactersByPage', page) // Use the new action
        .finally(() => {
          this.isLoading = false
        })
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchCharacters(newPage);
    }
  },
  mounted() {
    this.fetchCharacters()
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
