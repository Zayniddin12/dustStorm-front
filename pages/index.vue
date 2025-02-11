<template>
  <div>

    <span class="icon-youtube"></span>
    <span class="icon-telegram"></span>
    <span class="icon-search"></span>
    <span class="icon-phone"></span>
    <span class="icon-map-pin-filled"></span>
    <span class="icon-map"></span>
    <span class="icon-mail"></span>
    <span class="icon-location"></span>
    <span class="icon-instagram"></span>
    <span class="icon-file-empty"></span>
    <span class="icon-file"></span>
    <span class="icon-chevron"></span>
    <span class="icon-twitter"></span>
    <span class="icon-close"></span>
    <span class="icon-burger"></span>
    <SectionsMain />
    <Event />
    <Contact />

  </div>
</template>
<script setup lang="ts">
import Event from '@/components/Sections/Main/Event.vue'
import Contact from '@/components/Sections/Main/Contact.vue'
</script>
