<script context="module">
    const apiUrl=import.meta.env.VITE_API_URL
    
    export async function load({params,fetch}){
        const id=params.id
        const url1=`${apiUrl}/inquery/detailed/${id}`
        const resp=await fetch(url1)
        return {
            status:resp.status,
            props:{
                studentDetail:resp.status==200 && (await resp.json())
            }
        }
    }
</script>

<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { isAuth,getUserName } from "$lib/../store";
export let studentDetail
const personalDetail=[    
    {field:'id',label:"ID"},
    {field:'name',label:"NAME"},
    {field:'address',label:"ADDRESS"},
    {field:'city',label:"CITY"},
    {field:'mobile',label:"CONTACT NUMBER"},
    {field:'whatsapp_number',label:"WHATSAPP NUMBER"},
    {field:'email',label:"EMAIL"},    
    {field:"admission_category",label:"ADMISSION CATEGORY"}
    ]
    const eduDetail=[    
    {field:'board_uni',label:"BOARD/UNIVERSITY"},
    {field:'passingyear',label:"YEAR OF PASSING"},
    {field:'pre_branch',label:"STREAM/BRANCH"},
    {field:'result',label:"RESULT"},
    ]
    const onComment=()=>{

        goto(`/studentdetail/comment_${$page.params.id}`)
    }    
</script>

<div class="w-full ">
    <div class="bg-sky-400 text-white text-2xl w-full mt-2 p-1 rounded flex flex-row justify-between items-center">
        <h1>Student Detail</h1>
        {#if $isAuth.user_type==0}
            <button on:click={ee=>{goto(`/studentdetail/commentdlg_${$page.params.id}`)}} class="border text-sm bg-green-400 px-2 py-1 rounded hover:bg-green-500">View Comment(s)</button>
        {:else}
            {#if studentDetail.is_closed==1}
                    {#await getUserName(studentDetail.f_closed_by)}
                        <span>Loading....</span>
                    {:then dt}
                        <span class="{studentDetail.is_closed==1?'':'hidden'} pr-2"><b>Inquiry Closed By</b> <i>{dt[0]?.username}</i></span>
                    {/await}
            {:else}
                <button on:click={ee=>{onComment()}} class="border text-sm bg-green-400 px-2 py-1 rounded hover:bg-green-500">Inquiry Comment</button>
            {/if}
        {/if}
    </div>
    <div class="mt-2 mx-auto shadow-lg border rounded w-4/5">
        <h1 class="bg-amber-400 w-100 text-xl p-1 rounded-t">Personal Detail</h1>
        {#each personalDetail as record,indx}
            <div class="flex flex-col md:flex-row gap-2 border-b p-2">
                <div class="md:w-1/4 w-full text-center md:text-right font-bold px-2">{record.label}</div> 
                <div class="text-center">{studentDetail[record.field]}</div>
            </div>
        {/each}
    </div>
    <div class="mt-2 mx-auto shadow-lg border rounded w-4/5">
        <h1 class="bg-amber-400 w-100 text-xl p-1 rounded-t">Educational Detail</h1>
        {#each eduDetail as record,indx}
            <div class="flex  flex-col md:flex-row gap-2 border-b p-2">
                <div class="md:w-1/4 w-full text-center md:text-right font-bold px-2">{record.label}</div> 
                <div class="text-center">{studentDetail[record.field]}</div>
            </div>
        {/each}
    </div>
    <div class="mt-2 mx-auto shadow-lg border rounded w-4/5">
        <h1 class="bg-amber-400 w-100 text-xl p-1 rounded-t">Preferred Bradnch(es)</h1>

        <div class="flex flex-col gap-2 border-b p-2">
            {#each studentDetail['preferredBranchList'] as record,indx}
                <div class="p-2 w-full border-b">
                    {record.priority} -
                    {record.branch_name}({record.branch_alias})
                </div>
            {/each}
        </div>
    </div>
</div>

