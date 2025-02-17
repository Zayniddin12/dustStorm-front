<template>
    <div class="InfoActCard cursor-pointer bg-white rounded-16 hover:shadow-xl duration-300">
        <img class="rounded-t-16 h-[250px] sm:h-[300px] lg:h-[327px] w-full object-cover" :src="foto" alt="Foto" />
        <div class="p-[16px] sm:p-[20px]">
            <h2 class="text-[18px] sm:text-[20px] text-dark-100">
                {{ title }}
            </h2>
            <p class="text-gray-300 mt-[6px] text-[14px] sm:text-[16px]">
                {{ truncatedParagraph }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { truncateText } from "@/utils/index";

const props = defineProps<{
    foto: string;
    title: string;
    paragraph: string;
}>();

const truncatedParagraph = computed(() => truncateText(props.paragraph, 20));
</script>
