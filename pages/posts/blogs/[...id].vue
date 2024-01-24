<script setup lang='ts'>
const route = useRoute()
const id = route.params.id[0]
</script>

<template>
  <div>
    <Artical :id="id" path="blogs" />
  </div>
</template>
