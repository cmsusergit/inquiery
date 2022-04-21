import { browser } from '$app/env'
import { writable } from 'svelte/store'

const apiUrl=import.meta.env.VITE_API_URL
export const isAuth = writable(browser && (JSON.parse(localStorage.getItem('userdetail'))||null))
isAuth.subscribe((value) =>{
        if(browser)
            localStorage.userdetail = JSON.stringify(value)
    }
)
export const setHeader=(hOption={})=>{
    const update={...hOption} //....
    //....
    
    if(!browser)
        return update
    const credential=JSON.parse(localStorage.getItem('userdetail'))
    if(credential && credential.jwt_){
        update.headers={...update.headers,
            'Content-Type': 'application/json',
            'authorization':`Bearer ${credential?credential.jwt_:''}`        
        }
    }
    return update
}







export const getUserName=async(id)=>{
    const url1=`${apiUrl}/user/${id}`
    const res = await fetch(url1);
		const ob = await res.json();
		if (res.status==200) {
			return ob
		} else {
			throw new Error(ob)
		}
}



































