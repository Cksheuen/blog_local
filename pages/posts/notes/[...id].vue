<script setup lang='ts'>
const route = useRoute()
const id = route.params.id[0]
</script>

<template>
  <div mx-auto>
    <Artical :id="id" path="notes" />
  </div>
</template>
