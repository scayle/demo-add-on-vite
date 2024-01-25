<template>
  <div class="products-listing__head">
    <div class="products-listing__head-inner">
      <div class="flex items-center">
        <strong class="font-bold">Products</strong>

        <AySearchInput
          class="ml-2"
          @change="onSearchChange"
        />

        <button
          type="button"
          data-filter-count="0"
          class="mis-4 btn btn-icon-only"
          @click="showFiltersModal = true"
        >
          <IconFilter />
        </button>
      </div>


      <div>
        <button
          type="button"
          class="btn"
          :class="deleteDisabled ? '' : 'btn-danger'"
          :disabled="deleteDisabled"
          @click.prevent="$emit('delete')"
        >
          Delete
        </button>
      </div>
    </div>

    <div
      v-if="filters?.status?.length"
      class="products-listing__meta"
    >
      <div
        v-for="status in filters.status"
        :key="status"
        class="products-listing__filter"
      >
        {{ firstLetterToUpper(status) }}

        <IconClose
          class="icon icon-xs filter-tag-delete"
          @click="removeStatus(status)"
        />
      </div>
    </div>
  </div>

  <ProductsListingFiltersModal
    v-model:visible="showFiltersModal"
    :filters="filters"
    @filters-updated="$emit('filters-updated', $event)"
  />
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import type { PropType } from 'vue';
import { defineComponent, ref, toRefs } from 'vue';

/**
 * Internal dependencies.
 */
import { firstLetterToUpper } from '@/utils';
import { ProductsFilters } from '@/composables/useFetchProductsQuery';
import ProductsListingFiltersModal from '@/components/ProductsListing/ProductsListingHeader/ProductsListingFiltersModal.vue';

export default defineComponent({
    name: 'ProductsListingHeader',

    components: { ProductsListingFiltersModal },

    props: {
        filters: {
          type: Object as PropType<ProductsFilters> ,
            required: true,
        },

        deleteDisabled: {
            type: Boolean,
            default: false,
        }
    },

    emits: {
        delete() {
            return true;
        },

        ['filters-updated'](_filters: ProductsFilters) {
            return true;
        },
    },

    setup(props, { emit }) {
        const { filters } = toRefs(props);
        const showFiltersModal = ref(false);
        const removeStatus = (status: string) => {
           emit('filters-updated', {
               ...filters.value as ProductsFilters,
               status: filters.value?.status?.filter((s) => s !== status),
           })
        };
        const onSearchChange = (event: InputEvent) => {
            const search = (event.target as HTMLInputElement).value;

            emit('filters-updated', {
                ...filters.value as ProductsFilters,
                search,
            })
        }

        return {
            removeStatus,
            onSearchChange,
            showFiltersModal,
            firstLetterToUpper,
        }
    },
});
</script>
