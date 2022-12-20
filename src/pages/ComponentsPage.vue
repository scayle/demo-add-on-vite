<template>
  <Breadcrumbs
    title="Components"
    :breadcrumbs="breadcrumbs"
  />

  <div class="card overflow-hidden h-full">
    <div class="card-header">
      Component Playground
    </div>

    <div class="card-body overflow-auto">
      <AyTabs>
        <AyTab
          name="currency"
          label="Currency Inputs"
        >
          <div class="grid grid-cols-2 gap-5">
            <InputLabel label="Currency Input">
              <AyCurrencyInput
                v-model="currencyValue"
                currency="PLN"
              />
            </InputLabel>

            <InputLabel label="Currency Behaviour (Custom Input)">
              <AyCurrencyBehavior
                v-slot="{componentBindings}"
                v-model="currencyValue"
                currency="USD"
              >
                <AyInput v-bind="componentBindings">
                  <template #prepend>
                    $
                  </template>

                  <template #append>
                    Post
                  </template>
                </AyInput>
              </AyCurrencyBehavior>
            </InputLabel>
          </div>
        </AyTab>

        <AyTab
          name="normal"
          label="Normal Inputs"
        >
          <div class="grid grid-cols-2 gap-5">
            <InputLabel label="Telephone Input">
              <AyInput
                model-value="test"
                type="tel"
              >
                <template #prepend>
                  +49
                </template>

                <template #append>
                  <IconQuestionFill />
                </template>
              </AyInput>
            </InputLabel>

            <InputLabel label="Number Input">
              <AyInput
                model-value="1"
                type="number"
              />
            </InputLabel>
          </div>
        </AyTab>

        <AyTab
          name="spinner"
          label="Spinner"
        >
          <div class="grid grid-cols-5 gap-5">
            <InputLabel label="Extra Small">
              <AySpinner size="xs" />
            </Inputlabel>

            <InputLabel label="Small">
              <AySpinner size="sm" />
            </Inputlabel>

            <InputLabel label="Medium">
              <AySpinner size="md" />
            </Inputlabel>

            <InputLabel label="Large">
              <AySpinner size="lg" />
            </Inputlabel>

            <InputLabel label="Extra Large">
              <AySpinner size="xl" />
            </Inputlabel>
          </div>
        </AyTab>

        <AyTab
          name="modals"
          label="Modals"
        >
          <button
            class="btn"
            @click="showModal2 = !showModal2"
          >
            Open Modal
          </button>
          <button
            class="btn"
            @click="showModal = !showModal"
          >
            Open Off-Canvas
          </button>

          <AyOffCanvas v-model:visible="showModal">
            <div class="py-2 px-4">
              Hello, Modal!
            </div>
          </AyOffCanvas>

          <AyModal v-model:visible="showModal2">
            <div class="py-2 px-4">
              Hello, Modal!
            </div>
          </AyModal>
        </AyTab>
      </AyTabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import InputLabel from '@/components/InputLabel/InputLabel.vue';

export default defineComponent({
    name: 'ComponentsPage',

    components: { InputLabel, Breadcrumbs },

    setup() {
        const breadcrumbs = [
            {
                title: 'General',
            },

            {
                title: 'Components',
            }
        ];

        return {
            breadcrumbs
        }
    },

    data() {
        return {
            showModal: false,
            showModal2: false,
            currencyValue: 12
        }
    },
});
</script>
