import{S as wt,i as gt,s as It,e as r,t as g,c as a,a as n,h as I,d as o,b as s,g as Ke,G as e,j as ze,k as y,m as w,Z as _t,$ as j,_ as Te,H as R,aa as Dt,a5 as Ut,I as ht,X as Tt,M as Lt,v as Nt,ad as Pt,a0 as vt}from"../../../chunks/vendor-687c3837.js";import{p as Ot}from"../../../chunks/stores-39e70469.js";import{s as mt}from"../../../chunks/store-6cd925d3.js";function bt(u,d,t){const f=u.slice();return f[20]=d[t],f[22]=t,f}function Et(u){let d,t;return{c(){d=r("div"),t=g("Loading...."),this.h()},l(f){d=a(f,"DIV",{class:!0});var m=n(d);t=I(m,"Loading...."),m.forEach(o),this.h()},h(){s(d,"class","my-8 h-100 text-4xl w-full text-orange-700 text-center")},m(f,m){Ke(f,d,m),e(d,t)},d(f){f&&o(d)}}}function yt(u,d){let t,f=d[20].dept_name+"",m,V,c=d[20].dept_alias+"",D,l,h;return{key:u,first:null,c(){t=r("option"),m=g(f),V=g(" ("),D=g(c),l=g(")"),this.h()},l(b){t=a(b,"OPTION",{});var v=n(t);m=I(v,f),V=I(v," ("),D=I(v,c),l=I(v,")"),v.forEach(o),this.h()},h(){t.__value=h=d[20].id,t.value=t.__value,this.first=t},m(b,v){Ke(b,t,v),e(t,m),e(t,V),e(t,D),e(t,l)},p(b,v){d=b,v&8&&f!==(f=d[20].dept_name+"")&&ze(m,f),v&8&&c!==(c=d[20].dept_alias+"")&&ze(D,c),v&8&&h!==(h=d[20].id)&&(t.__value=h,t.value=t.__value)},d(b){b&&o(t)}}}function Vt(u){let d,t,f=u[4].params.id==-1?"Add User Detail":`Update User Detail With ID:${u[4].params.id}`,m,V,c,D,l,h,b,v,ie,ne,T,ue,A,S,H,de,fe,P,pe,_,E,J,ce,B,Le,W,F,te,Ne,Pe,C,Oe,G,le,Ve,Be,M,ke,se,X,re,Ae,Se,L,Z,k=[],Qe=new Map,Ce,ae,z,oe,Me,je,N,K,Q,qe,Y,Re,He,x,$,Je,We,ee,Fe,Ge,Ye,U=u[0]&&Et(),_e=u[3];const xe=i=>i[22];for(let i=0;i<_e.length;i+=1){let p=bt(u,_e,i),q=xe(p);Qe.set(q,k[i]=yt(q,p))}return{c(){d=r("div"),t=r("h1"),m=g(f),V=y(),U&&U.c(),c=y(),D=r("div"),l=r("form"),h=r("div"),b=r("div"),v=r("label"),ie=g("User Name*"),ne=y(),T=r("input"),ue=y(),A=r("div"),S=r("div"),H=r("label"),de=g("Password*"),fe=y(),P=r("input"),pe=y(),_=r("div"),E=r("label"),J=g("Confirm Password*"),ce=y(),B=r("input"),Le=y(),W=r("div"),F=r("div"),te=r("label"),Ne=g("Email*"),Pe=y(),C=r("input"),Oe=y(),G=r("div"),le=r("label"),Ve=g("Mobile Number*"),Be=y(),M=r("input"),ke=y(),se=r("div"),X=r("div"),re=r("label"),Ae=g("Department*"),Se=y(),L=r("select"),Z=r("option");for(let i=0;i<k.length;i+=1)k[i].c();Ce=y(),ae=r("div"),z=r("div"),oe=r("label"),Me=g("User Type*"),je=y(),N=r("select"),K=r("option"),Q=r("option"),qe=g("Admin"),Y=r("option"),Re=g("Coordinator"),He=y(),x=r("div"),$=r("button"),Je=g("SUBMIT"),We=y(),ee=r("button"),Fe=g("CLEAR"),this.h()},l(i){d=a(i,"DIV",{});var p=n(d);t=a(p,"H1",{class:!0});var q=n(t);m=I(q,f),q.forEach(o),V=w(p),U&&U.l(p),c=w(p),D=a(p,"DIV",{});var $e=n(D);l=a($e,"FORM",{class:!0});var O=n(l);h=a(O,"DIV",{class:!0});var et=n(h);b=a(et,"DIV",{class:!0});var he=n(b);v=a(he,"LABEL",{for:!0});var tt=n(v);ie=I(tt,"User Name*"),tt.forEach(o),ne=w(he),T=a(he,"INPUT",{type:!0,id:!0,class:!0}),he.forEach(o),et.forEach(o),ue=w(O),A=a(O,"DIV",{class:!0});var ve=n(A);S=a(ve,"DIV",{class:!0});var me=n(S);H=a(me,"LABEL",{for:!0});var lt=n(H);de=I(lt,"Password*"),lt.forEach(o),fe=w(me),P=a(me,"INPUT",{type:!0,id:!0}),me.forEach(o),pe=w(ve),_=a(ve,"DIV",{class:!0});var be=n(_);E=a(be,"LABEL",{for:!0});var st=n(E);J=I(st,"Confirm Password*"),st.forEach(o),ce=w(be),B=a(be,"INPUT",{type:!0,id:!0}),be.forEach(o),ve.forEach(o),Le=w(O),W=a(O,"DIV",{class:!0});var Ee=n(W);F=a(Ee,"DIV",{class:!0});var ye=n(F);te=a(ye,"LABEL",{for:!0});var rt=n(te);Ne=I(rt,"Email*"),rt.forEach(o),Pe=w(ye),C=a(ye,"INPUT",{type:!0,id:!0}),ye.forEach(o),Oe=w(Ee),G=a(Ee,"DIV",{class:!0});var we=n(G);le=a(we,"LABEL",{for:!0});var at=n(le);Ve=I(at,"Mobile Number*"),at.forEach(o),Be=w(we),M=a(we,"INPUT",{type:!0,id:!0}),we.forEach(o),Ee.forEach(o),ke=w(O),se=a(O,"DIV",{class:!0});var ot=n(se);X=a(ot,"DIV",{class:!0});var ge=n(X);re=a(ge,"LABEL",{for:!0});var it=n(re);Ae=I(it,"Department*"),it.forEach(o),Se=w(ge),L=a(ge,"SELECT",{id:!0});var Xe=n(L);Z=a(Xe,"OPTION",{}),n(Z).forEach(o);for(let Ze=0;Ze<k.length;Ze+=1)k[Ze].l(Xe);Xe.forEach(o),ge.forEach(o),ot.forEach(o),Ce=w(O),ae=a(O,"DIV",{class:!0});var nt=n(ae);z=a(nt,"DIV",{class:!0});var Ie=n(z);oe=a(Ie,"LABEL",{for:!0});var ut=n(oe);Me=I(ut,"User Type*"),ut.forEach(o),je=w(Ie),N=a(Ie,"SELECT",{id:!0});var De=n(N);K=a(De,"OPTION",{}),n(K).forEach(o),Q=a(De,"OPTION",{});var dt=n(Q);qe=I(dt,"Admin"),dt.forEach(o),Y=a(De,"OPTION",{});var ft=n(Y);Re=I(ft,"Coordinator"),ft.forEach(o),De.forEach(o),Ie.forEach(o),nt.forEach(o),He=w(O),x=a(O,"DIV",{class:!0});var Ue=n(x);$=a(Ue,"BUTTON",{class:!0,type:!0});var pt=n($);Je=I(pt,"SUBMIT"),pt.forEach(o),We=w(Ue),ee=a(Ue,"BUTTON",{class:!0,type:!0});var ct=n(ee);Fe=I(ct,"CLEAR"),ct.forEach(o),Ue.forEach(o),O.forEach(o),$e.forEach(o),p.forEach(o),this.h()},h(){s(t,"class","bg-sky-400 text-white w-100 text-2xl mt-2 p-1 rounded"),s(v,"for","name"),s(T,"type","text"),s(T,"id","name"),s(T,"class","w-full"),T.required=!0,s(b,"class","field"),s(h,"class","field-group"),s(H,"for","pwd1"),s(P,"type","password"),s(P,"id","pwd1"),P.required=!0,s(S,"class","field"),s(E,"for","confirmpwd"),s(B,"type","password"),s(B,"id","confirmpwd"),B.required=!0,s(_,"class","field"),s(A,"class","field-group"),s(te,"for","email"),s(C,"type","email"),s(C,"id","email"),C.required=!0,s(F,"class","field"),s(le,"for","mobilenumber"),s(M,"type","text"),s(M,"id","mobilenumber"),M.required=!0,s(G,"class","field"),s(W,"class","field-group"),s(re,"for","dept"),Z.disabled=!0,Z.__value="-1",Z.value=Z.__value,s(L,"id","dept"),L.required=!0,u[2].f_dept_id===void 0&&_t(()=>u[12].call(L)),s(X,"class","field"),s(se,"class","field-group"),s(oe,"for","usertype"),K.disabled=!0,K.__value="-1",K.value=K.__value,Q.__value=0,Q.value=Q.__value,Y.__value=1,Y.value=Y.__value,s(N,"id","usertype"),N.required=!0,u[2].user_type===void 0&&_t(()=>u[13].call(N)),s(z,"class","field"),s(ae,"class","field-group"),s($,"class","bg-blue-500 text-white w-1/4 hover:bg-blue-400 py-2 px-4 rounded"),s($,"type","submit"),s(ee,"class","bg-gray-500 text-white w-1/4 hover:bg-gray-400 py-2 px-4 rounded"),s(ee,"type","reset"),s(x,"class","flex flex-row justify-center gap-2 py-2"),s(l,"class","p-2 flex flex-col gap-2 mx-auto w-4/5")},m(i,p){Ke(i,d,p),e(d,t),e(t,m),e(d,V),U&&U.m(d,null),e(d,c),e(d,D),e(D,l),e(l,h),e(h,b),e(b,v),e(v,ie),e(b,ne),e(b,T),j(T,u[2].username),e(l,ue),e(l,A),e(A,S),e(S,H),e(H,de),e(S,fe),e(S,P),j(P,u[2].password),e(A,pe),e(A,_),e(_,E),e(E,J),e(_,ce),e(_,B),j(B,u[1]),e(l,Le),e(l,W),e(W,F),e(F,te),e(te,Ne),e(F,Pe),e(F,C),j(C,u[2].email),e(W,Oe),e(W,G),e(G,le),e(le,Ve),e(G,Be),e(G,M),j(M,u[2].mobile),e(l,ke),e(l,se),e(se,X),e(X,re),e(re,Ae),e(X,Se),e(X,L),e(L,Z);for(let q=0;q<k.length;q+=1)k[q].m(L,null);Te(L,u[2].f_dept_id),e(l,Ce),e(l,ae),e(ae,z),e(z,oe),e(oe,Me),e(z,je),e(z,N),e(N,K),e(N,Q),e(Q,qe),e(N,Y),e(Y,Re),Te(N,u[2].user_type),e(l,He),e(l,x),e(x,$),e($,Je),e(x,We),e(x,ee),e(ee,Fe),Ge||(Ye=[R(T,"input",u[7]),R(P,"input",u[8]),R(B,"blur",u[6]),R(B,"input",u[9]),R(C,"input",u[10]),R(M,"input",u[11]),R(L,"change",u[12]),R(N,"change",u[13]),R(l,"submit",Dt(u[5]))],Ge=!0)},p(i,[p]){p&16&&f!==(f=i[4].params.id==-1?"Add User Detail":`Update User Detail With ID:${i[4].params.id}`)&&ze(m,f),i[0]?U||(U=Et(),U.c(),U.m(d,c)):U&&(U.d(1),U=null),p&12&&T.value!==i[2].username&&j(T,i[2].username),p&12&&P.value!==i[2].password&&j(P,i[2].password),p&2&&B.value!==i[1]&&j(B,i[1]),p&12&&C.value!==i[2].email&&j(C,i[2].email),p&12&&M.value!==i[2].mobile&&j(M,i[2].mobile),p&8&&(_e=i[3],k=Ut(k,p,xe,1,i,_e,Qe,L,Pt,yt,null,bt)),p&12&&Te(L,i[2].f_dept_id),p&12&&Te(N,i[2].user_type)},i:ht,o:ht,d(i){i&&o(d),U&&U.d();for(let p=0;p<k.length;p+=1)k[p].d();Ge=!1,Tt(Ye)}}}function Bt(u,d,t){let f;Lt(u,Ot,_=>t(4,f=_));const m="http://103.85.229.82:4400/dbapi";class V{constructor(){this.id=0,this.username="",this.password="",this.email="",this.mobile="",this.f_dept_id=-1,this.user_type=1}}let c=!1,D="",l={},h=[];const b=async()=>{const _=`${m}/deptdetail`;try{t(0,c=!0);const E={method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)};await(await fetch(_,mt(E))).json(),alert("User Record Submitted Successfully"),t(0,c=!1),t(2,l=new V)}catch(E){console.log("****",E),alert(E),t(0,c=!1)}},v=async()=>{const _=`${m}/deptdetail`;try{t(0,c=!0);const E={method:"PUT",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)};await(await fetch(_,mt(E))).json(),t(2,l=new V),t(0,c=!1)}catch(E){alert(E),console.log("****",E),t(0,c=!1)}},ie=()=>{!T()||(parseInt(f.params.id)==-1?b():v())},ne=async _=>{const E=`${m}/user/${_}`;try{t(0,c=!0);const ce=await(await fetch(E)).json();t(2,l=ce[0]),t(2,l.password="",l),t(0,c=!1)}catch(J){console.log("****",J),t(0,c=!1)}},T=()=>l.password!=D?(alert("Password Not Matching"),!1):!0,ue=async()=>{t(0,c=!0);try{const _=await fetch(`${m}/dept`);t(3,h=await _.json()),t(0,c=!1)}catch{t(0,c=!1)}};Nt(async()=>{let _=f.params.id;ue(),parseInt(_)==-1?t(2,l=new V):ne(_)});function A(){l.username=this.value,t(2,l),t(3,h)}function S(){l.password=this.value,t(2,l),t(3,h)}function H(){D=this.value,t(1,D)}function de(){l.email=this.value,t(2,l),t(3,h)}function fe(){l.mobile=this.value,t(2,l),t(3,h)}function P(){l.f_dept_id=vt(this),t(2,l),t(3,h)}function pe(){l.user_type=vt(this),t(2,l),t(3,h)}return[c,D,l,h,f,ie,T,A,S,H,de,fe,P,pe]}class Ct extends wt{constructor(d){super();gt(this,d,Bt,Vt,It,{})}}export{Ct as default};