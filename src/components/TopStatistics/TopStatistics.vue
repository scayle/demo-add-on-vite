<template>
  <div class="grid grid-cols-2 gap-5">
    <AyDashboardList
      :is-loading="isLoadingProducts"
      title="Top 5 products"
    >
      <AyDashboardListItem
        v-for="(product, index) in products"
        :key="index"
        :value="product.sold.toString()"
        :label="product.name"
        :initials="getInitials(product.name)"
      />
    </AyDashboardList>

    <AyDashboardList
      :is-loading="isLoadingCategories"
      title="Top 5 categories"
    >
      <AyDashboardListItem
        v-for="(category, index) in categories"
        :key="index"
        :value="category.sold.toString()"
        :label="category.name"
        :initials="getInitials(category.name)"
      />
    </AyDashboardList>
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent } from 'vue';

/**
 * Internal dependencies.
 */
import { getInitials } from '@/utils';
import useFetchTopProductsQuery from '@/composables/useFetchTopProductsQuery';
import useFetchTopCategoriesQuery from '@/composables/useFetchTopCategoriesQuery';

export default defineComponent({
    name: 'TopStatistics',

    setup() {
        const { isLoading: isLoadingProducts, products } = useFetchTopProductsQuery();
        const { isLoading: isLoadingCategories, categories } = useFetchTopCategoriesQuery();

        return {
            products,
            categories,
            getInitials,
            isLoadingProducts,
            isLoadingCategories,
        }
    }
});
</script>
