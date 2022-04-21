<script>
import { goto } from '$app/navigation';

import { onMount } from 'svelte';
const apiUrl=import.meta.env.VITE_API_URL
    let deptList=[];
    let loading=false;
    let mesg=null
    let error=null
    const updateDeptDetail=(id)=>{
        goto(`/deptdetail/addupdate/${id}`)
    }

    const loadDeptList=async()=>{
        loading=true
        try{
            const res = await fetch(`${apiUrl}/deptlist`);
            deptList = await res.json();
            loading=false   
        }catch(error){
            console.log(error);
            loading=false
        }
    }
    const removeDeptDetail=async(id)=>{
        const url1=`${apiUrl}/deptdetail/${id}`
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
            loadDeptList()
        }catch(error){
            console.log('****',error)
            error=error
            loading=false
        }        
    }
    onMount(() => {
        loadDeptList()
	});
</script>


<div>
    <h1 class="bg-gray-100 title-font text-2xl border-b p-2">Department Management</h1>
    <div class="flex justify-end border-b my-2 p-2">
        <a href="/deptdetail/addupdate/-1" class="hover:bg-gray-100 px-4 py-2 border rounded-sm">+Add Record</a>
    </div>
    {#if loading}        
        <div class="my-8 h-100 text-4xl w-full text-orange-700 text-center">Loading....</div>
    {/if}
    {#if mesg}        
    <div class="flex w-full">
        <div class="my-8 w-full h-100 text-xl p-2 bg-green-400 text-white text-center">
            <span>{mesg}</span> 
            <button on:click="{(event)=>mesg=null}" class="rounded-full float-right bg-gray-100 text-gray-800 px-2 hover:bg-gray-200">X</button>
            <div class="clear-right"></div>
        </div>            
    </div>
{/if}
{#if error}        
<div class="flex w-full">
    <div class="my-8 w-full h-100 text-xl p-2 bg-orange-200 text-white text-center">
        <span>{error}</span> 
        <button on:click="{(event)=>error=null}" class="rounded-full float-right bg-gray-100 text-gray-800 px-2 hover:bg-gray-200">X</button>
        <div class="clear-right"></div>
    </div>    
</div>    
{/if}

    <table class="mt-2 w-full">
        <thead class="bg-gray-500 text-white">
            <tr>
                <th class="border p-2">Sr.</th>
                <th class="border p-2">Department Name</th>
                <th class="border p-2">Department Alias</th>    
                <th class="border p-2">Description</th>
                <th class="border p-2"></th>            
            </tr>
        </thead>
        {#each deptList as record,indx (record.id)}
            <tr class="text-center">
                <td class="border p-2">{indx+1}</td>            
                <td class="border p-2">{record.dept_name}</td>
                <td class="border p-2">{record.dept_alias}</td>            
                <td class="border p-2">{record.description}</td>
                <td class="border p-2">
                    <button on:click={(event)=>updateDeptDetail(record.id)} class="bg-amber-200 text-gray  px-2">Edit</button>
                    <button on:click={(event)=>{removeDeptDetail(record.id)}} class="bg-red-500  text-white px-2">Delete</button>
                </td>
            </tr>
        {/each}        
    </table>
</div>




















