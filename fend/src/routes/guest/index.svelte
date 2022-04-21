<script>
//
// @ts-ignore
import pg from 'lodash'
const {sortBy,uniqBy,filter,remove} =pg
import { onMount } from "svelte";
import {setHeader} from "$lib/../store"
import { goto } from '$app/navigation';
import { browser } from '$app/env';
import Modal from '$lib/modal.svelte';
import list from '$lib/../../static/cities.json'
const apiUrl=import.meta.env.VITE_API_URL
    let loading=false

    let stateList=sortBy(uniqBy(list,'state'),'state')
    let state='Gujarat'
    let cityList=sortBy(filter(list,ob=>ob.state==state),'name')
    let courseList=[]
    let branchList=[]
    let selected_course_id=-1
    let isOpen=false
    let mesg=""
    let categoryList=[
        "Open",
        "SEBC",
        "SC/ST",
        "Other"
    ]
    let preffered_time_list=[
    "10:00 A.M. to 11:00 A.M.",
    "11:00 A.M. to 12:00 P.M.",
    "12:00 P.M. to 01:00 P.M.",
    "01:00 P.M. to 02:00 P.M.",
    "02:00 P.M. to 03:00 P.M.",
    "03:00 P.M. to 04:00 P.M.",
    ]
    let inquiry={
        id:0,
        name:"",
        email:"",
        address:"",
        city:"",
        mobile:"",
        whatsapp_number:"",
        board_uni:"",
        passingyear:"",
        pre_branch:"",
        result:"",
        is_counselling_req:true,
        counselling_type:0,
        preffered_date:new Date(),
        preffered_time:"",
        is_closed:false,
        f_closed_by:-1,
        admission_category:'Open',
        reference_name:'',
        preferredBranchList:[]        
    }
    let selectedPreferredBranch=null
    $:{
        if(selected_course_id){
            fetchBranchList()
        }
    }  
    $:{
        if(state)
             cityList=sortBy(filter(list,ob=>ob.state==state),'name')
    }
    const fetchDetail=async ()=>{
        loading=true
        try{            
            const res = await fetch(`${apiUrl}/course`);
            courseList = await res.json();            
            loading=false   
        }catch(error){
            loading=false
        }
    }
    const fetchBranchList=async ()=>{
        loading=true
        try{    
                const res = await fetch(`${apiUrl}/course/${selected_course_id}/branch`);
                branchList = await res.json(); 
                loading=false   
        }catch(error){
            loading=false
        }
    }
    const onSubmit=async()=>{
        if(!inquiry.preferredBranchList || inquiry.preferredBranchList.length<=0){
            alert('Please, Select Your Preffred Branch(es) According to Your Priority')
            return
        }
        loading=true
        try{            
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(inquiry)
            }
            const res = await fetch(`${apiUrl}/inquery`,setHeader(option))
            const result = await res.json()
            console.log(result);
            loading=false   
            browser && alert("Submitted Successfully")
            goto('https://www.svitvasad.ac.in/')
        }catch(error){
            loading=false
            console.log(error)
        }
    }


    const insertBranch=(event)=>{
        if(inquiry.preferredBranchList && inquiry.preferredBranchList.findIndex(ob=>ob==selectedPreferredBranch)==-1)   
        {             
            const temp=branchList.find(ob=>ob.id==event.target.value)
            inquiry.preferredBranchList=[...inquiry.preferredBranchList,temp] //....
        }
    }
    const removePreferredBranch=(indx)=>{        
        let temp=[...inquiry.preferredBranchList]//....
        remove(temp,ob=>{
            return ob.id==indx
        })
        inquiry.preferredBranchList=[...temp]//....        
    }
    const handleMobile=async()=>{     
        const regexExp = /^[6-9]\d{9}$/gi;
        if(!regexExp.test(inquiry.mobile)){
            alert("Please Enter Valid Contact Number.");
            return
        }
        loading=true
        let found=false
        try{    
                const res = await fetch(`${apiUrl}/inquery/contactexist?mobile=${inquiry.mobile}`);
                const dt = await res.json();
                found=dt.found 
                loading=false                   
        }catch(error){
            loading=false
            return null
        }
        if(found){
            mesg=`You have already submitted inquiry with ${inquiry.mobile}.`
            isOpen=true
            return
        }
        inquiry.whatsapp_number=inquiry.mobile
    }
    onMount(() => {
       fetchDetail()	
       fetchBranchList()    
    });
