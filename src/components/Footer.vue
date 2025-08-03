<template>
  <footer class="bg-[#BD2D2D] text-white py-5 px-5 sm:px-20 w-full "> 
    <div class="container mx-auto w-full px-0  pl-20">
      <div class="flex flex-col sm:flex-row justify-between items-start pl-3">
        <div class="text-left sm:pl-20 ">
          <p class="text-mb mb-2 ">
            © 1999-2012 21Cineplex.com. All materials and contents (texts, graphics, and every attribute) of 21Cineplex or 21Cineplex.com website are
          </p>
          <p class="text-mb mb-2">
            copyrights and trademarks of PT Nusantara Sejahtera Raya.
          </p>
          <p class="text-mb mb-2">
            Any commercial usage of the materials and contents is forbidden without prior permission from PT Nusantara Sejahtera Raya. There is no other
          </p>
          <p class="text-mb mb-4">
            PT Nusantara Sejahtera Raya allowed to use www.21Cineplex.com (21Cineplex website) without prior permission from PT Nusantara Sejahtera Raya
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
/* Responsif untuk mobile */
@media (max-width: 640px) {
  footer {
    padding-left: 10px;
    padding-right: 10px;
  }

  footer .container {
    padding-left: 0;
    padding-right: 0;
  }

  footer .flex {
    flex-direction: column;
  }

  footer .text-left {
    padding-left: 0;
  }
}
</style>
