import { computed } from "vue";

/*function matchFind(item) {
  const inputFind = store.state.inputFind;
  const match = item.title.toLowerCase().search(inputFind.toLowerCase());
  return match > -1 ? true : false;
}

function matchGrids(item) {
  let success = false;

  store.model.grids.forEach((grid) => {
    success = grid == item.grid ? true : success;
  });
  return success;
}

function matchLicenses(item) {
  let success = false;

  store.model.licenses.forEach((license) => {
    success = license == item.license ? true : success;
  });
  return success;
}

function matchPrices(item) {
  let success = false;
  let item_price = null;

  store.model.prices.forEach((price) => {
    item_price = item.pro == 0 ? "Free" : "Freemium";

    if (price == item_price) {
      success = true;
    }
  });
  return success;
}

function matchCount(item) {
  const item_count = item.count;
  const filter_count = store.state.counts[store.model.counter];

  return item_count >= filter_count;
}*/

const sort = computed(() => {
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

const data = computed(() => {
  let results = sort;
  return results;
});

export default {
  data,
};
