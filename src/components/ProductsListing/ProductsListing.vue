<template>
  <div
    class="products-listing"
    :class="{ 'pb-4': isLoading }"
  >
    <div class="products-listing__head mb-4 flex items-center">
      <strong class="font-bold">Products</strong>

      <button
        type="button"
        data-filter-count="0"
        class="mis-4 btn btn-icon-only"
        @click="showFiltersModal = true"
      >
        <IconFilter />
      </button>
    </div>

    <div class="products-listing__body">
      <AySpinner v-if="isLoading" />

      <ElTable
        v-else
        stripe
        header-row-class-name="table-column-names-row"
        :data="products"
        max-height="initial"
      >
        <ElTableColumn
          v-for="(column, index) in columns"
          :key="1 + '-' + JSON.stringify(column) + '-' + index"
          :width="column.hasOwnProperty('width') ? column.width : ''"
          :min-width="100"
          :prop="column.prop"
          :label="column.label"
          :row-index="1 + '-' + index"
        >
          <template #default="scope">
            <component
              :is="column.template"
              :column="column"
              :row-index="1 + '-' + index"
              :full-payload="scope.row"
              :payload="scope.row[column.prop]"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </div>

    <div class="products-listing__footer">
      <AyPaginationLayout
        v-if="!isLoading"
        v-model:currentPage="page"
        without-page-size-selector
        :page-size="30"
        :total="pagination.total"
      >
        <template #after-info>
          <div class="inline-flex justify-self-center">
            <AySpinner
              v-if="isFetching"
              size="md"
            />
          </div>
        </template>
      </AyPaginationLayout>
    </div>


    <ProductsListingFiltersModal
      v-model:visible="showFiltersModal"
      @filters-updated="onFilterUpdate"
    />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { computed, defineComponent, ref } from 'vue';

/**
 * Internal dependencies.
 */
import useFetchProductsQuery, { ProductsFilters } from '@/composables/useFetchProductsQuery';
import ImageColumnTemplate from '@/components/ColumnTemplates/ImageColumnTemplate.vue';
import StringColumnTemplate from '@/components/ColumnTemplates/StringColumnTemplate.vue';
import StatusColumnTemplate from '@/components/ColumnTemplates/StatusColumnTemplate.vue';
import ProductStockColumnTemplate from '@/components/ColumnTemplates/ProductStockColumnTemplate.vue';
import ProductsListingFiltersModal from '@/components/ProductsListing/ProductsListingFiltersModal.vue';

export default defineComponent({
    name: 'ProductsListing',

    components: {
        ProductsListingFiltersModal,
        StringColumnTemplate
    },

    setup() {
        const columns = [
            {
                prop: 'image_hash',
                label: 'Image',
                visible: true,
                isSortable: false,
                clickable: true,
                template: ImageColumnTemplate,
                width: 80,
            },
            {
                prop: 'product_id',
                label: 'Product Id',
                visible: true,
                template: StringColumnTemplate,
                isSortable: false,
            },
            {
                prop: 'name',
                label: 'Name',
                visible: true,
                template: StringColumnTemplate,
                clickable: false,
            },
            {
                prop: 'merchant',
                label: 'Merchant',
                visible: true,
                template: StringColumnTemplate,
                isSortable: false,
                clickable: false,
            },
            {
                prop: 'status',
                label: 'Status',
                visible: true,
                template: StatusColumnTemplate,
                isSortable: false,
                width: 120,
            },
            {
                prop: 'stock',
                label: 'Stock',
                visible: true,
                template: ProductStockColumnTemplate,
                isSortable: false,
            },
        ];
        const page = ref(1);
        const perPage = ref(30);
        const filters = ref<ProductsFilters>({});
        const showFiltersModal = ref(false);
        const {
            isLoading,
            isFetching,
            pagination,
        } = useFetchProductsQuery({ page, perPage, filters });
        const onFilterUpdate = (newFilters: ProductsFilters) => {
            // reset page
            page.value = 1;
            filters.value = newFilters;
        }

        return {
            page,
            perPage,
            filters,
            columns,
            isLoading,
            isFetching,
            pagination,
            showFiltersModal,
            onFilterUpdate,
            products: computed(() => pagination.value.products || []),
        }
    }
});
</script>

<style scoped>
.el-table :deep(.el-table__cell) {
    @apply text-black;
    font-size: 13px;
    padding: 12px 10px;
    border-top: none;
    border-bottom: none;
    vertical-align: middle;
}

.el-table :deep(.el-scrollbar) {
    @apply overflow-auto;
}

.el-table :deep(.table-column-names-row th) {
    @apply bg-light text-black;

    border-top: 1px solid #e9eaec;
    border-bottom: none;
    font-size: 13px;
    font-weight: bold;
    vertical-align: bottom;
    padding: 5px 10px;
}

.el-table :deep(.table-column-names-row .cell) {
    line-height: 1;
    display: flex;
}

.el-table :deep(.table-column-names-row .cell .column-name-wrapper) {
    padding: 0;
    line-height: 1.5;
    width: 100%;
}

.el-table :deep(.table-column-names-row .cell .column-name-wrapper .column-name) {
    vertical-align: middle;
    padding: 0;
    line-height: 1.5;
}

.products-listing {
    @apply flex flex-col w-full bg-white border relative overflow-hidden;
    border-radius: 5px;
}

.products-listing .products-listing__head {
    padding: 15px 20px 0 20px;
}

.products-listing .products-listing__body {
    @apply flex flex-col justify-center overflow-hidden;
}

.products-listing .products-listing__meta {
    @apply text-dark-grey;

    font-size: 15px;
    margin-inline-start: 8px;
}

.products-listing__footer :deep(.ay-pagination-layout) {
    border: 0;
}
</style>
