<script>
import { isAuth, setHeader } from "$lib/../store";

import { onMount } from "svelte";
import Paging from "$lib/paging.svelte"
import { browser } from "$app/env";
import Fa from 'svelte-fa/src/fa.svelte'
import {faChevronDown,faCheckCircle,faChevronUp, faComment, faComments, faVcard} from '@fortawesome/free-solid-svg-icons'
const apiUrl = import.meta.env.VITE_API_URL
let searchBy='name'
let searchText=''
let is_closed=0

let sortDir='DESC'
let sortBy='inquery_date'
let inqueryList=null
let selectedDept=null
let deptList=[]
$:{
    if(searchText){
        loadInqueryCount()
        loadInqueryList()
    }
    if(selectedDept)
    {
        loadInqueryCount()
        loadInqueryList()
    }
}
$:{
    if(is_closed){
        loadInqueryCount()
        loadInqueryList()
    }
    else{
        loadInqueryCount()
        loadInqueryList()
    }
}
let paging={
        perPage:50,
        totalPage:1,
        currPage:1,
        totalRecord:0
}
onMount(async()=>{
    loadDeptList()
    loadInqueryCount()
    loadInqueryList()
})
const loadInqueryCount=async()=>{
    const url1=`${apiUrl}/inquery/count?searchtext=${searchText}&searchby=${searchBy}&dept=${selectedDept}&is_closed=${is_closed}`    
        try{
                const option={
                    method: 'GET',mode: 'cors'
                }                
                const resp = await fetch(url1,setHeader(option))                
                if(resp.status==200){       
                    const tt=await resp.json()
                    paging.currPage=1
                    paging.totalRecord=tt.count
                    paging.totalPage=Math.ceil(tt.count/paging.perPage)
                }
                else{
                    const error=await resp.json()
                    paging.currPage=1                    
                    paging.totalPage=1
                    paging.totalRecord=0
                    browser && alert(error.error)
                }
            }            
            catch(error1){
                inqueryList=[]
                console.log('****',error1)
    }            
}
const loadInqueryList=async()=>{
    const url1=`${apiUrl}/inquery/detailed?dept=${selectedDept}&searchtext=${searchText}&searchby=${searchBy}&sortby=${sortBy}&sortdir=${sortDir}&limit=${paging.perPage}&offset=${(paging.currPage-1)*paging.perPage}&is_closed=${is_closed}`    
        try{
                const option={
                    method: 'GET',mode: 'cors'
                }                
                const resp = await fetch(url1,setHeader(option))                
                if(resp.status==200){       
                    inqueryList=await resp.json()
                }
                else{
                    const error=await resp.json()
                    browser && alert(error.error)
                }
            }catch(error1){
                inqueryList=[]
                console.log('****',error1)
                browser && alert(error1)
    }            
}
const getUserName=async(id)=>{
    const url1=`${apiUrl}/user/${id}`
    const res = await fetch(url1);
		const ob = await res.json();
		if (res.status==200) {
			return ob
		} else {
			throw new Error(ob)
		}
}
const loadDeptList=async()=>{
    const url1=`${apiUrl}/dept`    
        try{
                const resp = await fetch(url1)                
                if(resp.status==200){       
                    deptList=await resp.json()
                
                    selectedDept=$isAuth.user_type==1?$isAuth.f_dept_id:-1                
                }
                else{
                    const error=await resp.json()
                    browser && alert(error.error)
                }
            }catch(error1){
                inqueryList=[]
                console.log('****',error1)
                browser && alert(error1)
    }            
}
</script>
<div class="container">
    <h1 class="bg-sky-400 text-white w-100 text-2xl mt-2 p-1 rounded">Inquiry Detail</h1>        
    <div class="my-2 py-1 text-right w-full">
        <div class="field border-b">
            <span class="field justify-end flex-row">
            <label class="p-2 text-xl" for="allob">
                <input type="radio" bind:group={is_closed} name="allob" id="allob" value={-1}>
                All
            </label>
            <label class="p-2 text-xl" for="open">
                <input type="radio" bind:group={is_closed} name="open" id="open" value={0}>
                Open
            </label>
            <label class="p-2 text-xl" for="closed">
            <input type="radio" bind:group={is_closed} name="closed" id="closed" value={1}>
                Closed
            </span>
        </div>        
       <div>
        <select class="w-full mb-2 md:mb-0 md:w-72" bind:value={selectedDept} disabled={$isAuth.user_type==1}>
            <option value={-1}>ALL</option>
            {#each deptList as dept}                
                <option value={dept.id}>{dept.dept_name}</option>

            {/each}
        </select>        
        <input bind:value={searchText} class="w-full md:mb-0 mb-2 md:w-1/2" placeholder={`Search By ${searchBy}`} type="text">        
        <select class="md:w-52 w-full" bind:value={searchBy}>
            <option value="name">Name</option>
            <option value="mobile">Contact</option>
        </select>
    </div>
    </div>
    {#if !inqueryList} 
        <h1>Loading....</h1>
    {:else if inqueryList.length>0}                
        <div class="my-2 border-b">
            <Paging on:prev={ee=>{paging.currPage-=1;loadInqueryList()}} on:next={ee=>{paging.currPage+=1;loadInqueryList()}} paging={paging}/>
        </div>
        <div class="text-sm overflow-auto">
            <table class="w-full">
            <thead class="bg-gray-400 text-white">
                <tr>
                    <th class="border p-1">Sr.</th>
                    <th on:click={ee=>{sortDir=sortDir=='ASC'?'DESC':'ASC';sortBy='name';loadInqueryList()}} class="border w-1/4 p-1 hover:cursor-pointer">
                        Name
                        <div class='float-right hover:cursor-pointer'>
                            {#if sortBy=='name'}
                                <Fa icon={sortDir=='ASC'?faChevronDown:faChevronUp} size='lg' class='px-2'/>
                            {/if}
                        </div>
                    </th>
                    <th class="border w-40 p-1">Email</th>
                    <th class="border w-20 p-1">Mobile</th>
                    <th class="border w-50 p-1">City</th>
                    <th class="border p-1">Preferred Branch(es)</th>
                    <th class="border w-20 p-1">Counselling Required?</th>
                    <th on:click={ee=>{sortDir=sortDir=='ASC'?'DESC':'ASC';sortBy='inquery_date';loadInqueryList()}}  class="border w-42 p-1 hover:cursor-pointer" >
                        Inquiry Date
                        <div class='float-right hover:cursor-pointer'>
                            {#if sortBy=='inquery_date'}
                                <Fa icon={sortDir=='DESC'?faChevronDown:faChevronUp} size='lg' class='px-2'/>
                            {/if}
                        </div>
                    </th>
                    <th class="border w-10"></th>
                </tr>
            </thead>       
            {#each inqueryList as record,indx (indx)}
                <tr class="text-center">
                    <td class="border p-1">{indx+1}</td>          
                    <td class="border p-1">
                        <div class="flex justify-center gap-4">
                            <a class="hover:underline hover:text-blue-500 font-bold" href={`/studentdetail/${record.id}`}>{record.name}</a>
                            <Fa icon={faCheckCircle} class="{record.is_closed==1?'':'hidden'} text-red-500" size='lg'/>                            
                        </div>
                        {#await getUserName(record.f_closed_by)}
                        <p>Loading.... </p>                           
                        {:then dt}
                        <p class="{record.is_closed==1?'':'hidden'} mt-1 text-red-500"><b>Closed By</b> <i>{dt[0]?.username}</i></p>
                        {/await}
                    </td>   
                    <td class="border p-1">{record.email}</td>   
                    <td class="border p-1">{record.mobile}</td>   
                    <td class="border p-1">{record.city}</td>   
                    <td class="border p-1">
                        {#each record.preferredBranchList as branch}

                            <p class={branch.f_user_id!=-1?"bg-green-500 text-white m-1 font-bold rounded p-1":"bg-orange-400 m-1 font-bold text-white rounded p-1"}>{branch.priority} - {branch.branch_name}</p>
                        {/each}
                    </td>
                    <td class="{record.is_counselling_req==1?(record.counselling_type==0?'text-orange-500':'text-green-600'):''} font-extrabold border p-1">
                        {record.is_counselling_req==1?(record.counselling_type==0?'OFFLINE':'ONLINE'):'N'}
                        <br>
                        {#if record.is_counselling_req==1}                        
                            {#if record.counselling_type==1}
                            <div class="text-xs text-gray-800">
                                {new Date(record.preffered_date).toLocaleDateString("en-IN",{day:'2-digit',month:'long',year:'numeric'})}
                                <br>
                                ({record.preffered_time})
                            </div>
                            {/if}
                        {/if}
                    </td>   
                    <td class="border font-bold p-1">              
                        {new Date(record.inquery_date).toLocaleDateString("en-IN",{day:'2-digit',month:'long',year:'numeric'})}
                    </td>
                    <td class="border p-1">
                        <a class="block bg-amber-500 hover:bg-amber-400 text-white p-2 border rounded" href={`/studentdetail/${record.id}`}>
                            <Fa icon={faVcard}></Fa>
                        </a>
                        {#if $isAuth?.user_type==0}
                            <a class="block bg-blue-400 hover:bg-blue-500 text-white p-2 border rounded" href={`/studentdetail/commentdlg_${record.id}`}>
                                <Fa icon={faComments}></Fa>
                            </a>
                        {/if}
                    </td>
                </tr>
            {/each}        
        </table>
        <div class="my-2 border-t">        
            <Paging on:prev={ee=>{paging.currPage-=1;loadInqueryList()}} on:next={ee=>{paging.currPage+=1;loadInqueryList()}} paging={paging}/>
        </div>
        </div>
    {:else}
    <div>
            <p class="bg-orange-800 text-white p-1 mt-2 text-center">Record Not Found!!!!</p>
        </div>
    {/if}
</div>
