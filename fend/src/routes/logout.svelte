<script>
import { browser } from "$app/env";
import { goto } from "$app/navigation";
import { isAuth, setHeader } from "$lib/../store";
const apiUrl = import.meta.env.VITE_API_URL
import { onMount } from "svelte";
    onMount(async()=>{
        if(browser){
            const url1=`${apiUrl}/user/logout`    
            try{
                    const option={
                        method: 'POST',mode: 'cors',
                        headers: {'Content-Type': 'application/json'}
                    }
                    const resp = await fetch(url1,setHeader(option))
                    const result = await resp.json();
                    if(result){
                        localStorage.removeItem('userdetail')
                        isAuth.set(null)
                        goto('/login')
                    }
                }catch(error1){
                    console.log('****',error1)
                }            
        }    
    })
</script>












