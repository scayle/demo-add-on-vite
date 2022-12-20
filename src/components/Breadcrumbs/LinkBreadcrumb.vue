<template>
  <a
    :href="url"
    title="Shops"
    class="text-dark-grey hover:text-black hover:no-underline truncate"
  >
    {{ title }}
  </a>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent } from 'vue';

/**
 * Internal dependencies.
 */

export default defineComponent({
    name: 'LinkBreadcrumb',

    props: {
        title: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        }
    }
});
</script>
