<template>
  <span
    class="break-normal"
    :class="column.extraClasses"
  >
    {{ content }}
  </span>
</template>
<script lang="ts">
/**
 * External dependencies.
 */
import { computed, defineComponent, toRefs } from 'vue';

/**
 * Internal dependencies.
 */

export default defineComponent({
    name: 'StringColumnTemplate',

    props: {
        column: {
            type: Object,
            default: () => ({}),
        },
        payload: {
            type: [String, Number],
            default: null,
        },
        fullPayload: {
            type: Object,
            required: true,
        },
    },

    setup(props){
        const { payload, column } = toRefs(props);
        const content = computed(() => payload.value ?? column.value.fallback);

        return {
            content,
        }
    },
});
</script>
