`
<template>
  <transition :key="loading" name="skeleton" mode="out-in">
    <div
      v-if="loading"
      key="loading"
      class="shrink-0"
      :style="{
        height: height,
        width: width,
        margin: margin,
        style,
      }"
      :class="preloaderClass"
    >
      <span class="skeleton" :style="shimmerStyles" />
    </div>
    <template v-else>
      <slot />
    </template>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  loading?: boolean;
  height?: string;
  width?: string;
  margin?: string;
  line?: string | number;
  borderRadius?: string;
  preloaderClass?: string;
  circle?: boolean;
  style?: any;
}

const props = withDefaults(defineProps<Props>(), {
  height: "20px",
  width: "50px",
  line: 1,
  borderRadius: "8px 8px 2px 2px",
  preloaderClass: "",
});

const shimmerStyles = computed(() => {
  return {
    "--width": props.width,
    "--height": props.height,
    "--border-radius": props.circle ? "50%" : props.borderRadius,
  };
});
</script>

<style scoped>
.skeleton {
  background-color: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  position: relative;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  background: linear-gradient(
    to right,
    #25323d 10%,
    #2e3c48 35.78%,
    #25323d 73.28%
  ) !important;
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
