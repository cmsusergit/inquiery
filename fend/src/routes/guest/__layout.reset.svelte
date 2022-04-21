<script>
    import Foot from "$lib/foot.svelte"

</script>
<div class="flex flex-col mx-2 my-2">            
    <div class="bg-sky-400 h-8 w-full"></div>
    <header class="text-gray-800 body-font">
        <div class="flex gap-4 flex-row">
          <img src="bg.jpg" alt="" width="110" >
          <div class="w-full flex flex-col justify-center text-gray-800">            
              <h1 class="text-2xl font-bold text-left">Sardar Vallabhbhai Patel Institute of Technology,Vasad</h1>
              <h2 class="text-xl text-left font-bold">Admission Inquiry Form</h2>

            </div>
        </div>
        <div class="mt-4 mb-2 border-teal-800 border-t"></div>  
      </header>     
    <div class="mx-auto w-11/12">
        <slot></slot>
    </div>
    <Foot/>
</div>





