<script setup lang="ts">
import { NuxtLink } from '#components';

</script>

<template>
    <footer class="bg-gradient-to-b from-[#33B34A] to-[#10161C] w-full pt-[106px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="bg-[#1b4b2b77] w-[100%] sm:p-[64px] p-[10px] rounded-[12px]">
                <div>
                    <h1 class="text-[white] text-[32px]">
                        Свяжитесь с нами
                    </h1>
                    <p class="text-[16px] text-[#ffffff89] sm:w-[320px]">
                        Свяжитесь с нами, используя методы ниже
                        ты можешь выйти
                    </p>
                </div>
                <div class="flex items-center flex-col gap-[12px] mt-[36px]">
                    <div
                        class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px] hover:bg-[#CAA244] cursor-pointer duration-500">
                        <div
                            class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-map-pin-filled text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
                        </div>
                        <div>
                            <span class="block opacity-[0.7] text-[14px]">
                                Посетите наш офис:
                            </span>
                            <span class="block text-[16px]">
                                г.Ташкент, Мирабадский район, ул. Ойбек 49
                            </span>
                        </div>
                    </div>

                    <div
                        class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px]  hover:bg-[#CAA244] cursor-pointer duration-500">
                        <div
                            class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] duration-500  w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-phone text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
                        </div>
                        <div>
                            <span class="block opacity-[0.7] text-[14px]">
                                Номер телефона
                            </span>
                            <span class="block text-[16px]">
                                +998 (71) 200 70 07
                            </span>
                        </div>
                    </div>
                    <div
                        class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px] hover:bg-[#CAA244] cursor-pointer duration-500">
                        <div
                            class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] duration-500  w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-mail text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
                        </div>
                        <div>
                            <span class="block opacity-[0.7] text-[14px]">
                                Электроннная почта
                            </span>
                            <span class="block text-[16px]">
                                MaryamMahmudova@gmail.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center flex-col md:mt-[152px] mt-[50px]">
                <div class="flex flex-col md:flex-row items-center gap-[24px] text-center md:text-left">
                    <NuxtLink to="/">
                        <p class="md:text-32 text-xl text-primary uppercase font-medium">
                            dust storm
                        </p>
                    </NuxtLink>
                    <p class="w-full md:w-[580px] text-[white]">
                        Внося вклад в развитие фонда, вы делаете жизни тысяч наших сограждан в разы лучше и помогаете им
                        стать на шаг ближе к их целям и мечтам.
                    </p>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-[12px] mt-[15px] text-center md:text-left">
                    <span class="text-[#ffffff77] block text-sm md:text-base">
                        © OnaFoundation. Все права защищены.
                    </span>
                    <span class="text-[white] block text-sm md:text-base">
                        Политика конфиденциальности
                    </span>
                </div>

                <div class="flex items-center gap-[12px] mt-[12px] mb-[30px]">
                    <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer"
                        class="bg-[#ffffff2f] w-[35px] h-[35px] rounded-[50%] text-[white] flex items-center justify-center hover:bg-[#33B34A] hover:text-[white] duration-500">
                        <span class="icon-telegram"></span>
                    </a>
                    <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer"
                        class="bg-[#ffffff2f] w-[35px] h-[35px] rounded-[50%] text-[white] flex items-center justify-center hover:bg-[#33B34A] hover:text-[white] duration-500">
                        <span class="icon-twitter"></span>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                        class="bg-[#ffffff2f] w-[35px] h-[35px] rounded-[50%] text-[white] flex items-center justify-center hover:bg-[#33B34A] hover:text-[white] duration-500">
                        <span class="icon-youtube"></span>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                        class="bg-[#ffffff2f] w-[35px] h-[35px] rounded-[50%] text-[white] flex items-center justify-center hover:bg-[#33B34A] hover:text-[white] duration-500">
                        <span class="icon-instagram"></span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>