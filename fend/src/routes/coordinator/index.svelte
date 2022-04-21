<script>
    import { browser } from '$app/env'
    import {isAuth} from '$lib/../store'
    import Inquirylist from '$lib/inquiry/inquirylist.svelte'
    import Login from '$lib/login.svelte'
</script>

<div>    
    {#if browser && $isAuth && $isAuth.user_type==0}
        <Inquirylist/>
    {:else}
        <Login/>
    {/if}
</div>



