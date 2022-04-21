<script>
import { goto } from "$app/navigation";

import { isAuth, setHeader } from "$lib/../store";

import { onMount } from "svelte";
const apiUrl = import.meta.env.VITE_API_URL
let userInfo={email:'',oldpwd:'',newpwd:''}
let confirmPwd=''
const onSubmit=async()=>{
        if(!comparePwd())
            return     
        
        const url1=`${apiUrl}/user/changepwd`
        try{
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(userInfo)
            }
            const res = await fetch(url1,setHeader(option))
            if(res.status==200){
                await res.json();
                alert("User Record Submitted Successfully")
                goto('/logout')
            }else{
                const tt=await res.json()
                alert(tt.error)
            }
        }catch(error){
            console.log('****',error)
            alert(error)
        }
    }    
    const comparePwd=()=>{
        if(userInfo.newpwd!=confirmPwd){
            alert('Password Not Matching')
            return false
        }
        return true
    }
onMount(()=>{
    userInfo.email=$isAuth.email
})
</script>
<div>
    <div class="bg-sky-400 text-white text-2xl w-full mt-2 p-1 rounded flex flex-row justify-between items-center">
        <h1>Change Password</h1>
    </div>
    <form on:submit|preventDefault={onSubmit} class="p-2 flex flex-col gap-2 mx-auto w-4/5">    
        <div>
            <div class="mt-2 field">
                <label for="pwd1">Old Password*</label>
                <input type="password" id="pwd1" bind:value={userInfo.oldpwd} required>
            </div>
            <div class="mt-2 field">
                <label for="pwd1">New Password*</label>
                <input type="password" id="pwd1" bind:value={userInfo.newpwd} required>
            </div>
            <div class="mt-2 field">                    
                <label for="confirmpwd">Confirm Password*</label>
                <input on:blur={comparePwd} type="password" id="confirmpwd" bind:value={confirmPwd} required>
            </div>
        </div>  
        
        
        <div class="mt-2 border-t py-2 text-center">
            <button class="bg-blue-500 text-white w-1/4 hover:bg-blue-400 py-2 px-4 rounded" type="submit">SUBMIT</button>
        </div>
    </form>
</div>

