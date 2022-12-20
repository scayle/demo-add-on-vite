<template>
  <Breadcrumbs
    title="Form"
    :breadcrumbs="breadcrumbs"
  />

  <UserForm />
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent } from 'vue';

/**
 * Internal dependencies.
 */
import UserForm from '@/components/UserForm/UserForm.vue';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue';

export default defineComponent({
    name: 'FormPage',

    components: { UserForm, Breadcrumbs },

    setup() {
        const breadcrumbs = [
            {
                title: 'General',
            },

            {
                title: 'Form',
            }
        ];

        return {
            breadcrumbs,
        }
    }
});
</script>