</script>
{#if loading}
    <div class="absolute left-0 top-1/2 w-full h-48 bg-blue-500 text-white z-10 text-4xl opacity-50 text-center">
        <p class="relative top-1/2">Loading....</p>
    </div>    
{/if}
<form on:submit|preventDefault={onSubmit} class="p-2 flex flex-col gap-2 mx-auto w-4/5">    
    <div class="field-group">
        <div class="field">
            <label for="name">Full Name*</label>
            <input type="text" id="name" class="w-full" bind:value={inquiry.name} required>
        </div>
    </div>
    <div class="field-group">
        <div class="field">
            <label for="email">Email*</label>
            <input type="email" id="email" bind:value={inquiry.email} required>
        </div>
        <div class="field">
            <label for="mobilenumber">Mobile Number*</label>
            <input on:blur={ee=>{handleMobile()}} type="text" id="mobilenumber" bind:value={inquiry.mobile} required>
        </div>
        <div class="field">
            <label for="name">WhatsApp Number</label>
            <input type="text" id="name" bind:value={inquiry.whatsapp_number}>
        </div>            
    </div>    
    <div class="field-group">
        <div class="field">
            <label for="addr">Address</label>
            <textarea id="addr" class="w-full" bind:value={inquiry.address}></textarea>    
        </div>
    </div>
    <div class="field-group">
        <div class="field">
            <label for="state">State*</label>
            <select id="state" bind:value={state}>
                {#each stateList as record}
                <option value={record.state}>{record.state}</option>
                {/each}
            </select>
        </div>
        <div class="field">
            <label for="city">City*</label>
            <select id="state" bind:value={inquiry.city}>                
                <option value="-"></option>
                {#each cityList as record}
                <option value={record.name}>{record.name}</option>
                {/each}
            </select>
        </div>
        <div class="field">
            <label for="">Other City(If Not in a City List)</label>
            <input type="text" bind:value="{inquiry.city}" class="mt-2" placeholder="If Any Other City Specify Here" required>            
        </div>
        </div>
   <div class="field-group">
        <div class="field">
            <label for="course">Select Course*</label>

            <select id="course" bind:value={selected_course_id}>
                <option value="-1"></option>
                {#each courseList as course}
                <option value={course.id}>{course.course_name}</option>
                {/each}
            </select>
        </div>        
        <div class="field md:w-1/2">
            <label for="category">Select Category</label>
            <select id="category" bind:value={inquiry.admission_category}>
                <option value="-1"></option>
                {#each categoryList as category}
                <option value={category}>{category}</option>
                {/each}
            </select>
        </div>
    </div>     
   {#if selected_course_id!=-1}    
    <div class="field-group">
        <div class="field">
            <label for="branch">Select Preferred Branch(es) According to Your Priority* (તમારી પ્રાધાન્યતા અનુસાર શાખાઓ પસંદ કરો)</label>            
            <select on:change={(event)=>insertBranch(event)} bind:value={selectedPreferredBranch} id="branch">
                <option value="-1"></option>
                {#each branchList as branch}
                <option value={branch.id}>{branch.branch_name}</option>
                {/each}
            </select>
        </div>        
    </div>
    <div>
        <table class="w-full">
            <tr class="bg-gray-400 text-white p-1"><th class="border w-14 p-2">Priority</th><th class="border p-2">Branch Name</th><th class="border p-2"></th></tr>
            {#each inquiry.preferredBranchList as preferredBranch,indx (indx)}
            <tr class="text-center">
                <td class="border p-2">{indx+1}</td>
                <td class="border p-2">{preferredBranch.branch_name}</td> 
                <td class="border w-4 p-2">
                    <button on:click={()=>removePreferredBranch(preferredBranch.id)} class="bg-red-500 text-white px-4 py-0 hover:bg-red-400 w-full rounded text-xl" type="button">-</button>
                </td>
            </tr>
        {/each}
        </table>
    </div>    
{/if}
    <h1 class="text-xl text-slate-800 w-full mt-4 py-2 border-teal-800 border-t">Past Academic Information</h1>
    <div class="field-group">
        <div class="field">
            <label for="bu">Board/University</label>
            <input type="text" id="bu" bind:value="{inquiry.board_uni}">
        </div>
        <div class="field md:w-1/4">
            <label for="passingyr">Passing Year</label>
            <input type="text" id="passingyr" bind:value={inquiry.passingyear}>
        </div>
        <div class="field md:w-1/4">
            <label for="pbranch">Stream/Branch</label>
            <input type="text" id="pbranch" bind:value="{inquiry.pre_branch}">
        </div>
        <div class="field md:w-1/4">
            <label for="presult">Result</label>
            <input type="text" id="presult" bind:value="{inquiry.result}">
        </div>
    </div>   
    <div class="my-4 border-teal-800 border-t"></div>
    <!-- <div class="mb-4 px-2 field-group">
        <div class="field">
            <span class="field flex-row">
                <input type="checkbox" class="mr-2 h-5 w-5" bind:checked="{inquiry.is_counselling_req}"  id="is_couselling" >                
                <label for="is_couselling">Is Counselling Required? (અમારા પ્રતિનિધિ સાથે વાત કરવા માંગો છો?)</label>
            </span>
        </div>
    </div> -->
    {#if inquiry.is_counselling_req}
    <div>
        <div class="field">
            <span class="field flex-row">
            <label class="p-2 text-xl" for="is_online">
                <input type="radio" bind:group={inquiry.counselling_type} name="is_offline" id="is_online" value={1}>
                Online (ફોન દ્વારા માહિતી જોઈએ છે?)
            </label>
            <label class="p-2 text-xl" for="is_offline">
            <input type="radio" bind:group={inquiry.counselling_type} name="is_offline" id="is_offline" value={0}>
            Offline (રૂબરૂ કોલેજની મુલાકાત કરવા માંગો છો?)</label>
            </span>
        </div>
    </div>
    {/if}
    {#if inquiry.is_counselling_req}
    <div class="my-4 border-teal-800 border-t"></div>

    {#if inquiry.counselling_type==0}
        <p class="bg-slate-500 text-white font-bold text-center text-xl p-2 rounded">Please, Contact During College Timings (કૃપા કરીને કૉલેજ સમય દરમિયાન સંપર્ક કરો)
        <br/>10:00 am to 04:30 pm (સવારે 10:00 થી સાંજે 04:30 વાગ્યા સુધી)</p>
    {:else}
        <div class="field-group">
            <div class="field p-2">
                <label for="counselling_dt">Counselling Date(Preferred)</label>
                <input type="date" id="counselling_dt" bind:value="{inquiry.preffered_date}">
            </div>
            <div class="field">
                <label for="counselling_tt">Counselling Time(Preferred)</label>
                <select id="counselling_tt" bind:value="{inquiry.preffered_time}">
                    <option value="-1"></option>
                    {#each preffered_time_list as pt}
                    <option value={pt}>{pt}</option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}
    {/if}
    <div class="my-4 border-teal-800 border-t"></div>
    <div class="flex flex-row justify-center gap-2 py-2">
        <button class="bg-blue-500 text-white w-1/4 hover:bg-blue-400 py-2 px-4 rounded" type="submit">SUBMIT</button>
        <button class="bg-gray-500 text-white w-1/4 hover:bg-gray-400 py-2 px-4 rounded" type="reset">CLEAR</button>
    </div>
</form>
{#if isOpen}
<Modal mesg={mesg} on:close={()=>{isOpen=false}}/>
{/if}


