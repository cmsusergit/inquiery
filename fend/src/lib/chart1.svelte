<script>
// @ts-nocheck
//
import {GoogleCharts} from "google-charts"
import { onMount } from "svelte"
const apiUrl = import.meta.env.VITE_API_URL
let deptInquiryCount=null
let datewiseInquiryCount=null

$:{
  if(deptInquiryCount && datewiseInquiryCount){
    GoogleCharts.load(drawChart)
  }
}
const drawChart=()=>{
 if(deptInquiryCount){
  const data = GoogleCharts.api.visualization.arrayToDataTable(deptInquiryCount)
  //
  // @ts-ignore
  const chart1 = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart1'))
  chart1.draw(data)
  const data1 = GoogleCharts.api.visualization.arrayToDataTable(datewiseInquiryCount)
  const chart2 = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart2'))
  let option1={    
    vAxis:{minValue: 0},
    pointsVisible:true
  }
  chart2.draw(data1,option1)
 }
}
const loadBranchCountByDept=async()=>{
    const url1=`${apiUrl}/inquery/countbydept`    
    try{
        const resp = await fetch(url1)                
        if(resp.status==200){       
            deptInquiryCount=await resp.json()
            console.log(deptInquiryCount)
        }
        else{
            const error=await resp.json()
            browser && alert(error.error)
        }
    }catch(error1){
            deptInquiryCount=null
            console.log('****',error1)
            browser && alert(error1)
    }        
}

const loadInquiryCountByDate=async()=>{
    const url1=`${apiUrl}/inquery/countbydt`    
    try{
        const resp = await fetch(url1)                
        if(resp.status==200){       
            datewiseInquiryCount=await resp.json()
        }
        else{
            const error=await resp.json()
            browser && alert(error.error)
        }        
    }catch(error1){
            datewiseInquiryCount=null
            console.log('****',error1)
            browser && alert(error1)
    }        
}

onMount(()=>{
  loadBranchCountByDept()
  loadInquiryCountByDate()
  GoogleCharts.load(drawChart)
})
</script>
<div>
  {#if deptInquiryCount}

  <div class="w-full flex-col md:flex-row flex my-2 p-2 shadow rounded">
    <div class="w-full md:w-1/2 border-r" id="chart1"></div>
    <div class="w-full md:w-1/2">    
      <table class="h-52  w-full">        
        {#each deptInquiryCount as record,indx}
        <tr class="even:bg-gray-100 border-b overflow-auto">
          {#if indx==0}
            <th class="border-r w-14 text-center">{record[0]}</th>
            <th class="border-r w-14 text-center">{record[1]}
              <p class="text-xs">Closed</p>
            </th>            
            <th class="border-r w-14 text-center">{record[2]}
              <p class="text-xs">Open</p>
            </th>
            <th class="border-r w-14 text-center">TOTAL</th>        
          {:else}
            <td class="border-r w-14 text-center">{record[0]}</td>
            <td class="border-r w-14 text-center">{record[1]}</td>
            <td class="border-r w-14 text-center">{record[2]}</td>
            <td class="border-r w-14 text-center">{record[1]+record[2]}</td>
          {/if}
        </tr>
        {/each}
      </table>
    </div>         
  </div>
  {/if}
  {#if datewiseInquiryCount}
  <div class="w-full md:flex-row flex flex-col my-2 p-2 shadow rounded">
    <div class="w-full md:w-1/2 border-r" id="chart2"></div>
    <div class="md:w-1/2 w-full">    
      <table class="h-52  w-full">        
        {#each datewiseInquiryCount as record,indx}
        <tr class="even:bg-gray-100 border-b overflow-auto">
          {#if indx==0}
            <th class="border-r w-14 text-center">{record[0]}</th>
            <th class="border-r w-14 text-center">{record[1]}
            </th>            
          {:else}
            <td class="border-r w-14 text-center">{new Date(record[0]).toDateString()}</td>
            <td class="border-r w-14 text-center">{record[1]}</td>
          {/if}
        </tr>
        {/each}
      </table>
    </div>         
  </div>
  {/if}
</div>






















