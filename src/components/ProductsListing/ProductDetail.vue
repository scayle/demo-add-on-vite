<template>
    <h3>Product ID: {{ id }}</h3>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const id = useRoute().params.id;
</script>
