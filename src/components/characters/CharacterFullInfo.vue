<template>
  <LoaderSpinner v-if="isLoading" />
  <div class="character-info" v-if="!isLoading && character">
    <div class="character-img">
      <img :src="character.image" :alt="character.name" />
      <div class="rectangle"></div>
    </div>
    <div class="name">{{ character.name }}</div>
    <StatusCharacter :status="character.status" />
    <div>{{ ('Раса') }}: {{ character.species }}</div>
    <div>{{ ('Пол') }}: {{ character.gender }}</div>
    <div>{{ ('Локация') }}: {{ character.location?.name }}</div>
    <div class="name">{{ ('characters.episodes') }}:</div>
    <div class="characters">
      <div v-for="(episode, index) in character.episode" :key="index">
        <EpisodeComponent :episode="episode" v-if="episode.id" />
        <LoaderSpinner v-else />
      </div>
    </div>
  </div>
</template>

<script>
import LoaderSpinner from '@/components/common/LoaderSpinner.vue';
import StatusCharacter from '@/components/characters/StatusCharacter.vue';
import EpisodeComponent from '@/components/episodes/EpisodeComponent.vue';

export default {
  components: {
    LoaderSpinner,
    StatusCharacter,
    EpisodeComponent
  },
  data() {
    return {
      characterId: this.$route.params.id,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.charactersModule.isLoading
    },
    character() {
      return this.$store.state.charactersModule.character
    }
  },
  mounted() {
    this.$store.dispatch('charactersModule/fetchCharacterById', this.characterId)
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
  background-color: var(--green);
  z-index: -1;
}

.characters {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
}
</style>
