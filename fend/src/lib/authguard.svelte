<script>
import { isAuth } from "$lib/../store";

</script>
{#if $isAuth}
	<slot name="auth"></slot>
{:else if $isAuth && $isAuth.user_type==0}
	<slot name="admin"></slot>
{:else if $isAuth && $isAuth.user_type==1}
	<slot name="coordinator"></slot>
{:else}


<slot name="guest"></slot>
{/if}




