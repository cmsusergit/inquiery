<script>
    import { browser } from '$app/env'
    import {isAuth} from '$lib/../store'
    import AdminDashboard from '$lib/inquiry/admin_dashboard.svelte'
    import Inquirylist from '$lib/inquiry/inquirylist.svelte'
import Login from '$lib/login.svelte'
</script>
<div>    
    {#if browser && $isAuth}
        {#if $isAuth.user_type==0}
            <AdminDashboard/>
        {:else}

            <Inquirylist/>
        {/if}
    {:else}
        <Login/>
    {/if}
</div> 


