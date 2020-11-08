function cover(url) {
  if (url !== "") {
    try {
      url = require("@/assets/images/cropped/" + url);
    } catch (e) {
      url = require("@/assets/images/default.png");
    }
  } else url = require("@/assets/images/default.png");
  return url;
}

export default {
  cover,
};
