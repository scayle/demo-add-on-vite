<template>
    <Breadcrumbs
      title="Table Listing"
      :breadcrumbs="breadcrumbs"
    />

    <ProductsListing />
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
  import ProductsListing from '@/components/ProductsListing/ProductsListing.vue';

  export default defineComponent({
      name: 'ProductsPage',
      components: { Breadcrumbs, ProductsListing },

      setup() {
          const breadcrumbs = [
              {
                  title: 'Listings',
              },
              {
                  title: 'Table Listing',
              }
          ];

          return {
              breadcrumbs,
          }
      }
  });
  </script>
