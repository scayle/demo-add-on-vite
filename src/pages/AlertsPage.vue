<template>
  <Breadcrumbs
    title="Alerts"
    :breadcrumbs="breadcrumbs"
  />

  <div class="card">
    <div class="card-header">
      Alerts
    </div>
    <div class="card-body">
      <div class="form-group space-y-5">
        <div class="alert alert-info">
          Here's a demo of sending alerts and toasts through the add-on API
        </div>
        <label class="label">
          <span class="label-text is-required">Message</span>
          <input
            v-model="message"
            type="text"
            class="form-control"
          />
        </label>

        <label class="label">
          <span class="label-text is-required">Type</span>

          <AySelect
            v-model="type"
          >
            <AyOption value="info">Info</AyOption>
            <AyOption value="warning">Warning</AyOption>
            <AyOption value="success">Success</AyOption>
            <AyOption value="error">Error</AyOption>
          </AySelect>
        </label>
      </div>
      <div class="btn-group">
        <button
          class="btn"
          @click="sendToast"
        >
          Toast
        </button>
        <button
          class="btn"
          @click="sendAlert"
        >
          Alert
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';

export default defineComponent({
    name: "AlertsPage",

    components: { Breadcrumbs },

    data(): { type: 'success' | 'info' | 'warning' | 'error', message: string, breadcrumbs: any[] } {
        return {
            type: 'success',
            message: 'Hello, world!',
            breadcrumbs: [
                {
                    title: 'General',
                },

                {
                    title: 'Alerts',
                }
            ],
        };
    },

    methods: {
        sendToast() {
            this.$addOn.sendToast(this.type, this.message);
        },
        sendAlert() {
            this.$addOn.sendAlert(this.type, this.message);
        },
    }
});
</script>
