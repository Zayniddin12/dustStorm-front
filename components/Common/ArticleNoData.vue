<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex items-center flex-col">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.6673 56.0002C44.6585 56.0002 56.0007 44.658 56.0007 30.6668C56.0007 16.6756 44.6585 5.3335 30.6673 5.3335C16.6761 5.3335 5.33398 16.6756 5.33398 30.6668C5.33398 44.658 16.6761 56.0002 30.6673 56.0002Z"
          stroke="#98A4BB"
          stroke-width="3.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M58.6673 58.6668L53.334 53.3335"
          stroke="#98A4BB"
          stroke-width="3.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <h2 class="font-semibold text-xl leading-137 mt-6 mb-1 text-center">
        {{ $t('results_not_found') }}
      </h2>
      <p class="text-base leading-130 text-[#727278] text-center sm:text-left">
        {{ $t('try_again') }}
      </p>
    </div>
  </div>
</template>
