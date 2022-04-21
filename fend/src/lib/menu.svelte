<script>
import { page } from "$app/stores"

import { isAuth } from "$lib/../store"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa/src/fa.svelte"
    let isMenuOpen=false
    let userMenuOpen=false
    let routeList=[
        {type:0,name:'INQUIRY DETAIL',path:'/coordinator'},        
        {type:0,name:'MANAGE USER',path:'/user'}
    ]
</script>
<div>
    <nav  class="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 bg-white shadow text-lg rounded">

      <div class="text-lg text-blue-800 font-bold">Welcome {$isAuth.username}</div>
         <svg on:click={()=>{isMenuOpen=!isMenuOpen}}
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer md:hidden block justify-right"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>   
        <div  class="w-full md:flex md:items-center md:w-auto" class:hidden={isMenuOpen} >
          <ul
            class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >      
          <a class:underline={$page.url.pathname == '/'} class="md:p-4 py-2 block text-blue-800 font-bold hover:text-blue-400" href='/'>HOME</a>
          {#if $isAuth}
            {#each routeList as route}
                {#if $isAuth.user_type==route.type}
                  <li>
                    <a class:underline={$page.url.pathname == route.path} class="md:p-4 py-2 block text-blue-800 font-bold hover:text-blue-400" href={route.path}>{route.name}</a>
                  </li>
                {/if}
            {/each}
              <li class="dropdown relative">
              <button class="md:p-4 text-lg hover:bg-gray-200 rounded">
                <span><Fa icon={faUser}/></span>
              </button>
              <ul class="dropdown-menu absolute hidden rounded">
                <li class=""><a class="block bg-white hover:bg-gray-200 py-2 px-2 rounded whitespace-nowrap" href="/user/changepwd">Change password</a></li>
                <li class=""><a class="block bg-white hover:bg-gray-200 py-2 px-2 rounded whitespace-nowrap" href="/logout">Logout</a></li>
              </ul>              
            </li>
          {:else}
            <li>
              <a class="md:p-4 py-2 block text-blue-800 font-bold hover:text-blue-400" href='/login'>LOGIN</a>
            </li>          
          {/if}
          </ul>
        </div>      
    </nav>
</div>

<style>

.dropdown:hover .dropdown-menu {
  display: block;color:gray;
}
</style>