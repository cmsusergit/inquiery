<script>
import { browser } from "$app/env";
import { goto } from "$app/navigation"
import { page } from "$app/stores"
import { isAuth, setHeader } from "$lib/../store"
import { onMount } from "svelte"
const apiUrl=import.meta.env.VITE_API_URL
    let inquiryFaqList=[]
    let fullname=''
    const onSelectFaq=(record,vv)=>{
            const indx=inquiryFaqList.findIndex(ob=>ob.faq==vv.value)
            if(indx!=-1){
                inquiryFaqList[indx].selected=vv.checked
                if(!inquiryFaqList[indx].selected)inquiryFaqList[indx].comment=''
            }
    }
    let loading=false
    const removeCommentForInquiry=async()=>{
            const option={
                method: 'DELETE',mode: 'cors',
                headers: {'Content-Type': 'application/json'}
            }
            const res = await fetch(`${apiUrl}/inquery/${$page.params.id}/comment/${$isAuth.id}`,setHeader(option))
            const result = await res.json()
            console.log(result)
    }
    const insertRecord=async()=>{
        loading=true
        try{           
            const dt={
                    f_user_id:$isAuth.id                    
                }
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(dt)
            }
            await fetch(`${apiUrl}/inquery/${$page.params.id}/branchhandled/`,setHeader(option))
            const dt1_1=[]
            inquiryFaqList.forEach(rr=>{
                if(rr.selected && rr.selected==true)
                    dt1_1.push({
                        f_inquiry_id:$page.params.id,
                        f_inquiryhandled_id:$isAuth.id,
                        f_faq_id:rr.id,
                        remarks:rr.comment
                    })
            })
            const option1={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(dt1_1)
            }
            const res1 = await fetch(`${apiUrl}/inquery/comment`,setHeader(option1))
            const result1 = await res1.json()
            console.log('****',result1);
            loading=false   
            browser && alert("Submitted Successfully")
            goto('/admin')
        }catch(error){
            console.log(error)
            loading=false
        }
    }
    const loadFAQList=async()=>{
        try{
            const rr=await fetch(`${apiUrl}/inquery/${$page.params.id}/comment/${$isAuth.id}`)
            const commentList=await rr.json()
            const url1=`${apiUrl}/inquery/inquiryfaq`
            let inquiryFaqList_temp=null
            const resp=await fetch(url1)
            if(resp.status==200){
                inquiryFaqList_temp=await resp.json()
                inquiryFaqList_temp.forEach(record => {
                    let flagFound=false
                    commentList.forEach(temp=>{
                        if(temp.f_faq_id==record.id) {
                            record.selected=true
                            record.comment=temp.remarks
                            flagFound=true
                        }
                    })
                    if(!flagFound){
                        record.selected=false
                        record.comment=''
                    }
                });               
            }
            inquiryFaqList=inquiryFaqList_temp
        }catch(error1){
            console.log('****',error1)
        }
    }   
    const onSubmit=(ee)=>{ 
        removeCommentForInquiry()
        insertRecord()
        goto('/admin')          
    }    
    const closeInquiry=async()=>{
        loading=true
        try{           
            const dt={
                    is_closed:1,	
                    f_closed_by:$isAuth.id                    
                }
            const option={
                method: 'PATCH',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(dt)        
            }
            await fetch(`${apiUrl}/inquery/${$page.params.id}`,setHeader(option))            

            loading=false
        }catch(error1){
            console.log(error1)
            loading=false
        }
    }
    const onSubmitWithClose=(ee)=>{
        removeCommentForInquiry()
        insertRecord()
        closeInquiry()
        goto('/admin')
    }
    onMount(async()=>{
        try{
            const rr=await fetch(`${apiUrl}/inquery/${$page.params.id}`)
            const dt=await rr.json()
            fullname=dt[0].name
            loadFAQList()
        }
        catch(error){
            console.log(error);
        }
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
        <h1 class="">{fullname}({$page.params.id})</h1>
    </div>
    <form class="mt-2 p-2">
        {#each inquiryFaqList as record}
            <div class="flex flex-col p-1 border-b gap-2">
                <div>
                    <input bind:checked="{record.selected}" on:input={ee=>onSelectFaq(record,ee.target)} value={record.faq} type="checkbox" id={record.faq}>
                    <label class="ml-2" for={record.faq}>{record.faq}</label>
                </div>
                {#if record.selected && record.selected==true}
                    <input bind:value={record.comment} type="text">
                {/if}
            </div>
        {/each}

        <div class="mt-2 p-2 flex gap-2 justify-end">
            <button on:click="{onSubmit}" class="mt-2 w-52 bg-green-400 text-white px-2 py-1 hover:bg-green-500 rounded" type="button">
                Submit
            </button>
            <button on:click="{onSubmitWithClose}" class="mt-2 w-52 bg-amber-400 text-white px-2 py-1 hover:bg-amber-500 rounded" type="button">Submit & Close Inquiry</button>
        </div>
    </form>
</div>


