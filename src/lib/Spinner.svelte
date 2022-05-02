
<style>
/* from https://github.com/loadingio/css-spinner/ */
.lds-ring {
  /* position: absolute; */
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  right: 1px;
  top: -34px;
  width: 32px;
  height: 32px;
  border: 6px solid orange;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: orange transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<div class="relative w-full">
  <div class="lds-ring" >
    <div></div><div></div><div></div><div></div>
  </div>
</div>