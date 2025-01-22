<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="goToPage(1)" :disabled="currentPage === 1">&laquo; Первая</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">&lsaquo; Предыдущая</button>
      </li>

      <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <button class="page-link" @click="goToPage(page)">{{ page }}</button>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Следующая
          &rsaquo;
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Последняя
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    }
  },
  computed: {
    visiblePages() {
      const pages = [];
      let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
      let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

      if (endPage - startPage < this.maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) { // Условие изменено
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  margin-top: 20px;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  background-color: #5e5c5c;
  border: 1px solid #222222;
  color: #1ae612;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
}

.page-link:hover {
  background-color: #e9ecef;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #4e4e4e;
  border-color: #dee2e6;
}
</style>
