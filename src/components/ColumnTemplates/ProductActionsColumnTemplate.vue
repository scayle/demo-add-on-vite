<template>
  <div>
    <AySpinner
      v-if="isDeleting"
      class="!m-0"
      size="md"
    />

    <button
      v-else
      class="btn btn-icon-only"
      @click="modalVisible = true"
    >
      <IconTrash />
    </button>

    <AyDangerousActionModal
      hide-item-name
      title="Delete product"
      deleted-item-name="CONFIRM"
      :visible="modalVisible"
      @submit="onDelete"
      @cancel="modalVisible = false"
    />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, PropType, ref, toRefs } from 'vue';


/**
 * Internal dependencies.
 */
import { Product } from '@/types/Product';
import useDeleteProductMutation from '@/composables/useDeleteProductMutation';

export default defineComponent({
    name: 'ProductActionsColumnTemplate',

    props: {
        column: {
            type: Object,
            default() {
                return {};
            },
        },

        fullPayload: {
            type: Object as PropType<Product>,
            required: true,
        },
    },

    setup(props) {
        const { fullPayload } = toRefs(props);
        const { deleteProduct, isDeleting } = useDeleteProductMutation();
        const modalVisible = ref(false);
        const onDelete = async () => {
            modalVisible.value = false;

            if (isDeleting.value) {
                return;
            }

            await deleteProduct(fullPayload.value.id);
        }

        return {
            onDelete,
            isDeleting,
            modalVisible,
        }
    }
});
</script>
