<template>
  <AySpinner v-if="isLoading " />

  <div
    v-else
    class="products-listing"
  >
    <LoadingOverlay v-if="isFetching || isDeleting" />

    <ProductsListingHeader
      :delete-disabled="isDeleteDisabled"
      :filters="filters"
      @delete="deleteModalVisible = true"
      @filters-updated="onFilterUpdate"
    />

    <ProductsListingBody
      :columns="columns"
      :products="products"
      @selected="onSelected"
    />

    <div class="products-listing__footer">
      <AyPaginationLayout
        v-if="!isLoading"
        v-model:currentPage="page"
        v-model:pageSize="perPage"
        :total="pagination?.total || 0"
      />
    </div>

    <AyDangerousActionModal
      hide-item-name
      title="Delete product"
      deleted-item-name="CONFIRM"
      :visible="deleteModalVisible"
      @submit="onDeleteProducts"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import type { Ref } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

/**
 * Internal dependencies.
 */
import { Product } from '@/types/Product';
import useProductListingFilters from '@/composables/useProductListingFilters';
import useDeleteProductsMutation from '@/composables/useDeleteProductsMutation';
import ImageColumnTemplate from '@/components/ColumnTemplates/ImageColumnTemplate.vue';
import StringColumnTemplate from '@/components/ColumnTemplates/StringColumnTemplate.vue';
import StatusColumnTemplate from '@/components/ColumnTemplates/StatusColumnTemplate.vue';
import useFetchProductsQuery, { ProductsFilters } from '@/composables/useFetchProductsQuery';
import ProductStockColumnTemplate from '@/components/ColumnTemplates/ProductStockColumnTemplate.vue';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay.vue';
import ProductsListingHeader from '@/components/ProductsListing/ProductsListingHeader/ProductsListingHeader.vue';
import ProductsListingBody from '@/components/ProductsListing/PrdocutsListingBody/ProductsListingBody.vue';
import ProductActionsColumnTemplate from '@/components/ColumnTemplates/ProductActionsColumnTemplate.vue';

export default defineComponent({
    name: 'ProductsListing',

    components: {
        ProductsListingBody,
        ProductsListingHeader,
        LoadingOverlay,
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
            {
                prop: 'actions',
                label: 'Actions',
                visible: true,
                template: ProductActionsColumnTemplate,
                isSortable: false,
            },
        ];
        const deleteModalVisible = ref(false);
        const { page, perPage, filters, } = useProductListingFilters();
        const selectedProducts: Ref<Product[]> = ref([]);
        const {
            isLoading,
            isFetching,
            pagination,
        } = useFetchProductsQuery({ page, perPage, filters });
        const {
            isDeleting,
            deleteProducts,
        } = useDeleteProductsMutation();
        const isDeleteDisabled = computed(() => isDeleting.value || !selectedProducts.value.length);
        const onFilterUpdate = (newFilters: ProductsFilters) => {
            // reset page
            page.value = 1;
            filters.value = newFilters;
        }
        const onSelected = (selection: Array<any>) => {
            selectedProducts.value = [...selection];
        }
        const onDeleteProducts = async () => {
            deleteModalVisible.value = false;

            if (isDeleteDisabled.value) {
                return;
            }

            await deleteProducts(selectedProducts.value.map(product => product.id));
            selectedProducts.value = [];
        }

        watch(pagination, () => {
            selectedProducts.value = [];
        });

        return {
            page,
            perPage,
            filters,
            columns,
            isLoading,
            isFetching,
            pagination,
            onSelected,
            onFilterUpdate,
            selectedProducts,
            isDeleting,
            onDeleteProducts,
            isDeleteDisabled,
            deleteModalVisible,
            products: computed(() => pagination.value?.products || []),
        }
    }
});
</script>

<style src="./ProductsListing.css" scoped />
