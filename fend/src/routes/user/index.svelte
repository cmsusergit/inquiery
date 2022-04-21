<script>
import { goto } from '$app/navigation';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { onMount } from 'svelte';
import Fa from 'svelte-fa/src/fa.svelte';
const apiUrl=import.meta.env.VITE_API_URL
    let userList=[];
    let loading=false;
    let mesg=null
    let error=null


    const updateUserDetail=(id)=>{
        goto(`/user/addupdate/${id}`)
    }
    const loadUserList=async()=>{
        loading=true
        try{
            const res = await fetch(`${apiUrl}/user`);
            userList = await res.json();
            loading=false   
        }catch(error){
            console.log(error);
            loading=false
        }
    }
    const removeUserDetail=async(id)=>{
        const url1=`${apiUrl}/user/${id}`
        try{
            loading=true
            const option={
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }
            const res = await fetch(url1,option);        
            const result = await res.json();
            mesg=result.mesg
            loading=false
            loadUserList()
        }catch(error){
            console.log('****',error)
            error=error
            loading=false
        }        
    }
    onMount(() => {
        loadUserList()
	});
</script>


<div>
    <h1 class="bg-sky-400 text-white w-100 text-2xl mt-2 p-1 rounded">User Management</h1>   
    <div class="flex justify-end border-b my-2 p-2">

        <a href="/user/addupdate/-1" class=" bg-green-400 hover:bg-green-500 text-white px-4 py-2 border rounded">+Add User</a>
    </div>
    {#if loading}        
        <div class="my-8 h-100 text-4xl w-full text-orange-700 text-center">Loading....</div>
    {/if}
    <table class="mt-2 w-full">
        <thead class="bg-gray-500 text-white">
            <tr>
                <th class="border p-2">Sr.</th>
                <th class="border p-2">User Name</th>
                <th class="border p-2">Email</th>    
                <th class="border p-2">Contact</th>
                <th class="border p-2" width=140></th>            
            </tr>
        </thead>
        {#each userList as record,indx (record.id)}
            <tr class="text-center">
                <td class="border p-2">{indx+1}</td>            
                <td class="border p-2">{record.username}</td>
                <td class="border p-2">{record.email}</td>                            
                <td class="border p-2">{record.mobile}</td>
                <td class="border p-2">

                    <button on:click={(event)=>updateUserDetail(record.id)} class="bg-amber-200 hover:bg-amber-400 text-gray  p-2 rounded">
                        <Fa icon={faPen}/>
                    </button>
                    <button on:click={(event)=>{removeUserDetail(record.id)}} class="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded">                        
                        <Fa icon={faTrash}/>
                    </button>
                </td>
            </tr>
        {/each}        
    </table>
</div>




















