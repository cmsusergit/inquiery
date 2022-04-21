<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let mesg = "" 
</script>
<div class="bg-gray-400 fixed top-0 left-0 w-screen h-screen opacity-80 flex justify-center items-center p-12">
    <div class="bg-white rounded p-4 w-1/4 text-justify">
    <div class="flex flex-col gap-4 text-center justify-center">
        <p>{mesg}</p>
        <div class="text-center w-full">
        <button on:click="{ee=>{dispatch('close')}}" class="mt-2 border-t bg-red-400 text-white px-4 py-2 rounded">Close</button></div>
    </div>
</div>
</div>