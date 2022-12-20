<template>
  <div class="bg-white p-4 rounded grid grid-cols-3 gap-5">
    <AyDashboardStatistic
      secondary-label="Revenue"
      value="€5100.34"
      color="gray"
    >
      <IconMoney />
    </AyDashboardStatistic>

    <AyDashboardStatistic
      secondary-label="Orders"
      value="3000"
      color="gray"
    >
      <IconParcel />
    </AyDashboardStatistic>

    <AyDashboardStatistic
      secondary-label="New Customers"
      value="4000"
      color="gray"
    >
      <IconUser />
    </AyDashboardStatistic>
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

export default defineComponent({
    name: 'Statistics'
});
</script>
