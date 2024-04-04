<template>
  <div id="app" class="bg-gray-200 min-h-screen">
      <header class="h-14 shadow-xl border-b-2 w-full flex items-center justify-center">
        <a>
            <img class="h-8" src="/assets/contractuo-logo.svg" alt="logo">
        </a>
      </header>

    <main class="pt-2">
        <router-view />
    </main>
  </div>
</template>

<script>
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/bold";
export default {

}
</script>