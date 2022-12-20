<template>
  <div class="preview-image-placeholder">
    <ImagePlaceholderWrapper
      alt=""
      class="data-table-image flex"
      :image-url="imageSrc"
    />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { computed, defineComponent, toRefs } from 'vue';

/**
 * Internal dependencies.
 */
import ImagePlaceholderWrapper from '@/components/ImagePlaceholderWrapper/ImagePlaceholderWrapper.vue';

export default defineComponent({
    components: {
        ImagePlaceholderWrapper,
    },
    props: {
        column: {
            type: Object,
            default() {
                return {};
            },
        },
        payload: {
            type: String,
            default: '',
        },
        fullPayload: {
            type: Object,
            default: () => ({})
        },
    },

    setup(props) {
        const { payload } = toRefs(props);
        const imageSrc = computed(() => payload.value ? payload.value : null);

        return {
            imageSrc
        }
    },
});
</script>

<style scoped>
 .preview-image-placeholder {
    @apply bg-dark;

    display: flex;
     width: 29px;
    height: 29px;
    border-radius: 2px;
    position: relative;
 }

 .preview-image-placeholder svg {
     width: 14px;
     height: 14px;
     margin: auto;
 }

 .preview-image-placeholder svg path {
     @apply fill-primary;
 }
</style>
