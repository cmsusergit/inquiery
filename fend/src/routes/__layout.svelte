<script>
    import "../styles/tailwind-output.css"
    import '../app.css'
    import Header from "$lib/header.svelte"
    import Menu from "$lib/menu.svelte"
    import Foot from "$lib/foot.svelte"
    import Authguard from "$lib/authguard.svelte"
</script>

<div class="flex flex-col mx-auto my-2 md:w-10/12 w-11/12"> 
    <Header/>    
    <Authguard>

        <div slot="auth">
            <Menu/>
        </div>
    </Authguard>
    <div class="container min-h-screen px-5 py-2 mx-auto">
        <slot></slot>
    </div>
    <Foot/>
</div>


