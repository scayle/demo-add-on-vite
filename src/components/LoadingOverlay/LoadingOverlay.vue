<template>
  <div class="spinner-overlay">
    <AySpinner />
  </div>
</template>

<script>
export default {
    name: 'LoadingOverlay',
};
</script>

<style scoped>
    .spinner-overlay {
        @apply absolute left-0 top-0 w-full h-full flex justify-center items-center z-10;
    }
</style>
