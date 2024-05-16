var M=Object.defineProperty;var T=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var I=(_,r,a)=>r in _?M(_,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):_[r]=a,P=(_,r)=>{for(var a in r||(r={}))O.call(r,a)&&I(_,a,r[a]);if(T)for(var a of T(r))U.call(r,a)&&I(_,a,r[a]);return _};import{x as L,G as B,H as b,V as j,ax as J,ay as A,A as m,aA as Q,B as o,r as y,w as Y,y as q,C as f,N as u,ah as G,X as H,I as z,aa as V,aw as X,J as K,s as W,a as Z,k,j as D,T as ee,L as se,M as te,d as oe,a9 as re,ai as R,S as ne}from"./frappe-ui-CgFK8870.js";import{B as ae}from"./editorjs-D5YadEn0.js";import{b as le,g as ie,c as de}from"./index-GARLdoCV.js";import{_ as ue}from"./Link-IMATFM6Y.js";import{P as ce}from"./plus-CsLQFB36.js";import{F as pe}from"./file-text-DHp4eWlu.js";import{C as me}from"./chevron-right-jcxn7em3.js";import"./x-KQP2i48Y.js";/**
 * @license lucide-vue-next v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=le("InfoIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]),ve="/assets/lms/frontend/Youtube.mov",he=o("div",{class:"absolute left-0 mt-3 w-[35rem] max-w-lg -translate-x-1/2 transform rounded-lg bg-white px-4 sm:px-0 lg:max-w-3xl"},[o("div",{class:"overflow-hidden rounded-lg p-3 shadow-2xl ring-1 ring-black ring-opacity-5"},[o("video",{controls:"",autoplay:"",muted:"",width:"100%",controlsList:"nodownload",oncontextmenu:"return false;",class:"rounded-sm"},[o("source",{src:ve,type:"video/mp4"})])])],-1),fe={__name:"YouTubeExplanation",setup(_){return(r,a)=>(L(),B(m(Q),{transition:"default"},{target:b(({isOpen:g,togglePopover:h})=>[j(r.$slots,"default",J(A({isOpen:g,togglePopover:h})))]),body:b(()=>[he]),_:3}))}},be={class:"text-lg font-semibold"},ye={class:"mt-5"},ge={class:""},xe={class:"text-xs text-gray-600 mb-1"},we={class:"flex mt-4"},Ce={class:"mt-4"},Ne={class:"text-xs text-gray-600 mb-1"},$e={class:"flex"},Le={class:""},ke={key:1,class:""},Ee={class:"flex items-center"},Se={class:"border rounded-md p-2 mr-2"},qe={class:"flex flex-col"},ze={class:"text-xs"},Ve={class:"mt-4"},Te={class:"text-xs text-gray-600 mb-1"},Ie=["onClick"],Pe={__name:"LessonPlugins",props:{editor:{required:!0},notesEditor:{required:!0}},setup(_){const r=y(null),a=y(null),g=y(null),h=y(null),i=y("Lesson Content"),C=_,c=()=>{x().caret.setToLastBlock("end",0),r.value&&(x().blocks.insert("quiz",{quiz:r.value}),r.value=null)},d=l=>{x().caret.setToLastBlock("end",0),x().blocks.insert("upload",l)},E=l=>{let p=l.name.split(".").pop().toLowerCase();if(!["jpg","jpeg","png","mp4","mov","mp3"].includes(p))return"Only image and video files are allowed."},S=()=>[{label:"Lesson Content",value:"Lesson Content"},{label:"Instructor Content",value:"Instructor Content"}],x=()=>i.value=="Lesson Content"?g.value:h.value;return Y(()=>[C.editor,C.notesEditor],([l,p],[v,N])=>{g.value=l,h.value=p}),(l,p)=>(L(),q(K,null,[o("div",be,f(l.__("Components")),1),o("div",ye,[u(m(H),{text:l.__("Content such as quiz, video and image will be added in the editor you select."),placement:"bottom"},{default:b(()=>[o("div",ge,[o("div",xe,f(l.__("Select an Editor")),1),u(m(G),{modelValue:i.value,"onUpdate:modelValue":p[0]||(p[0]=v=>i.value=v),options:S()},null,8,["modelValue","options"])])]),_:1},8,["text"]),o("div",we,[u(ue,{modelValue:r.value,"onUpdate:modelValue":p[1]||(p[1]=v=>r.value=v),class:"flex-1",doctype:"LMS Quiz",label:l.__("Select a Quiz")},null,8,["modelValue","label"]),u(m(z),{onClick:p[2]||(p[2]=v=>c()),class:"self-end ml-2"},{icon:b(()=>[u(m(ce),{class:"h-4 w-4 stroke-1.5"})]),_:1})]),o("div",Ce,[o("div",Ne,f(l.__("Add an image, video, pdf or audio.")),1),o("div",$e,[a.value?(L(),q("div",ke,[o("div",Ee,[o("div",Se,[u(m(pe),{class:"h-4 w-4 stroke-1.5 text-gray-700"})]),o("div",qe,[o("span",ze,f(a.value.file_name),1)])])])):(L(),B(m(X),{key:0,fileTypes:["image/*","video/*","audio/*",".pdf"],validateFile:E,onSuccess:p[3]||(p[3]=v=>d(v))},{default:b(({file:v,progress:N,uploading:$,openFileSelector:w})=>[o("div",Le,[u(m(z),{onClick:w,loading:$},{default:b(()=>[V(f($?l.__("Uploading {0}%").format(N):l.__("Upload an File")),1)]),_:2},1032,["onClick","loading"])])]),_:1}))])]),o("div",Ve,[o("div",Te,f(l.__("To add a YouTube video, paste the URL of the video in the editor.")),1),u(fe,null,{default:b(({togglePopover:v})=>[o("div",{onClick:N=>v(),class:"flex items-center text-sm underline cursor-pointer"},[u(m(_e),{class:"w-3 h-3 stroke-1.5 text-gray-700 mr-1"}),V(" "+f(l.__("Learn More")),1)],8,Ie)]),_:1})])])],64))}},Re={class:""},Be={class:"grid md:grid-cols-[75%,25%] h-screen"},Fe={class:"border-r"},Me={class:"sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between border-b overflow-hidden bg-white px-3 py-2.5 sm:px-5"},Oe={class:"py-5"},Ue={class:"w-5/6 mx-auto"},je={class:"border-t mt-4"},Je={class:"w-5/6 mx-auto pt-4"},Ae={class:"block font-medium text-gray-600 mb-1"},Qe={id:"instructor-notes",class:"ProseMirror prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-gray-300 prose-th:border-gray-300 prose-td:relative prose-th:relative prose-th:bg-gray-100 prose-sm max-w-none !whitespace-normal mt-6 py-3"},Ye={class:"border-t mt-4"},Ge={class:"w-5/6 mx-auto pt-4"},He={class:"block font-medium text-gray-600 mb-1"},Xe=o("div",{id:"content",class:"ProseMirror prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-gray-300 prose-th:border-gray-300 prose-td:relative prose-th:relative prose-th:bg-gray-100 prose-sm max-w-none !whitespace-normal mt-6 py-3"},null,-1),Ke={class:""},We={class:"sticky top-0 p-5"},ls={__name:"CreateLesson",props:{courseName:{type:String,required:!0},chapterNumber:{type:String,required:!0},lessonNumber:{type:String,required:!0}},setup(_){const r=y(null),a=y(null),g=oe("$user"),h=y(!1);ne();const i=_;W(()=>{var e,s;!((e=g.data)!=null&&e.is_moderator)&&!((s=g.data)!=null&&s.is_instructor)&&(window.location.href="/login"),r.value=C("content"),a.value=C("instructor-notes")});const C=e=>new ae({holder:e,tools:ie(),autofocus:!0}),c=Z({title:"",include_in_preview:!1,body:"Test",instructor_notes:"",content:""}),d=k({url:"lms.lms.utils.get_lesson_creation_details",params:{course:i.courseName,chapter:i.chapterNumber,lesson:i.lessonNumber},auto:!0,onSuccess(e){e.lesson&&(Object.keys(e.lesson).forEach(s=>{c[s]=e.lesson[s]}),c.include_in_preview=!!e.include_in_preview,r.value.isReady.then(()=>{if(e.lesson.content)r.value.render(JSON.parse(e.lesson.content));else if(e.lesson.body){let s=l(e.lesson);r.value.render({blocks:s})}}),a.value.isReady.then(()=>{if(e.lesson.instructor_content)a.value.render(JSON.parse(e.lesson.instructor_content));else if(e.lesson.instructor_notes){let s=l(e.lesson);a.value.render({blocks:s})}}))}}),E=k({url:"frappe.client.insert",makeParams(e){var s;return{doc:P({doctype:"Course Lesson",course:i.courseName,chapter:(s=d.data)==null?void 0:s.chapter.name},c)}}}),S=k({url:"frappe.client.set_value",makeParams(e){return{doctype:"Course Lesson",name:e.lesson,fieldname:c}}}),x=k({url:"frappe.client.insert",makeParams(e){var s;return{doc:{doctype:"Lesson Reference",parent:(s=d.data)==null?void 0:s.chapter.name,parenttype:"Course Chapter",parentfield:"lessons",lesson:e.lesson,idx:i.lessonNumber}}}}),l=e=>{let s=[];if(e.youtube){let t=e.youtube.split("/").pop();s.push({type:"embed",data:{service:"youtube",embed:`https://www.youtube.com/embed/${t}`}})}return e.body.split(`
`).forEach(t=>{if(t.includes("{{ YouTubeVideo")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];n.includes("https://")||(n=`https://www.youtube.com/embed/${n}`),s.push({type:"embed",data:{service:"youtube",embed:n}})}else if(t.includes("{{ Quiz")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];s.push({type:"quiz",data:{quiz:n}})}else if(t.includes("{{ Video")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];s.push({type:"upload",data:{file_url:n,file_type:"video"}})}else if(t.includes("{{ Audio")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];s.push({type:"upload",data:{file_url:n,file_type:"audio"}})}else if(t.includes("{{ PDF")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];s.push({type:"upload",data:{file_url:n,file_type:"pdf"}})}else if(t.includes("{{ Embed")){let n=t.match(/\(["']([^"']+?)["']\)/)[1];s.push({type:"embed",data:{service:n.split("|||")[0],embed:n.split("|||")[1]}})}else if(t.includes("![]")){let n=t.match(/\((.*?)\)/)[1];s.push({type:"upload",data:{file_url:n,file_type:"image"}})}else if(t.includes("#")){let n=(t.match(/#/g)||[]).length;s.push({type:"header",data:{text:t.replace(/#/g,"").trim(),level:n}})}else s.push({type:"paragraph",data:{text:t}})}),e.quizId&&s.push({type:"quiz",data:{quiz:e.quizId}}),s},p=()=>{r.value.save().then(e=>{c.content=JSON.stringify(e),a.value.save().then(s=>{var t;c.instructor_content=JSON.stringify(s),(t=d.data)!=null&&t.lesson?N():v()})})},v=()=>{E.submit({},{validate(){return $()},onSuccess(e){x.submit({lesson:e.name},{onSuccess(){w("Success","Lesson created successfully","check"),d.reload()}})},onError(e){w("Error",e.message,"x")}})},N=()=>{S.submit({lesson:d.data.lesson.name},{validate(){return $()},onSuccess(){w("Success","Lesson updated successfully","check")},onError(e){w("Error",e.message,"x")}})},$=()=>{if(!c.title)return"Title is required";if(!c.content)return"Content is required"},w=(e,s,t)=>{de({title:e,text:s,icon:t,iconClasses:t=="check"?"bg-green-600 text-white rounded-md p-px":"bg-red-600 text-white rounded-md p-px",position:t=="check"?"bottom-right":"top-center",timeout:t=="check"?5:10})},F=D(()=>{var s,t,n;let e=[{label:"Courses",route:{name:"Courses"}},{label:(s=d.data)==null?void 0:s.course_title,route:{name:"CourseDetail",params:{courseName:i.courseName}}}];return(t=d==null?void 0:d.data)!=null&&t.lesson&&e.push({label:d.data.lesson.title,route:{name:"Lesson",params:{courseName:i.courseName,chapterNumber:i.chapterNumber,lessonNumber:i.lessonNumber}}}),e.push({label:(n=d==null?void 0:d.data)!=null&&n.lesson?"Edit Lesson":"Create Lesson",route:{name:"CreateLesson",params:{courseName:i.courseName,chapterNumber:i.chapterNumber,lessonNumber:i.lessonNumber}}}),e});return(e,s)=>(L(),q("div",Re,[o("div",Be,[o("div",Fe,[o("header",Me,[u(m(re),{class:"text-ellipsis",items:F.value},null,8,["items"]),u(m(z),{variant:"solid",onClick:s[0]||(s[0]=t=>p()),class:"mt-3 md:mt-0"},{default:b(()=>[V(f(e.__("Save")),1)]),_:1})]),o("div",Oe,[o("div",Ue,[u(m(R),{modelValue:c.title,"onUpdate:modelValue":s[1]||(s[1]=t=>c.title=t),label:"Title",class:"mb-4"},null,8,["modelValue"]),u(m(R),{modelValue:c.include_in_preview,"onUpdate:modelValue":s[2]||(s[2]=t=>c.include_in_preview=t),type:"checkbox",label:"Include in Preview"},null,8,["modelValue"])]),o("div",je,[o("div",Je,[o("div",{class:"flex justify-between cursor-pointer",onClick:s[3]||(s[3]=()=>{h.value=!h.value})},[o("label",Ae,f(e.__("Instructor Notes")),1),u(m(me),{class:ee(["stroke-2 h-5 w-5 text-gray-600",{"rotate-90 transform duration-200":h.value,"duration-200":!h.value}])},null,8,["class"])]),se(o("div",Qe,null,512),[[te,h.value]])])]),o("div",Ye,[o("div",Ge,[o("label",He,f(e.__("Content")),1),Xe])])])]),o("div",Ke,[o("div",We,[u(Pe,{editor:r.value,notesEditor:a.value},null,8,["editor","notesEditor"])])])])]))}};export{ls as default};
//# sourceMappingURL=CreateLesson-B9UA6b2K.js.map