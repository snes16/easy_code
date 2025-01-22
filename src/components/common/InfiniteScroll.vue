<template>
  <div ref="scrollContainer" class="infinite-scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      scrollContainer: null
    };
  },
  methods: {
    handleScroll() {
      if (this.scrollContainer && this.scrollContainer.getBoundingClientRect().bottom <= window.innerHeight) {
        this.fetchData();
      }
    }
  },
  mounted() {
    this.scrollContainer = this.$refs.scrollContainer;
    setTimeout(() => {
      this.handleScroll()
    }, 500)
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.infinite-scroll {
  position: relative;
  overflow: auto;
}

.no-more-results {
  text-align: center;
  margin: 10px;
}
</style>
