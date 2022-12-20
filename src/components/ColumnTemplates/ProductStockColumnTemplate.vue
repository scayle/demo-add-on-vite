<template>
  <div>
    <span class="break-normal">
      {{ `${payload.stockCount} in stock for ${payload.variantCount} variants` }}
    </span>
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, PropType } from 'vue';

/**
 * Internal dependencies.
 */
import { ProductsData } from '@/types/ProductsData';

export default defineComponent({
    name: 'ProductStockColumnTemplate',

    props: {
        column: {
            type: Object,
            default() {
                return {};
            },
        },

        payload: {
            type: Object as PropType<ProductsData['stock']>,
            required: true,
        },

        fullPayload: {
            type: Object,
            required: true,
        },
    },
});
</script>
