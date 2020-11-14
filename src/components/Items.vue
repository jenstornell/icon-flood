<template>
  <div
    v-for="(item, index) in data"
    :key="`item-${index}`"
    class="flex flex-col overflow-hidden rounded shadow-md"
  >
    <div class="relative flex items-center justify-center bg-white shadow-lg">
      <img
        :src="cover(item.image)"
        class="object-cover border-l-8 border-r-8 border-white"
        style="height: 150px;"
      />

      <div
        class="absolute bottom-0 left-0 px-2 py-1 mb-2 ml-2 text-xs font-bold text-white uppercase bg-black rounded"
      >
        {{ item.grid }} px
      </div>
      <div
        class="absolute bottom-0 right-0 px-2 py-1 mb-2 mr-2 text-xs font-bold text-white uppercase bg-black rounded"
      >
        {{ item.count }}+
      </div>

      <div
        class="absolute top-0 left-0 px-2 py-1 mt-2 ml-2 text-xs font-bold text-white uppercase rounded"
        :class="priceClass(item.pro)"
      >
        {{ price(item.pro) }}
      </div>
    </div>

    <div class="bg-gray-100">
      <div
        class="flex flex-col gap-4 px-4 pt-4 leading-none text-gray-800 fill-current 0"
      >
        <a
          :href="item.site_url"
          class="flex items-center gap-4 text-xl font-bold hover:underline"
        >
          {{ item.title }}
        </a>
        <table class="-mt-1 -ml-1 text-sm border-collapse">
          <tr>
            <td class="w-1 p-1 font-bold text-gray-500">
              License
            </td>
            <td class="p-1">
              <a
                :href="item.license_url"
                class="text-blue-600 hover:underline"
                target="_blank"
                >{{ item.license }}</a
              >
            </td>
          </tr>
          <tr>
            <td class="p-1 font-bold text-gray-500">
              Age
            </td>
            <td class="p-1 text-black">{{ age(item.age) }}</td>
          </tr>
        </table>
      </div>
      <div class="inline-flex gap-2 px-4 py-4 pt-3">
        <a
          :href="item.site_url"
          class="flex items-center gap-2 px-2 py-1 text-sm font-bold text-gray-200 bg-blue-600 rounded fill-current focus:outline-none"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="w-4"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z"
            />
          </svg>
          Website
        </a>
        <a
          :href="item.repo_url"
          class="flex items-center gap-2 px-2 py-1 text-sm font-bold text-gray-200 capitalize bg-gray-800 rounded fill-current focus:outline-none"
          target="_blank"
          v-if="repo(item.repo_url)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="w-4"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
            />
          </svg>
          {{ repo(item.repo_url) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, computed } from "vue";
import image from "@/methods/image";
//import TableRow from "@/components/TableRow.vue";

export default {
  //components: { TableRow },
  setup() {
    const store = inject("global");
    const { cover } = image;

    onMounted(async () => {
      await fetch("https://iconflood.csspost.com/vue-json/api.php")
        .then((response) => {
          return response.json();
        })
        .then((out) => {
          store.updateCache(out);
          store.updateItems(out.items);
          store.updateGrids(out.grids);
          store.updateLicenses(out.licenses);
          store.updateCounts(out.counters);
          store.updatePricemodels(out.pricemodels);

          store.setItems();
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
        return;
      }
    }

    function price(pro) {
      return pro == 1 ? "Freemium" : "Free";
    }

    function priceClass(pro) {
      return pro == 1 ? "bg-orange-600" : "bg-green-600";
    }

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
