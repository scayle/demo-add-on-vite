<template>
  <div
    class="flex mb-6"
  >
    <div class="grow">
      <h2>
        {{ title }}
      </h2>

      <ol
        aria-label="app-header-breadcrumb"
        class="flex pie-4 text-base bg-transparent rounded"
      >
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="breadcrumb.title"
          data-index="0"
          aria-current="page"
          class="flex overflow-hidden items-center max-w-48 text-dark-grey"
          :class="{
            'text-dark-grey': index !== breadcrumbs.length - 1, // any other item
            'text-black font-bold': index === breadcrumbs.length - 1, // last item
          }"
        >
          <LinkBreadcrumb
            v-if="breadcrumb.url"
            :url="breadcrumb.url"
            :title="breadcrumb.title"
          />

          <span
            v-else
            class="truncate"
          >
            {{ breadcrumb.title }}
          </span>


          <IconChevronRight
            v-if="index !== breadcrumbs.length - 1"
            class="icon icon-sm mx-1 text-dark-grey"
          />
        </li>
      </ol>
    </div>
    <div class="self-center mis-auto" />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, PropType } from 'vue';
import LinkBreadcrumb from '@/components/Breadcrumbs/LinkBreadcrumb.vue';

/**
 * Internal dependencies.
 */

export default defineComponent({
    name: 'Breadcrumbs',
    components: { LinkBreadcrumb },
    props: {
        title: {
            type: String,
            required: true,
        },

        breadcrumbs: {
            type: Array as PropType<{url?: string; title: string;}[]>,
            required: true,
        }
    }
});
</script>
