<template>
  <img
    v-if="imageUrl && !imageLoadError"
    :src="imageUrl"
    @error="imageLoadError = true"
    @load="imageLoadFinished = true"
  />

  <div
    v-else
    class="flex bg-primary/10"
  >
    <IconImageSingle
      class="m-auto max-w-full max-h-full"
      :class="svgClass"
      :style="{ color: fillColor }"
    />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';

/**
 * Internal dependencies.
 */

export default defineComponent({
    name: 'ImagePlaceholderWrapper',

    props: {
        imageUrl: {
            type: String,
            default: null,
        },
        fillColor: {
            type: String,
            default: '#000',
        },
        iconSize: {
            type: String as PropType<'sm' | 'md' | 'lg' | 'xl'>,
            validate: (val: string) => ['sm', 'md', 'lg', 'xl'].includes(val),
            default: 'md',
        },
    },

    setup(props) {
        const { iconSize } = toRefs(props);
      const imageLoadError =  ref(false);
      const imageLoadFinished =  ref(false);
      const svgClass = computed(() => {
          const iconSizes: Record<string, string> = {
              md: 'icon-md',
              lg: 'icon-lg',
              xl: 'icon-xl',
          };

          return 'icon ' + (iconSizes[iconSize.value] || '');
      });

      return {
          svgClass,
          imageLoadError,
          imageLoadFinished,
      }
    },
});
</script>
