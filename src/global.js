import { reactive } from "vue";

const cache = {
  items: [],
};
const state = reactive({
  sidebar: false,
  items: [],
  grids: [],
  pricemodels: [],
  counts: [],
  inputFind: "",
});

const model = reactive({
  grids: [],
  licenses: [],
  pricemodels: [],
  counter: 1,
  age: 1,
  sort: "title",
});

const updateCache = function(data) {
  cache.items = data.items;
};

const updateItems = function(items) {
  state.items = items;
};

const updateGrids = function(grids) {
  state.grids = grids;
  model.grids = grids;
};

const updateLicenses = function(licenses) {
  state.licenses = licenses;
  model.licenses = licenses;
};

const updatePricemodels = function(pricemodels) {
  state.pricemodels = pricemodels;
  model.pricemodels = ["Free"];

  console.log(model.pricemodels);
};

const updateCounts = function(counts) {
  state.counts = counts;
};

// Match find
const matchFind = function(item) {
  const match = item.title.toLowerCase().search(state.inputFind.toLowerCase());
  return match > -1 ? true : false;
};

// Match grids
const matchGrids = function(item) {
  let success = false;

  model.grids.forEach((grid) => {
    success = grid == item.grid ? true : success;
  });
  return success;
};

// Match licenses
const matchLicenses = function(item) {
  let success = false;

  model.licenses.forEach((license) => {
    success = license == item.license ? true : success;
  });
  return success;
};

// Match pricemodels
const matchPricemodels = function(item) {
  let success = false;

  model.pricemodels.forEach((pricemodel) => {
    success = pricemodel == item.pricemodel ? true : success;
  });
  return success;
};

// Match count
const matchCount = function(item) {
  return item.count >= state.counts[model.counter];
};

const setItems = function() {
  let results = [];

  cache.items.forEach((item) => {
    if (!matchFind(item)) return;
    if (!matchGrids(item)) return;
    if (!matchLicenses(item)) return;
    if (!matchPricemodels(item)) return;
    if (!matchCount(item)) return;

    results.push(item);
  });

  switch (model.sort) {
    case "title":
      results = results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "count":
      results = results.sort((a, b) => b.count - a.count);
      break;
    case "age":
      results = results.sort((a, b) => {
        return Date.parse(b.birth) - Date.parse(a.birth);
      });
      break;
  }

  state.items = results;
};

export default {
  state: state,
  cache: cache,
  model: model,
  updateItems,
  updateGrids,
  updateLicenses,
  updatePricemodels,
  updateCounts,
  updateCache,
  setItems,
};
