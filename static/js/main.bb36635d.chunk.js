(this.webpackJsonpclientapp=this.webpackJsonpclientapp||[]).push([[0],{11:function(e,t,n){e.exports=n.p+"static/media/duckmagnifyspeech-trans.8ffacabc.png"},12:function(e,t,n){e.exports=n(52)},17:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){},47:function(e,t){},48:function(e,t){},49:function(e,t){},50:function(e,t){},51:function(e,t){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(10),i=n.n(o),l=(n(17),n(18),n(1)),c=n.n(l),s=n(4),u=n(3),d=(n(20),n(2)),f=function(e,t){var n=m(e);d.getDocument(n).promise.then((function(e){p(e,t)}))},p=function(e,t){for(var n=[],r=0;r<e.numPages;r++)n.push(v(r+1,e));Promise.all(n).then((function(e){for(var n="",r=0;r<e.length;r++)n+=e[r];t(n)}))},v=function(e,t){return new Promise(function(){var n=Object(s.a)(c.a.mark((function n(r,a){var o,i,l,s,u;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.getPage(e);case 2:return o=n.sent,n.next=5,o.getTextContent();case 5:for(i=n.sent,l=i.items,s="",u=0;u<l.length;u++)s+=l[u].str;r(s);case 10:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())},m=function(e){return Uint8Array.from(atob(e),(function(e){return e.charCodeAt(0)}))},g=function(e){return e.split(".").pop()},h=function(e){var t=e.indexOf(";base64,")+";base64,".length;return e.substr(t)},E=function(e){var t=a.a.createRef(),n=a.a.useState(!1),r=Object(u.a)(n,2),o=r[0],i=r[1],l=a.a.useState(0),c=Object(u.a)(l,2),s=c[0],d=c[1];a.a.useEffect((function(){var e=t.current;return null===e||void 0===e||e.addEventListener("dragenter",f),null===e||void 0===e||e.addEventListener("dragleave",p),null===e||void 0===e||e.addEventListener("dragover",v),null===e||void 0===e||e.addEventListener("drop",m),function(){null===e||void 0===e||e.removeEventListener("dragenter",f),null===e||void 0===e||e.removeEventListener("dragleave",p),null===e||void 0===e||e.removeEventListener("dragover",v),null===e||void 0===e||e.removeEventListener("drop",m)}})),a.a.useEffect((function(){0===s&&i(!1)}),[s]);var f=function(e){var t,n;e.preventDefault(),e.stopPropagation(),d(s+1),(null===(t=e.dataTransfer)||void 0===t?void 0:t.items)&&(null===(n=e.dataTransfer)||void 0===n?void 0:n.items.length)>0&&i(!0)},p=function(e){e.preventDefault(),e.stopPropagation(),d(s-1)},v=function(e){e.preventDefault(),e.stopPropagation()},m=function(t){var n,r;t.preventDefault(),t.stopPropagation(),i(!1),(null===(n=t.dataTransfer)||void 0===n?void 0:n.files)&&(null===(r=t.dataTransfer)||void 0===r?void 0:r.files.length)>0&&(e.handleDrop(t.dataTransfer.files),t.dataTransfer.clearData(),d(0))};return a.a.createElement("div",{ref:t,style:{display:"inline-block",position:"relative"}},o&&a.a.createElement("div",{style:{border:"dashed grey 4px",backgroundColor:"rgba(255,255,255,.8)",position:"absolute",top:0,bottom:0,left:0,right:0,zIndex:9999}},a.a.createElement("div",{style:{position:"absolute",top:"50%",right:0,left:0,textAlign:"center",color:"grey",fontSize:36}},a.a.createElement("div",null,"drop here~"))),e.children)},b=n(11),w=n.n(b),x=function(){return r.createElement(r.Fragment,null,r.createElement("h2",{className:"empty-pdf-text__header"},"Your PDF will show up as text here"),r.createElement("img",{src:w.a,alt:"duck"}))};d.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(d.version,"/pdf.worker.js");var y=function(){var e=a.a.useState(""),t=Object(u.a)(e,2),n=t[0],r=t[1],o=function(){r("")},i=function(e){if(!e||e.length<=0)o();else{if(!function(e){if(!(e&&e.length>0))return!1;var t=e[0].name,n=g(t);return"pdf"===(null===n||void 0===n?void 0:n.toLowerCase())}(e))return alert("Invalid file extension: Only .pdf files are supported"),void o();var t=new FileReader,n=e[0];t.onload=function(){var e=Object(s.a)(c.a.mark((function e(t){var n,a,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"string"===typeof(a=null===(n=t.target)||void 0===n?void 0:n.result)&&(o=h(a),f(o,r));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.readAsDataURL(n)}};return a.a.createElement("div",{className:"pdf-container"},a.a.createElement(E,{handleDrop:i},a.a.createElement("div",{className:"drag-and-drop__child-container"},"Drag your PDF file here to convert it to text!")),a.a.createElement("div",{className:"pdf-uploader"},a.a.createElement("input",{type:"file",name:"pdfUploader",onChange:function(e){e.preventDefault(),i(e.currentTarget.files)}})),a.a.createElement(E,{handleDrop:i},a.a.createElement("div",{className:"pdf-text",contentEditable:!0},n||a.a.createElement(x,null))),a.a.createElement("div",{className:"clear-pdf-btn",onClick:o},"Clear PDF"))},D=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",{className:"App__title"},"Search a PDF"),a.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.bb36635d.chunk.js.map