<script>
import { page } from "$app/stores";
import { setHeader } from "$lib/../store"
import { onMount } from "svelte";    
const apiUrl = import.meta.env.VITE_API_URL
    
    class UserDetail{
        constructor(){
            this.id=0;
            this.username='';
            this.password='';
            this.email='';
        
            this.mobile='';
            this.f_dept_id=-1;        
            this.user_type=1;
        }
    }
    let loading=false
    let confirmPwd=''
    let userDetail={}
    let deptList=[]
    const insertUserDetail=async()=>{
        const url1=`${apiUrl}/deptdetail`
        try{
            loading=true
            const option={
                method: 'POST',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(userDetail)
            }
            const res = await fetch(url1,setHeader(option))
            await res.json();
            alert("User Record Submitted Successfully")
            loading=false
            userDetail=new UserDetail()
        }catch(error){
            console.log('****',error)
            alert(error)
            loading=false
        }
    }
    const updateUserDetailById=async()=>{
        const url1=`${apiUrl}/deptdetail`
        try{
            loading=true
            const option={
                method: 'PUT',mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(userDetail)
            }
            const res = await fetch(url1,setHeader(option))
            await res.json()
            userDetail=new UserDetail()
            loading=false
        }catch(error){
            alert(error)
            console.log('****',error)
            loading=false
        }
    }
    const onSubmit=()=>{
        if(!comparePwd())
            return
        if(parseInt($page.params.id)==-1)
            insertUserDetail()
        else
            updateUserDetailById()
    }
    const loadUserDetailById=async(id)=>{
        const url1=`${apiUrl}/user/${id}`
        try{
            loading=true
            const res = await fetch(url1)
            const dt = await res.json()
            userDetail=dt[0]
            userDetail.password=''
            loading=false
        }catch(error){
            console.log('****',error)
            loading=false
        }
    }
    const comparePwd=()=>{
        if(userDetail.password!=confirmPwd){
            alert('Password Not Matching')
            return false
        }
        return true
    }
    const fetchDeptList=async ()=>{
        loading=true
        try{    
                const res = await fetch(`${apiUrl}/dept`)
                deptList = await res.json()
                loading=false   
        }catch(error){            
            loading=false
        }
    }
    onMount(async()=>{           
        let userId=$page.params.id
        fetchDeptList()
        if(parseInt(userId) == -1){                        
            userDetail=new UserDetail()
        }
        else{
            loadUserDetailById(userId)
        }
    })
</script>


<div>   
    <h1 class="bg-sky-400 text-white w-100 text-2xl mt-2 p-1 rounded">{($page.params.id==-1)?`Add User Detail`:`Update User Detail With ID:${$page.params.id}`}</h1>  
    {#if loading}        
        <div class="my-8 h-100 text-4xl w-full text-orange-700 text-center">Loading....</div>
    {/if}
    <div>
        <form on:submit|preventDefault={onSubmit} class="p-2 flex flex-col gap-2 mx-auto w-4/5">    
            <div class="field-group">
                <div class="field">
                    <label for="name">User Name*</label>
                    <input type="text" id="name" class="w-full" bind:value={userDetail.username} required>
                </div>
            </div>
            <div class="field-group">
                <div class="field">
                    <label for="pwd1">Password*</label>
                    <input type="password" id="pwd1" bind:value={userDetail.password} required>
                </div>
                <div class="field">                    
                    <label for="confirmpwd">Confirm Password*</label>
                    <input on:blur={comparePwd} type="password" id="confirmpwd" bind:value={confirmPwd} required>
                </div>
            </div>  

            <div class="field-group">
                <div class="field">
                    <label for="email">Email*</label>
                    <input type="email" id="email" bind:value={userDetail.email} required>
                </div>
                <div class="field">
                    <label for="mobilenumber">Mobile Number*</label>
                    <input type="text" id="mobilenumber" bind:value={userDetail.mobile} required>
                </div>
            </div>    
            <div class="field-group">
                <div class="field">
                    <label for="dept">Department*</label>                    
                    <select id="dept" bind:value={userDetail.f_dept_id} required>
                        <option disabled value="-1"></option>
                        {#each deptList as dept,indx (indx)}
                        <option value={dept.id}>{dept.dept_name} ({dept.dept_alias})</option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="field-group">
                <div class="field">
                    <label for="usertype">User Type*</label>
                    <select id="usertype" bind:value={userDetail.user_type} required>
                        <option disabled value="-1"></option>
                        <option value={0}>Admin</option>
                        <option value={1}>Coordinator</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-row justify-center gap-2 py-2">
                <button class="bg-blue-500 text-white w-1/4 hover:bg-blue-400 py-2 px-4 rounded" type="submit">SUBMIT</button>
                <button class="bg-gray-500 text-white w-1/4 hover:bg-gray-400 py-2 px-4 rounded" type="reset">CLEAR</button>
            </div>
        </form>
    </div>
</div>   