<script>
import { browser } from "$app/env";

import Chart1 from "$lib/chart1.svelte";
import Chart2 from "$lib/chart2.svelte";
import { onMount } from "svelte";
const apiUrl = import.meta.env.VITE_API_URL
let count={}
const loadCount=async()=>{
    const url1=`${apiUrl}/inquery/countforadmin`    
    try{
        const resp = await fetch(url1)                
        if(resp.status==200){       
            count=await resp.json()
        }
        else{
            const error=await resp.json()
            browser && alert(error.error)
        }        
    }catch(error1){
            count=null
            console.log('****',error1)
            browser && alert(error1)
    }        
}
onMount(()=>{
    loadCount()
})
</script>
<div class="mb-4 w-full">
    <div class="w-full flex md:flex-row flex-col justify-between gap-2">
        <div class="border py-4 px-2 text-center text-xl shadow bg-blue-400 text-white rounded md:w-1/4 w-full">
            <div>TOTAL INQUIRIES</div>
            <div class="text-2xl font-bold">{count.total}</div>
        </div>
        <div class="border py-4 px-2 text-center text-xl shadow bg-amber-400 text-white rounded md:w-1/4 w-full">
            <div>OPEN INQUIRIES</div>
            <div class="text-2xl font-bold">{count.open}</div>
        </div>
        <div class="border py-4 px-2 text-center text-xl shadow bg-red-400 text-white rounded md:w-1/4 w-full">
            <div>CLOSED INQUIRIES</div>
            <div class="text-2xl font-bold">{count.closed}</div>
        </div>
        <div class="border py-4 px-2 text-center text-xl shadow bg-green-400 text-white rounded md:w-1/4 w-full">
            <div>TODAY'S INQUIRIES</div>
            <div class="text-2xl font-bold">{count.dtCount}</div>
        </div>
    </div>
<div>
    <Chart1/>
    <Chart2/></div>
</div>


