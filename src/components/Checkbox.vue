<template>
  <label
    :for="`s-${id}`"
    class="flex items-center font-bold text-gray-300 fill-current"
  >
    <div
      class="flex gap-2 px-2 py-1 bg-black border-2 border-black rounded shadow-inner select-none checked"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="text-green-500"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
        />
      </svg>
      {{ id }}{{ suffix }}
    </div>

    <div
      class="flex gap-2 px-2 py-1 bg-gray-900 border-2 border-black rounded opacity-50 select-none unchecked"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
      </svg>
      {{ id }}{{ suffix }}
    </div>
  </label>
</template>

<script>
export default {
  props: ["id", "suffix"],
};
</script>

<style scoped>
.checkboxes label .checked {
  display: none;
}
.checkboxes input:checked ~ label .checked {
  display: flex;
}

.checkboxes label .unchecked {
  display: flex;
}
.checkboxes input:checked ~ label .unchecked {
  display: none;
}

.checkboxes input:checked ~ label:hover {
  background: black;
}
</style>
