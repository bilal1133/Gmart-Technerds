!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,a){return e=e||window,a&&a.fn.dataTable||(a=require("datatables.net")(e,a).$),t(a,0,e.document)}:t(jQuery,window,document)}(function(h,e,s,n){"use strict";var o=h.fn.dataTable;return h.extend(!0,o.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",renderer:"bootstrap"}),h.extend(o.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm",sLengthSelect:"custom-select custom-select-sm form-control form-control-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"}),o.ext.renderer.pageButton.bootstrap=function(i,e,d,a,l,c){var u,p,t,f=new o.Api(i),m=i.oClasses,b=i.oLanguage.oPaginate,g=i.oLanguage.oAria.paginate||{},x=0,w=function(e,a){for(var t,s,n=function(e){e.preventDefault(),h(e.currentTarget).hasClass("disabled")||f.page()==e.data.action||f.page(e.data.action).draw("page")},o=0,r=a.length;o<r;o++)if(s=a[o],h.isArray(s))w(e,s);else{switch(p=u="",s){case"ellipsis":u="&#x2026;",p="disabled";break;case"first":u=b.sFirst,p=s+(0<l?"":" disabled");break;case"previous":u=b.sPrevious,p=s+(0<l?"":" disabled");break;case"next":u=b.sNext,p=s+(l<c-1?"":" disabled");break;case"last":u=b.sLast,p=s+(l<c-1?"":" disabled");break;default:u=s+1,p=l===s?"active":""}u&&(t=h("<li>",{class:m.sPageButton+" "+p,id:0===d&&"string"==typeof s?i.sTableId+"_"+s:null}).append(h("<a>",{href:"#","aria-controls":i.sTableId,"aria-label":g[s],"data-dt-idx":x,tabindex:i.iTabIndex,class:"page-link"}).html(u)).appendTo(e),i.oApi._fnBindAction(t,{action:s},n),x++)}};try{t=h(e).find(s.activeElement).data("dt-idx")}catch(e){}w(h(e).empty().html('<ul class="pagination"/>').children("ul"),a),t!==n&&h(e).find("[data-dt-idx="+t+"]").trigger("focus")},o});