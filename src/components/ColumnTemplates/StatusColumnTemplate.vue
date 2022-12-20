<template>
  <span
    class="bullet"
    :class="bulletClass"
  >
    {{ statusLabel }}
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
    name: 'StatusColumnTemplate',

    props: {
        payload: {
            type: String,
            default: 'live',
        }
    },

    setup(props) {
        const { payload } = toRefs(props);
        const statusLabel = computed(() => payload.value.slice(0, 1).toUpperCase() + payload.value.slice(1));
        const bulletClass = computed(() => {
            let status = '';

            if (!payload.value) {
                return 'bullet-secondary';
            }

            switch (payload.value.toLowerCase()) {
                case 'active':
                case 'live':
                    status = 'bullet-success';
                    break;
                case 'approval':
                case 'inapproval':
                case 'draft':
                case 'inactive':
                case 'in_approval':
                    status = 'bullet-secondary';
                    break;
                case 'blocked':
                    status = 'bullet-danger';
                    break;
                case 'problem':
                    status = 'bullet-warning';
                    break;
                case 'new':
                    status = 'bullet-blue';
                    break;
            }

            return status;
        });

        return {
            statusLabel,
            bulletClass,
        }
    }
});
</script>

<style scoped>

</style>
