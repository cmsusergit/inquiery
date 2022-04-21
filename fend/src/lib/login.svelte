<script>
import { browser } from "$app/env";

import { goto } from "$app/navigation";
import { isAuth } from "$lib/../store";
// 
// import { isAuth } from "$lib/../store";
const apiUrl = import.meta.env.VITE_API_URL
let user={}
let loading=false
let error=null


const login=async(ee)=>{    
    const url1=`${apiUrl}/user/login`    
    try{
            loading=true
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(user)
            }
            const resp = await fetch(url1,option);        
            console.log(resp.status);
            if(resp.status!=200){
                const error1=await resp.json()
                console.log(error1)
                error=error1.error
                loading=false    
                return
            }
            const result = await resp.json();
            if(result){
                localStorage.setItem('userdetail',JSON.stringify(result))
                if(browser){
                    const temp1=JSON.parse(localStorage.getItem('userdetail'))
                    // if(temp1)
                    //     delete temp1['jwt_']
                    $isAuth=(temp1?temp1:null)
                }
                goto('/')
            }
            loading=false
        }catch(error1){
            console.log('****',error1)
            error=error1.error
            loading=false
        }
}
</script>
<div>
    {#if loading}        
        <div class="my-8 h-100 text-4xl w-full text-orange-700 text-center">Loading....</div>
    {/if}
    {#if error}        
    <div class="flex w-full">
        <div class="my-8 w-full h-100 text-xl p-2 bg-orange-500 text-white text-center">
            <span>{error}</span> 
            <button on:click="{(event)=>error=null}" class="rounded-full float-right bg-gray-100 text-gray-800 px-2 hover:bg-gray-200">X</button>
            <div class="clear-right"></div>
        </div>    
    </div>    
    {/if}
    <div class="mt-4 w-full md:w-2/5 mx-auto border rounded p-4">
        <h1 class="bg-blue-800 text-white font-bold w-full p-2 text-2xl text-center rounded">Login</h1>
        <form class="grid p-2" on:submit|preventDefault={login}>
        <div class="flex my-2 gap-4 flex-col justify-items-start text-xl font-bold"> 
            <div>
                <label class="font-bold text-blue-800" for="email">Email</label>
                <input bind:value={user.email} name="email" class="w-full mt-2" type="email" id="email" required>
            </div>
            <div>
                <label class="font-bold text-blue-800" for="password">Password</label>
                <input bind:value={user.password} name="password" class="w-full mt-2" type="password" id="password" required>
            </div>
        </div>  
        <div class="px-2 py-2 w-full text-center">
            <button class="bg-green-500 text-white py-2 px-4 hover:bg-green-400 w-2/4 rounded">Login</button>
        </div>
        </form>
    </div>
</div>

