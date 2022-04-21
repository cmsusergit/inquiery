<script>
import { page } from "$app/stores";

import { onMount } from "svelte";    
const apiUrl = import.meta.env.VITE_API_URL
    class DeptDetail{
        constructor(){
            this.id=0;
            this.dept_name='';
            this.dept_alias='';
            this.description='';
        
        
        }
    };
    let loading=false
    let deptId=-1
    let deptDetail=new DeptDetail()
    let mesg=null
    let error=null
    const insertDeptDetail=async()=>{
        const url1=`${apiUrl}/deptdetail`
        try{
            loading=true
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(deptDetail)
            }
            const res = await fetch(url1,option);        
            const result = await res.json();
            mesg=result.mesg
            loading=false
            deptDetail=new DeptDetail()
        }catch(error){
            console.log('****',error)
            error=error
            loading=false
        }
    }
    const updateDeptDetailById=async()=>{
        const url1=`${apiUrl}/deptdetail`
        try{
            loading=true
            const option={
                method: 'PUT',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(deptDetail)
            }
            const res = await fetch(url1,option);        
            const result = await res.json();
            mesg=result.mesg
            deptDetail=new DeptDetail()
            loading=false
        }catch(error){
            console.log('****',error)
            error=error
            loading=false

        }
    }
    const onSubmitRecord=()=>{
        if(deptId==-1)
            insertDeptDetail()
        else
            updateDeptDetailById()
    }
    const loadDeptDetailById=async(id)=>{
        const url1=`${apiUrl}/deptdetailbyid/${id}`
        try{
            loading=true
            const res = await fetch(url1);        
            deptDetail = await res.json();
            loading=false
        }catch(error){
            console.log('****',error)
            loading=false
        }
    }
    onMount(async()=>{   
        console.log('****',$page.params.id)
        deptId=$page.params.id
        if(deptId==-1){            
            deptDetail=new DeptDetail()
        }
        else{
            loadDeptDetailById(deptId)
        }
    })
</script>
<div>   
    <h1 class="bg-gray-100 title-font text-2xl border-b p-2">{(deptId==-1)?`Add Department Detail`:`Update Department Detail With ID:${deptId}`}</h1>
    {#if loading}        
        <div class="my-8 h-100 text-4xl w-full text-orange-700 text-center">Loading....</div>
    {/if}
    {#if mesg}        <div class="flex w-full">
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
    <div class="p-8">
        <form class="grid" on:submit|preventDefault="{onSubmitRecord}">
            <div class="flex my-2 gap-4">
                <div>
                    <label class="font-bold text-blue-800" for="name">ID</label>
                    <input bind:value={deptDetail.id} name="id" class="w-full mt-2" type="text" id="name" disabled>
                </div>
                <div class="w-full">
                    <label class="font-bold text-blue-800" for="name">Department Name</label>
                    <input bind:value={deptDetail.dept_name} name="name" class="mt-2 w-full" type="text" id="name" required>
                </div>
                <div class="w-full">
                    <label class="font-bold text-blue-800" for="name">Department Alias</label>
                    <input bind:value={deptDetail.dept_alias} name="name" class="mt-2 w-full" type="text" id="name" required>
                </div>
            </div>
            
            <div class="my-2 flex">
                <div class="w-full">
                    <label class="font-bold text-blue-800" for="item_desc">Description</label>                    
                    <textarea bind:value={deptDetail.description} class="mt-2 w-full" name="item_desc" id="item_desc" rows="5"></textarea>
                </div>
            </div>
            <div class="flex mt-4 p-4 mb-8 justify-end shadow-sm border-t border-b">
                <button class="bg-orange-500 text-white border px-4 py-2 w-1/5 hover:bg-orange-400" type="reset">Reset</button>
                <button class="bg-blue-500 text-white border px-4 py-2 w-1/5 hover:bg-blue-400" type="submit">{(deptId==-1)?`+Add Record`:`Update Record`}</button>
            </div>
        </form>
    </div>  
</div>   