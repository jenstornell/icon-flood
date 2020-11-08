<template>
  <tr>
    <th class="w-1/2 px-2 py-1 text-left border">{{ label }}</th>
    <td class="w-1/2 border">
      <a
        class="block px-3 py-2 text-blue-600 hover:underline"
        :class="css_class"
        v-if="href"
        :href="href"
        target="_blank"
        >{{ formatValue }}</a
      >
      <div class="px-3 py-2" v-else>{{ formatValue }}</div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["label", "value", "href", "suffix", "css_class"],
  computed: {
    formatValue: function() {
      const suffixed =
        typeof this.suffix !== "undefined"
          ? this.value + this.suffix
          : this.value;
      return suffixed;
    },
  },
};
</script>
