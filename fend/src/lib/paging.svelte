<script>
    import { createEventDispatcher } from "svelte/internal";

    export let paging
    let dispatch=createEventDispatcher()
</script>
<div class="flex justify-between w-full p-1">

    <p class="text-sm pt-1">Showing {(paging.currPage-1)*paging.perPage+1} to {(paging.currPage!=paging.totalPage)?((paging.currPage-1)*paging.perPage+paging.perPage):paging.totalRecord}  of {paging.totalRecord} records</p>
    <div class="flex text-sm gap-2">
        <button on:click={ee=>{dispatch('prev',ee.detail)}} class="button" disabled={paging.currPage==1?true:false} >&#x2190; Prev</button>
        <button on:click={ee=>{dispatch('next',ee.detail)}} class="button" disabled={paging.currPage==paging.totalPage?true:false} >Next &#x2192;</button>
    </div>
</div>





