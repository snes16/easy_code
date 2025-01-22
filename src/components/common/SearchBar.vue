<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
    @keydown.enter="handleEnter"
    placeholder="Search characters"
    />
    <button @click="emitSearch">Search</button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue', 'search'],
  methods: {
    updateSearchTerm(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleEnter() {
      this.emitSearch();
    },
    handleInput(event) {
      this.updateSearchTerm(event);
      this.$emit('search', event.target.value);
    },
    emitSearch() {
      this.$emit('search', this.modelValue);
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
}

.search-bar button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
</style>
