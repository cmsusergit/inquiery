<script>
import { goto } from "$app/navigation";


</script>
<!-- <script>
  import {page} from "$app/stores";

  const routeList=[
    {name:'Home',path:'/'},
    {name:'Manage ItemDetail',path:'/itemdetail'},    
    {name:"Department",path:'/deptdetail'},
    {name:"Supplier",path:'/supplierdetail'},
    {name:'Purchase',path:'/purchase'},    
  ]
</script> -->
<header class="text-gray-800 body-font">
  <div class="flex gap-4 flex-row">
    <img on:click={(ee)=>{goto('/')}} class="hover:cursor-pointer" src="bg.jpg" alt="" width="110" >
    <div class="w-full flex flex-col justify-center text-gray-800">            
        <h1 class="md:text-2xl font-bold text-left">Sardar Vallabhbhai Patel Institute of Technology,Vasad</h1>
        <h2 class="md:text-xl text-left font-bold">Admission Inquiry Form</h2>
    </div>
  </div>
  <div class="mt-4 mb-2 border-teal-800 border-t"></div>  
</header>
  <!-- <div class="container w-full mx-auto flex p-5 flex-col justify-center items-center gap-4">
    <div class="flex items-center">
    <a href="/" class="flex title-font font-medium items-center text-gray-800 mb-4 md:mb-0">
      <img width="80" src="https://upload.wikimedia.org/wikipedia/en/5/51/The_SVIT_Official_Logo.jpg" alt="logo">
    </a>
    <span class="ml-2 text-xl">Sardar Vallabhbhai Patel Institute Of Technlogy,Vasad</span>
  </div>
  <div class="w-full bg-blue-400 flex  text-white py-2 rounded-b-2xl shadow-lg gap-2">
    <nav class="md:mr-auto md:ml-5 md:py-1 flex flex-col md:flex-row items-center text-base justify-start gap-2">      
      {#each routeList as route}        
        <a href="{route.path}" class='{$page.url.pathname == route.path?'bg-blue-500 rounded-xl':''} ml-2 px-4 py-1 hover:bg-blue-500'>{route.name}</a>
      {/each}
    </nav>
    <a class="md:mr-4 md:ml-4 md:py-1 md:pl-4 inline-flex px-4 hover:bg-blue-500 items-center" href="/login">          
        Login
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path></svg>
    </a>
  </div>     
  </div>-->





























