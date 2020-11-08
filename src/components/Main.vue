<template>
  <div class="flex justify-between flex-1 w-full overflow-hidden">
    <div class="w-full overflow-auto">
      <div class="flex flex-col w-full max-w-screen-xl mx-auto main">
        <div class="px-8">
          <div class="flex flex-col pt-8">
            <div class="flex items-center justify-between text-4xl text-white">
              <div>Icon packs</div>
              <div
                class="p-4 rounded hover:bg-gray-800 md:hidden"
                :class="{ hidden: store.state.sidebar }"
                @click="store.state.sidebar = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
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
