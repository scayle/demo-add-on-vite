<template>
  <div class="products-listing__body">
    <ElTable
      stripe
      max-height="initial"
      header-row-class-name="table-column-names-row"
      :data="products"
      @select="$emit('selected', $event)"
      @select-all="$emit('selected', $event)"
      @row-click="openDetail"
    >
      <ElTableColumn
        type="selection"
        show-overflow-tip
      />

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
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, PropType } from 'vue';

/**
 * Internal dependencies.
 */

export type Column = {
    prop: string,
    label: string,
    width?: number;
    template: any;
};
export default defineComponent({
    name: 'ProductsListingBody',

    props: {
        products: {
            type: Array,
            required: true,
        },

        columns: {
            type: Array as PropType<Column[]>,
            required: true,
        }
    },

    emits: {
        selected(_selected: any[]) {
            return true;
        }
    },

    methods: {
        openDetail(row: any, col: any) {
            if([0, 7].includes(col.no)) return;

            const id = row.product_id;
            this.$router.push({ name: 'product-detail', params: { id } });
        }
    }
});
</script>

<style scoped src="./ProductsListingBody.css" />
