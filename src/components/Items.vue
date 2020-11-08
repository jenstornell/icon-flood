<template>
  <div
    v-for="(item, index) in data"
    :key="`item-${index}`"
    class="flex flex-col overflow-hidden border-b border-gray-400 rounded shadow-md"
  >
    <a
      :href="item.site_url"
      class="flex flex-col gap-3 px-4 py-3 text-xl leading-none text-white bg-gray-900 fill-current hover:underline"
    >
      <div class="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="w-5"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
          />
        </svg>
        <div class="flex flex-col gap-1">
          {{ item.title }}
        </div>
      </div>
      <div class="inline-flex">
        <div
          class="px-2 py-1 text-xs font-bold uppercase bg-red-500 rounded"
          :class="priceClass(item.pro)"
        >
          {{ price(item.pro) }}
        </div>
      </div>
    </a>

    <div
      class="relative h-0 overflow-hidden bg-white border-b"
      style="padding-top: 56.25%;"
    >
      <img
        :src="cover(item.image)"
        class="absolute top-0 left-0 object-cover w-full h-full"
      />
    </div>

    <table class="flex-1 w-full bg-white border-collapse">
      <TableRow label="Grid" :value="item.grid" suffix="px" />
      <TableRow label="Icons" :value="item.count" suffix="+" />
      <TableRow label="Age" :value="age(item.age)" />

      <TableRow
        label="License"
        :value="item.license"
        :href="item.license_url"
      />
      <TableRow
        label="Repository"
        :value="repo(item.repo_url)"
        :href="item.repo_url"
        css_class="capitalize"
      />
    </table>
  </div>
</template>

<script>
import { inject, onMounted, computed, watchEffect } from "vue";
import image from "@/methods/image";
import TableRow from "@/components/TableRow.vue";

export default {
  components: { TableRow },
  setup() {
    const store = inject("global");
    const { cover } = image;

    onMounted(async () => {
      await fetch("http://localhost/sites/vue-json/api.php")
        .then((response) => {
          return response.json();
        })
        .then((out) => {
          console.log(out);
          store.updateCache(out);
          store.updateItems(out.items);
          store.updateGrids(out.grids);
          store.updateLicenses(out.licenses);
          store.updateCounts(out.counters);
          store.updatePrices();
        });
    });

    function age(age) {
      if (!age) return "?";

      return `${age} year${age > 1 ? "s" : ""}`;
    }

    function repo(url) {
      try {
        let hostname = new URL(url).hostname;
        return hostname.substr(0, hostname.lastIndexOf("."));
      } catch {
        return "-";
      }
    }

    function price(pro) {
      return pro == 1 ? "Freemium" : "Free";
    }

    function priceClass(pro) {
      return pro == 1 ? "bg-orange-600" : "bg-green-600";
    }

    watchEffect(() => {
      console.log(store.model.licenses);
      store.setItems();
    });

    const data = computed(() => {
      let results = [];
      switch (store.model.sort) {
        case "title":
          results = store.state.items.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "count":
          results = store.state.items.sort((a, b) => b.count - a.count);
          break;
        case "age":
          results = store.state.items.sort((a, b) => {
            return Date.parse(b.birth) - Date.parse(a.birth);
          });
          break;
      }
      return results;
    });

    return { data, age, store, cover, repo, price, priceClass };
  },
};
</script>
