<template>
  <label
    :for="inputId"
    class="label"
  >
    <span class="label-text">
      {{ label }}
    </span>

    <slot :input-id="inputId" />
  </label>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { nanoid } from 'nanoid';
import { defineComponent } from 'vue';

/**
 * Internal dependencies.
 */

export default defineComponent({
    name: 'InputLabel',

    props: {
      label: {
          type: String,
          required: true,
      }
    },

    setup() {
        const inputId = 'input-' + nanoid();

        return {
            inputId,
        }
    }
});
</script>
