<template>
  <div>
    <LoaderSpinner v-if="isLoading" />
    <div class="character-info" v-if="!isLoading && episode">
      <div class="rectangle"></div>
      <div class="name">{{ episode.name }}</div>
      <div>{{ episode.air_date }}</div>
      <div>{{ episode.episode }}</div>
      <div class="name"></div>
      <div class="characters">
        <div v-for="(character, index) in episode.characters" :key="index">
          <CharacterCard :character="character" v-if="character.id" />
          <LoaderSpinner v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import CharacterCard from '../characters/CharacterCard.vue'

export default {
  components: {
    LoaderSpinner,
    CharacterCard
  },
  data() {
    return {
      id: this.$route.params.id,
      episode: null,
      isLoading: false
    }
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      this.$store.dispatch('episodesModule/fetchEpisode', this.id)
        .then(() => {
          this.episode = this.$store.state.episodesModule.episode
        })
        .finally(() => {
          this.isLoading = false;
        })
    }
  },
  mounted() {
    this.fetchData()
  }
};
</script>

<style scoped>
.character-info {
  position: relative;
  padding: 20px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.character-img img {
  border-radius: 20px;
}

.name {
  font-size: 28px;
  font-weight: 600;
}

.rectangle {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 220px;
  background-color: var(--pink);
  z-index: -1;
}

.characters {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-template-rows: auto;
  gap: 10px;
  justify-self: center;
}
</style>
