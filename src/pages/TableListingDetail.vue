<template>
    <Breadcrumbs
      :title="'Product ' + id"
      :breadcrumbs="breadcrumbs"
    />

    <ProductDetail />
  </template>

  <script lang="ts">
  /**
   * External dependencies.
   */
  import { defineComponent } from 'vue';

  /**
   * Internal dependencies.
   */
  import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
  import ProductDetail from '@/components/ProductsListing/ProductDetail.vue';
import { useRoute } from 'vue-router';

  export default defineComponent({
      name: 'ProductDetailPage',
      components: { Breadcrumbs, ProductDetail },

      setup() {
          const id = useRoute().params.id;

          const breadcrumbs = [
              {
                  title: 'Listings',
              },
              {
                  title: 'Table Listing',
              },
              {
                  title: 'Product detail'
              }
          ];

          return {
              breadcrumbs,
              id
          }
      }
  });
  </script>
