<template>
    <div
      :class="[
        'inline-flex items-center transition-300 relative bg-grey-400 rounded-[10px] border overflow-hidden w-full p-3 group',
        error
          ? '!border-red'
          : 'border-grey-300 focus-within:border-blue focus-within:!bg-white',
      ]"
    >
      <span :class="[prefixClass]" class="flex-center">
        <slot name="prefix" />
      </span>
      <input
        :value="modelValue"
        v-bind="{
          type,
          minlength,
          maxlength,
          max,
          min,
          disabled,
          placeholder,
          readonly,
          autocomplete,
          id,
        }"
        :class="[
          inputClass,
          'font-medium leading-125 text-base text-dark placeholder:text-[#A2ABBE] placeholder:font-medium bg-transparent flex-grow outline-none caret-blue',
          { 'placeholder:text-red': error },
        ]"
        class="w-full"
        ref="Input"
        @keyup.enter="handleEnter"
        @input="handleInput"
        @blur="$emit('blur')"
        @focusout="$emit('focusout')"
        @focus="handleFocus"
      />
  
      <span :class="[suffixClass]" class="flex-center">
        <slot name="suffix" />
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  export interface Props {
    type?: string;
    placeholder?: string;
    modelValue?: number | string;
    disabled?: boolean;
    error?: boolean;
    maxlength?: number;
    minlength?: number;
    max?: number;
    min?: number;
    inputClass?: string | string[];
    prefixClass?: string;
    suffixClass?: string;
    autocomplete?: string;
    id?: string;
    readonly?: boolean;
  }
  
  const emit = defineEmits<{
    (e: "update:modelValue", value: any): void;
    (e: "blur"): void;
    (e: "focusout"): void;
    (e: "focus"): void;
    (e: "enter"): void;
  }>();
  
  const handleInput = (e: { target: HTMLInputElement }) => {
    emit("update:modelValue", e.target.value);
  };
  const handleEnter = () => {
    emit("enter");
  };
  const Input = ref();
  defineExpose({ Input });
  
  withDefaults(defineProps<Props>(), {
    type: "text",
    maxlength: 99,
    minlength: undefined,
    max: undefined,
    min: undefined,
    inputClass: undefined,
    autocomplete: "new-password",
  });
  
  const handleFocus = (e: Event) => {
    emit("focus");
  };
  </script>
  
  <style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  </style>
  