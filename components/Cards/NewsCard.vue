<template>
    <div
        class="relative w-full sm:w-[271px] border border-primary rounded-xl p-3 bg-white duration-300 hover:shadow-xl cursor-pointer">
        <img class="w-full rounded-10 h-[158px] object-cover" :src="image" alt="Фото" />
        <div
            class="absolute top-[130px] left-4 z-10 bg-gray-800 rounded-xl border border-gray-700 backdrop-blur-md px-2 py-1">
            <span class="text-white text-xs">
                {{ date }}
            </span>
        </div>
        <h2 class="mt-3 mb-1 text-16 font-semibold">
            {{ title }}
        </h2>
        <p class="text-12 text-gray-600">
            {{ description }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
        date: String,
        title: String,
        description: String
    }
};
</script>
