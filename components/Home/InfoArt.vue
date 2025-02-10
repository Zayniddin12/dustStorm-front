<template>
    <section class="bg-[#F9F5E9] my-[50px] py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="flex flex-col sm:flex-row  justify-between mb-[24px]">
                <h1 class="text-[#33B34A] text-[24px] sm:text-[32px] sm:text-left">
                    Информация и статьи
                </h1>
                <button class="flex items-center gap-[12px] mt-3 sm:mt-0">
                    <span class="text-[16px] text-[black]">Все статьи</span>
                    <span class="icon-chevron rotate-180 text-[24px]"></span>
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
                <div v-for="index in 4" :key="index" class="InfoActCard cursor-pointer bg-[#ffffff] rounded-[16px] hover:shadow-xl duration-500">
                    <img class="rounded-t-[16px] h-[250px] sm:h-[300px] lg:h-[327px] w-full object-cover"
                        src="https://s3-alpha-sig.figma.com/img/6e32/82d0/a5079eb165022ceccfa967e25e4825cb?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sM5i8IGjbfhgFchSm3Fbvy0ow02aYpagxHBEwQf9JZZ5jhYrocPqPUMBvbBjRD4Nqf-JWeBbMmkQ07ouU226CLvEDiXX9QKwnFKPkgsLKvq7FrMgtSjaMm0jr8XHD44CwH2Mxj~BPIyzoohsOlz61L19gmjswdyoJf7ndrXU~dhMgt1y5PSQaasY-WCbfgDLAGQ4D~AVRxG4gj7F8TxfuwysY1jzwg1AgeL9AJObLRds9QRtyvZSWaQIgkBDoAS9f-qOcBuVpU0clgv55Tpis7EO~QSYiXololM1PPHKoI7ZfOHYzUIh4cAPeK8qwL1iVVc7E1583YZzYB4JJPUflA__"
                        alt="Foto" />
                    <div class="p-[16px] sm:p-[20px]">
                        <h2 class="text-[18px] sm:text-[20px] text-[#002734]">
                            Прошёл практический семинар по госпитальной педагогике
                        </h2>
                        <p class="text-[#8F8F8E] mt-[6px] text-[14px] sm:text-[16px]">
                            Своим первым опытом работы в госпитальной школе поделились студенты педагогических вузов,
                            обучающихся по модулю «Инклюзивное образование. Госпитальная педагогика».
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
