<script>
import { page } from "$app/stores"

import {groupBy} from 'lodash'
import { setHeader,getUserName } from "$lib/../store"
import { onMount } from "svelte";
const apiUrl=import.meta.env.VITE_API_URL
let faqList=[]
let inquiryCommentList=[]
let deptList=[]
let loading=false 
    
    const loadCommentList=async()=>{
        try{
            const rr=await fetch(`${apiUrl}/inquery/${$page.params.id}/comment/-1`,setHeader())
            const dt=await rr.json()
            inquiryCommentList=groupBy(dt,ob=>{return ob.f_inquiryhandled_id})
        }
        catch(error){
            inquiryCommentList=[]
            console.log(error)
        }
    }    
    const loadDeptList=async()=>{
        try{
            const rr=await fetch(`${apiUrl}/dept`,setHeader())
            deptList=await rr.json()            
        }
        catch(error){
            deptList=[]
            console.log(error)
        }
    }
    const loadFAQList=async()=>{
        try{
            const rr=await fetch(`${apiUrl}/inquery/inquiryfaq`,setHeader())        
            const dt=await rr.json()
            faqList=dt
        }
        catch(error){
            console.log(error)
        }
    }
    onMount(async()=>{
        loadDeptList()
        loadFAQList()        
        loadCommentList()
    })
</script>
<div class="container">    
    {#if loading}
    <div class="absolute left-0 top-1/2 w-full h-48 bg-blue-500 text-white z-10 text-4xl opacity-50 text-center">
        <p class="relative top-1/2">Loading....</p>
    </div>    
    {/if}
    <div class="bg-sky-400 text-white w-full text-2xl mt-2 px-2 py-1 flex justify-between rounded">
        <h1 class="">Comment/Discussion</h1>
    </div>
    {#each Object.keys(inquiryCommentList) as inquiryComment}
    <div class="mt-4 text-lg">
           {#await getUserName(inquiryComment)}
                <div>Loading....</div>
            {:then dt}
                <div class="bg-orange-400 text-white w-full p-2 font-bold">{dt[0]?.username} ({dt[0]?deptList.find(ob=>ob.id==dt[0].f_dept_id).dept_name:'-'})</div>
            {/await}
            <table class="w-full">               
            {#each inquiryCommentList[inquiryComment] as record}
            <tr class="p-2 border-b">
                <td class="py-2 w-1/2 font-bold">{faqList.find(ob=>ob.id==record.f_faq_id).faq}</td>
                <td class="py-2 w-1/2">{record.remarks?record.remarks:'-'}</td>
            </tr>
            {/each}
            </table>
    </div>
    {/each}
</div>



