<template>
  <AyOffCanvas
    v-model:visible="modalVisible"
    title="Additional Filters"
    @submit="$emit('filters-updated', localFilters)"
  >
    <div class="input-row mb-4">
      <InputLabel label="Name">
        <template #default="{ inputId }">
          <AyInput
            :id="inputId"
            v-model="localFilters.name"
            class="w-full"
          />
        </template>
      </InputLabel>
    </div>

    <div class="input-row">
      <AySelect
        multiple
        clearable
        tag-clearable
        :model-value="localFilters.status"
        :get-label="firstLetterToUpper"
        label="Status"
        placeholder="Select a status"
        @update:model-value="onStatusUpdate"
      >
        <AyOption
          v-for="status in statuses"
          :key="status"
          :value="status"
          :label="firstLetterToUpper(status)"
        />
      </AySelect>
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
import { defineComponent, PropType, ref, toRefs, watch } from 'vue';

/**
 * Internal dependencies.
 */
import InputLabel from '@/components/InputLabel/InputLabel.vue';
import { ProductsFilters } from '@/composables/useFetchProductsQuery';
import { firstLetterToUpper } from '@/utils';

export default defineComponent({
    name: 'ProductsListingFiltersModal',
    components: { InputLabel },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },

        filters: {
            type: Object as PropType<ProductsFilters>,
            required: true,
        },
    },

    emits: {
        ['filters-updated'](_filters: ProductsFilters) {
            return true;
        },
        ['update:visible'](_value: boolean) {
            return true;
        }
    },

    setup(props, { emit }) {
        const { filters } = toRefs(props);
        const localFilters = ref<ProductsFilters>({
            name: '',
            status: [],
        });
        const modalVisible = useVModel(props, 'visible', emit);
        const statuses = ['blocked', 'problem', 'live'];
        const onStatusUpdate = (data: NonNullable<ProductsFilters['status']>) => {
            localFilters.value = {
                ...localFilters.value,
                status: [...data],
            };
        };

        watch(filters, (newFilters?: ProductsFilters) => {
            localFilters.value = {
                ...(newFilters || {})
            };
        }, { immediate: true });

        return {
            statuses,
            modalVisible,
            localFilters,
            onStatusUpdate,
            firstLetterToUpper
        }
    }
});
</script>
