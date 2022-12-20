<template>
  <AyOffCanvas
    v-model:visible="modalVisible"
    title="Additional Filters"
    @submit="$emit('filters-updated', filters)"
  >
    <div class="input-row">
      <InputLabel label="Name">
        <template #default="{ inputId }">
          <AyInput
            :id="inputId"
            v-model="filters.name"
            class="w-full"
          />
        </template>
      </InputLabel>
    </div>

    <template #footer="{ cancel, submit }">
      <div class="w-full flex justify-end">
        <button
          type="button"
          class="btn btn-lg off-canvas-footer-btn"
          @click="cancel"
        >
          Close
        </button>

        <button
          type="button"
          class="btn btn-primary btn-lg off-canvas-footer-btn mis-4"
          @click="submit"
        >
          Show Results
        </button>
      </div>
    </template>
  </AyOffCanvas>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { useVModel } from '@vueuse/core';
import { defineComponent, ref } from 'vue';

/**
 * Internal dependencies.
 */
import InputLabel from '@/components/InputLabel/InputLabel.vue';

export default defineComponent({
    name: 'ProductsListingFiltersModal',
    components: { InputLabel },
    props: {
        visible: {
            type: Boolean,
            required: true,
        }
    },

    emits: {
        ['filters-updated'](_filters: { name: string }) {
            return true;
        },
        ['update:visible'](_value: boolean) {
            return true;
        }
    },

    setup(props, { emit }) {
        const filters = ref({
            name: '',
        });
        const modalVisible = useVModel(props, 'visible', emit);

        return {
            filters,
            modalVisible
        }
    }
});
</script>
