var c=Object.defineProperty,l=Object.defineProperties;var u=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var n=(a,t,e)=>t in a?c(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,s=(a,t)=>{for(var e in t||(t={}))p.call(t,e)&&n(a,e,t[e]);if(o)for(var e of o(t))d.call(t,e)&&n(a,e,t[e]);return a},i=(a,t)=>l(a,u(t));import{D as g}from"./vendor-687c3837.js";const h="http://103.85.229.82:4400/dbapi",w=g(JSON.parse(localStorage.getItem("userdetail"))||null);w.subscribe(a=>{localStorage.userdetail=JSON.stringify(a)});const f=(a={})=>{const t=s({},a),e=JSON.parse(localStorage.getItem("userdetail"));return e&&e.jwt_&&(t.headers=i(s({},t.headers),{"Content-Type":"application/json",authorization:`Bearer ${e?e.jwt_:""}`})),t},m=async a=>{const t=`${h}/user/${a}`,e=await fetch(t),r=await e.json();if(e.status==200)return r;throw new Error(r)};export{m as g,w as i,f as s};
