<template>
  <Breadcrumbs
    title="Dashboard"
    :breadcrumbs="breadcrumbs"
  />

  <div class="flex flex-col gap-5">
    <Statistics />
    <TopStatistics />
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
import useAddonProperties from '@/composables/useAddonProperties';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import Statistics from '@/components/Statistics/Statistics.vue';
import TopStatistics from '@/components/TopStatistics/TopStatistics.vue';

export default defineComponent({
    name: 'DashboardPage',

    components: { TopStatistics, Statistics, Breadcrumbs },

    setup() {
        const currentUserName = useAddonProperties()?.currentUser?.name;
        const breadcrumbs = [
            {
                title: 'Listings'
            },
            {
                title: 'Dashboard'
            }
        ];

        return {
            breadcrumbs,
            currentUserName
        }
    },
});
</script>
