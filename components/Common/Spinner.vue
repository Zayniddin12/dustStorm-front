<template>
  <div class="w-full h-[500px] flex items-center justify-center">
    <div class="flex flex-col items-center space-y-3 text-[#33b34a]">
      <svg
        height="48"
        viewBox="0 0 24 24"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="12" cy="3" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate0"
              attributeName="r"
              begin="0;svgSpinners12DotsScaleRotate2.end-0.5s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="16.5" cy="4.21" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate1"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate0.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="7.5" cy="4.21" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate2"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate4.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="19.79" cy="7.5" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate3"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate1.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="4.21" cy="7.5" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate4"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate6.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="21" cy="12" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate5"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate3.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="3" cy="12" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate6"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate8.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="19.79" cy="16.5" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate7"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate5.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="4.21" cy="16.5" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate8"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotatea.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="16.5" cy="19.79" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotate9"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate7.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="7.5" cy="19.79" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotatea"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotateb.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <circle cx="12" cy="21" fill="currentColor" r="1">
            <animate
              id="svgSpinners12DotsScaleRotateb"
              attributeName="r"
              begin="svgSpinners12DotsScaleRotate9.begin+0.1s"
              calcMode="spline"
              dur="0.6s"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
              values="1;2;1"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="rotate"
            values="360 12 12;0 12 12"
          />
        </g>
      </svg>
    </div>
  </div>
</template>
<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #33b34a 41%);
  background: linear-gradient(0deg, #33b34a 50%, #33b34a 0) center/4.5px 100%,
    linear-gradient(90deg, #33b34a 50%, #33b34a 0) center/100% 4.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1.5s infinite steps(12);
}

.spinner::before,
.spinner::after {
  content: '';
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  transform: rotate(30deg);
}

.spinner::after {
  transform: rotate(60deg);
}

@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>
