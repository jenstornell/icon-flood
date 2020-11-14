<template>
  <div
    class="fixed top-0 left-0 flex-col justify-between w-full h-full overflow-auto bg-gray-900 md:flex filter md:relative md:w-sidebar"
    :class="{ hidden: !store.state.sidebar }"
  >
    <div class="flex flex-col gap-8 p-8">
      <div class="flex flex-col gap-1">
        <div
          class="flex items-center gap-2 text-4xl font-bold leading-none text-blue-500 fill-current"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="w-8 h-8"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 3.1L7.05 8.05a7 7 0 1 0 9.9 0L12 3.1zm0-2.828l6.364 6.364a9 9 0 1 1-12.728 0L12 .272zM7 13h10a5 5 0 0 1-10 0z"
            />
          </svg>
          IconFlood
        </div>
        <div class="text-white opacity-50">
          - World's best free icon packs
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="find" class="text-gray-500 uppercase">Find</label>
        <div class="flex flex-wrap gap-2" style="max-width: 300px;">
          <input
            type="input"
            id="find"
            v-model="store.state.inputFind"
            class="w-full p-2 rounded focus:outline-none"
            spellcheck="false"
            autocomplete="off"
            placeholder="Icon pack title..."
            @input="triggerStore"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2 checkboxes">
        <h2 class="text-gray-500 uppercase text">Grids</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="grid in store.state.grids" v-bind:key="`grids-${grid}`">
            <input
              type="checkbox"
              :id="`s-${grid}`"
              :value="grid"
              v-model="store.model.grids"
              class="hidden"
              @change="triggerStore"
            />
            <Checkbox :id="grid" suffix="px" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 checkboxes">
        <h2 class="text-gray-500 uppercase">Licenses</h2>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="license in store.state.licenses"
            v-bind:key="`license-${license}`"
          >
            <input
              type="checkbox"
              :id="`s-${license}`"
              :value="license"
              v-model="store.model.licenses"
              class="hidden"
              @change="triggerStore"
            />
            <Checkbox :id="license" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 checkboxes">
        <h2 class="text-gray-500 uppercase">Price</h2>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="pricemodel in store.state.pricemodels"
            v-bind:key="`price-${pricemodel}`"
          >
            <input
              type="checkbox"
              :id="`s-${pricemodel}`"
              :value="pricemodel"
              v-model="store.model.pricemodels"
              class="hidden"
              @change="triggerStore"
            />
            <Checkbox :id="pricemodel" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h2 class="text-gray-500 uppercase">Min number of icons</h2>
        <div class="flex gap-1">
          <input
            type="range"
            min="1"
            :max="Object.keys(store.state.counts).length"
            class="w-full p-2 bg-black rounded appearance-none slider focus:outline-none"
            v-model="store.model.counter"
            @input="triggerStore"
          />
          <div
            class="flex items-center justify-center w-16 font-bold text-gray-300 border-2 border-black rounded"
          >
            {{ store.state.counts[store.model.counter] }}
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h2 class="text-gray-500 uppercase">Sort by</h2>
        <select
          class="p-2 rounded focus:outline-none"
          v-model="store.model.sort"
          @change="triggerStore"
        >
          <option value="title">Title (A-Z)</option>
          <option value="count">Number of icons</option>
          <option value="age">Age</option>
        </select>
      </div>

      <div
        class="fixed bottom-0 left-0 w-full px-8 py-4 bg-black bg-opacity-75 md:hidden"
      >
        <button
          class="px-6 py-3 text-white bg-green-600 rounded focus:outline-none md:hidden"
          @click="store.state.sidebar = false"
        >
          List {{ store.state.items.length }} icon packs
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { inject } from "vue";
import Footer from "@/components/Footer.vue";
import Checkbox from "@/components/Checkbox.vue";

export default {
  components: {
    Footer,
    Checkbox,
  },
  setup() {
    const store = inject("global");

    function triggerStore() {
      store.setItems();
    }

    return { store, triggerStore };
  },
};
</script>

<style>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background: #38a169;
  cursor: pointer;
}

.slider::-webkit-slider-thumb:hover {
  background: #48bb78;
}

.slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background: #38a169;
  cursor: pointer;
  border: none;
}
</style>
