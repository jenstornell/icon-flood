<template>
  <div class="flex justify-between w-full overflow-hidden">
    <div class="flex-1 overflow-auto">
      <div class="flex flex-col flex-1 max-w-screen-xl mx-auto main">
        <div class="px-8">
          <div class="flex flex-col pt-8">
            <div class="flex items-center justify-between text-4xl text-white">
              <div>Icon packs</div>
              <div
                class="p-4 text-white rounded fill-current hover:bg-gray-800 md:hidden"
                :class="{ hidden: store.state.sidebar }"
                @click="store.state.sidebar = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17zM9 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-xl text-gray-500">{{ counter }} listed</div>
          </div>
          <div
            class="grid w-full gap-4 py-12 mx-auto xl:gap-8"
            style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));"
          >
            <Items />
          </div>
        </div>
      </div>
    </div>

    <Filter />
  </div>
</template>

<script>
import { inject, computed } from "vue";
import Items from "@/components/Items.vue";
import Filter from "@/components/Filter.vue";

export default {
  components: {
    Items,
    Filter,
  },
  setup() {
    const store = inject("global");
    const counter = computed(() => {
      if (typeof store.state.items == "undefined") return;
      return store.state.items.length;
    });

    return { store, counter };
  },
};
</script>
