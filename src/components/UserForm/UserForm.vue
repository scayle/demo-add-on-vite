<template>
  <form
    class="card"
  >
    <div class="card-header">
      <div class="flex flex-wrap justify-between -mt-2 w-full">
        <div class="self-center mt-2">
          <h4>User settings</h4>
        </div>

        <div class="mt-2">
          <div class="card-header-action">
            <button
              type="button"
              data-e2e="user-delete-button"
              class="el-tooltip btn btn-icon-only"
              aria-describedby="el-tooltip-4183"
              tabindex="0"
            >
              <IconTrash />
            </button>

            <button
              type="reset"
              class="btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body grid overflow-auto gap-5 sm:grid-cols-2">
      <InputLabel label="Name">
        <template #default="{ inputId }">
          <AyInput :id="inputId" />
        </template>
      </InputLabel>

      <InputLabel label="Email">
        <template #default="{ inputId }">
          <AyInput :id="inputId" />
        </template>
      </InputLabel>

      <InputLabel label="Status">
        <AySelect
          model-value="active"
          :get-label="(value: any) => statuses?.find(option => option.value === value)?.name"
        >
          <AyOption
            v-for="status in statuses"
            :key="status.name"
            :value="status.value"
            :label="status.name"
          />
        </AySelect>
      </InputLabel>

      <InputLabel label="Roles">
        <AySelect
          model-value="developer"
          :get-label="(value: any) => roles?.find(option => option.value === value)?.name"
        >
          <AyOption
            v-for="role in roles"
            :key="role.name"
            :value="role.value"
            :label="role.name"
          />
        </AySelect>
      </InputLabel>

      <InputLabel label="Language">
        <AyCountrySelect
          :countries="['DE', 'US', 'GB']"
        />
      </InputLabel>

      <InputLabel
        ref="mobileNumberContainer"
        label="Mobile Number"
      >
        <template #default="{ inputId }">
          <AyInput
            :id="inputId"
            :autocomplete="false"
            type="tel"
            pattern="^ *1 *[5-7](\d *){8,10}"
            placeholder="15123456789"
          >
            <template #prepend>
              +49
            </template>

            <template #append>
              <ElTooltip
                v-if="mobileNumberContainer"
                :append-to="(mobileNumberContainer as any).$el"
                content="The phone number must be 10 or 11 digits long, and may only include numbers."
              >
                <IconQuestionFill />
              </ElTooltip>
            </template>
          </AyInput>
        </template>
      </InputLabel>
    </div>
  </form>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, ref } from 'vue';

/**
 * Internal dependencies.
 */
import InputLabel from '@/components/InputLabel/InputLabel.vue';

export default defineComponent({
    name: 'UserForm',

    components: { InputLabel },

    setup() {
        const mobileNumberContainer = ref(null);
        const statuses = [
            {
                name: 'Active',
                value: 'active',
            },
            {
                name: 'Inactive',
                value: 'inactive',
            }
        ];
        const roles = [
            {
                name: 'Developer',
                value: 'developer',
            },
            {
                name: 'Panel Developer',
                value: 'panel-developer',
            }
        ];

        return {
            roles,
            statuses,
            mobileNumberContainer,
        }
    }
});
</script>
