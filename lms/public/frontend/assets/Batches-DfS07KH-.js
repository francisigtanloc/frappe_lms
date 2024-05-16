import{x as c,y as u,G as f,H as d,aa as g,C as a,A as s,ab as x,F as b,B as o,N as m,a8 as w,r as N,j as h,$ as D,d as V,a9 as L,I as j,T as $,W as S,J as z,K as A,ac as O}from"./frappe-ui-CgFK8870.js";import{B as P,f as C}from"./index-GARLdoCV.js";import{_ as T,C as E}from"./DateRange-BwGlDrDQ.js";import{P as F}from"./plus-CsLQFB36.js";const I={class:"flex flex-col border border-gray-200 rounded-md p-4 h-full",style:{"min-height":"150px"}},U={class:"text-xl font-semibold mb-1"},G={class:"short-introduction"},H={class:"mt-auto"},J={key:0,class:"font-semibold text-lg mb-4"},K={class:"flex items-center mb-3"},M={class:"flex items-center"},R={__name:"BatchCard",props:{batch:{type:Object,default:null}},setup(t){return(i,r)=>(c(),u("div",I,[t.batch.seat_count&&t.batch.seats_left>0?(c(),f(s(x),{key:0,theme:"green",class:"self-start mb-2"},{default:d(()=>[g(a(t.batch.seats_left)+" "+a(i.__("Seat Left")),1)]),_:1})):t.batch.seat_count&&t.batch.seats_left<=0?(c(),f(s(x),{key:1,theme:"red",class:"self-start mb-2"},{default:d(()=>[g(a(i.__("Sold Out")),1)]),_:1})):b("",!0),o("div",U,a(t.batch.title),1),o("div",G,a(t.batch.description),1),o("div",H,[t.batch.amount?(c(),u("div",J,a(t.batch.price),1)):b("",!0),o("div",K,[m(s(P),{class:"h-4 w-4 stroke-1.5 mr-2 text-gray-700"}),o("span",null,a(t.batch.courses.length)+" "+a(i.__("Courses")),1)]),m(T,{startDate:t.batch.start_date,endDate:t.batch.end_date,class:"mb-3"},null,8,["startDate","endDate"]),o("div",M,[m(s(E),{class:"h-4 w-4 stroke-1.5 mr-2 text-gray-700"}),o("span",null,a(s(C)(t.batch.start_time))+" - "+a(s(C)(t.batch.end_time)),1)])])]))}},W={class:""},q={class:"sticky top-0 z-10 flex items-center justify-between border-b bg-white px-3 py-2.5 sm:px-5"},Q={class:"flex"},X={key:0,class:"pb-5"},Y={key:0,class:"p-5 text-base text-gray-700"},Z={key:0,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-5"},ee={key:1,class:"grid flex-1 place-items-center text-xl font-medium text-gray-500"},te={class:"flex flex-col items-center justify-center mt-4"},oe={__name:"Batches",setup(t){var p,k;const i=V("$user"),r=w({doctype:"LMS Batch",url:"lms.lms.utils.get_batches",cache:["batches",(p=i==null?void 0:i.data)==null?void 0:p.email],auto:!0}),y=N(0),v=[{label:"Upcoming",batches:h(()=>{var e;return((e=r.data)==null?void 0:e.upcoming)||[]}),count:h(()=>{var e,l;return(l=(e=r.data)==null?void 0:e.upcoming)==null?void 0:l.length})}];return(k=i.data)!=null&&k.is_moderator&&(v.push({label:"Archived",batches:h(()=>{var e;return(e=r.data)==null?void 0:e.archived}),count:h(()=>{var e,l;return(l=(e=r.data)==null?void 0:e.archived)==null?void 0:l.length})}),v.push({label:"Private",batches:h(()=>{var e;return(e=r.data)==null?void 0:e.private}),count:h(()=>{var e,l;return(l=(e=r.data)==null?void 0:e.private)==null?void 0:l.length})})),i.data&&v.push({label:"Enrolled",batches:h(()=>{var e;return(e=r.data)==null?void 0:e.enrolled}),count:h(()=>{var e,l;return(l=(e=r.data)==null?void 0:e.enrolled)==null?void 0:l.length})}),(e,l)=>{const B=D("router-link");return c(),u("div",W,[o("header",q,[m(s(L),{class:"h-7",items:[{label:e.__("All Batches"),route:{name:"Batches"}}]},null,8,["items"]),o("div",Q,[s(i).data?(c(),f(B,{key:0,to:{name:"BatchCreation",params:{batchName:"new"}}},{default:d(()=>[m(s(j),{variant:"solid"},{prefix:d(()=>[m(s(F),{class:"h-4 w-4"})]),default:d(()=>[g(" "+a(e.__("New Batch")),1)]),_:1})]),_:1})):b("",!0)])]),s(r).data?(c(),u("div",X,[s(r).data.length==0&&s(r).list.loading?(c(),u("div",Y,a(e.__("Loading Batches...")),1)):b("",!0),m(s(O),{modelValue:y.value,"onUpdate:modelValue":l[0]||(l[0]=n=>y.value=n),tabs:v,tablistClass:"overflow-x-visible flex-wrap !gap-3 md:flex-nowrap"},{tab:d(({tab:n,selected:_})=>[o("div",null,[o("button",{class:$(["group -mb-px flex items-center gap-2 border-b border-transparent py-2.5 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900",{"text-gray-900":_}])},[n.icon?(c(),f(S(n.icon),{key:0,class:"h-5"})):b("",!0),g(" "+a(e.__(n.label))+" ",1),m(s(x),{class:$(_?"text-gray-800 border border-gray-800":"border border-gray-500"),variant:"subtle",theme:"gray",size:"sm"},{default:d(()=>[g(a(n.count),1)]),_:2},1032,["class"])],2)])]),default:d(({tab:n})=>[n.batches&&n.batches.value.length?(c(),u("div",Z,[(c(!0),u(z,null,A(n.batches.value,_=>(c(),f(B,{to:{name:"BatchDetail",params:{batchName:_.name}}},{default:d(()=>[m(R,{batch:_},null,8,["batch"])]),_:2},1032,["to"]))),256))])):(c(),u("div",ee,[o("div",te,[o("div",null,a(e.__("No {0} batches found").format(n.label.toLowerCase())),1)])]))]),_:1},8,["modelValue"])])):b("",!0)])}}};export{oe as default};
//# sourceMappingURL=Batches-DfS07KH-.js.map