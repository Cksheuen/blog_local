<template>
  <main class="px-10 py-20 text-center">
    <div relative z-10>
      <Header />
      <slot />
      <div class="z-1 mx-auto mt-5 text-center text-sm opacity-25">
        [Default Layout]
      </div>
      <Footer />
    </div>
  </main>
</template>
