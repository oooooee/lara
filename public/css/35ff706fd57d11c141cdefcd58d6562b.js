(function(global){var DOC=global.document,w3c_css=global.getComputedStyle,undef=void 0,reg_combinator=/^\s*([>+~,\s])\s*(\*|(?:[-\w*]|[^\x00-\xa0]|\\.)*)/,trimLeft=/^\s+/,trimRight=/\s+$/,reg_comma=/^\s*,\s*/,reg_sequence=/^([#\.:]|\[\s*)((?:[-\w]|[^\x00-\xa0]|\\.)+)/,reg_pseudo=/^\(\s*("([^"]*)"|'([^']*)'|[^\(\)]*(\([^\(\)]*\))?)\s*\)/,reg_attrib=/^\s*(?:(\S?=)\s*(?:(['"])(.*?)\2|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,reg_attrval=/\\([0-9a-fA-F]{2,2})/g,reg_sensitive=/^(?:title|id|name|class|for|href|src)$/,reg_backslash=/\\/g,reg_tag=/^((?:[-\w\*]|[^\x00-\xa0]|\\.)+)/,reg_parse_pseudo=/(-?)(\d*)n([-+]?\d*)/,reg_quick=/^(^|[#.])((?:[-\w]|[^\x00-\xa0]|\\.)+)$/,has_in=function(a,b){return(a in b)},dom={html:DOC.documentElement,mix:function(target,source){var args=[].slice.call(arguments),key,ride=typeof args[args.length-1]=="boolean"?args.pop():true;target=target||{};for(var i=1;source=args[i++];){for(key in source){if(ride||!has_in(key,target)){target[key]=source[key]}}}return target},rword:/[^, ]+/g,uuid:1,getUid:w3c_css?function(node){return node.uniqueNumber||(node.uniqueNumber=dom.uuid++)}:function(node){var uid=node.getAttribute("uniqueNumber");if(!uid){uid=dom.uuid++;node.setAttribute("uniqueNumber",uid)}return uid},oneObject:function(array,val){if(typeof array=="string"){array=array.match(dom.rword)||[]}var result={},value=val!==undef?val:1;for(var i=0,n=array.length;i<n;i++){result[array[i]]=value}return result}},hash_operator={"=":1,"!=":2,"|=":3,"~=":4,"^=":5,"$=":6,"*=":7},slice=Array.prototype.slice,attrURL=dom.oneObject("action,cite,codebase,data,href,longdesc,lowsrc,src,usemap",2),bools=dom["@bools"]="autofocus,autoplay,async,checked,controls,declare,disabled,defer,defaultchecked,contenteditable,ismap,loop,multiple,noshade,open,noresize,readonly,selected",boolOne=dom.oneObject(bools),fixGetAttribute,fixHasAttribute,fixById,fixByTag,filterPseudoHasExp=function(strchild,strsibling,type){return{exec:function(flags,lastResult,args){var result=[],flag_not=flags.not,child=strchild,sibling=strsibling,ofType=type,cache={},lock={},a=args.a,b=args.b,i=0,ri=0,el,found,diff,count;if(!ofType&&a===1&&b===0){return flag_not?[]:lastResult}for(var checkName=ofType?"nodeName":"nodeType",parent,pid,checkValue;el=lastResult[i++];){parent=el.parentNode;pid=dom.getUid(parent);if(!lock[pid]){count=lock[pid]=1;checkValue=ofType?el.nodeName:1;for(var node=parent[child];node;node=node[sibling]){if(node[checkName]===checkValue){pid=dom.getUid(node);cache[pid]=count++}}}diff=cache[dom.getUid(el)]-b;found=a===0?diff===0:(diff%a===0&&diff/a>=0);(found^flag_not)&&(result[ri++]=el)}return result}}},onePosition=dom.oneObject("eq,gt,lt,first,last,even,odd"),siblingCheck=function(a,b,ret){if(a===b){return ret}var cur=a.nextSibling;while(cur){if(cur===b){return -1}cur=cur.nextSibling}return 1},sortOrder1=function(a,b){if(a===b){sortOrder1.hasDuplicate=true;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1}return a.compareDocumentPosition(b)&4?-1:1},sortOrder2=function(a,b){if(a===b){sortOrder2.hasDuplicate=true;return 0}var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(aup===bup){return siblingCheck(a,b)}else{if(!aup){return -1}else{if(!bup){return 1}}}while(cur){ap.unshift(cur);cur=cur.parentNode}cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode}al=ap.length;bl=bp.length;for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i])}}return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1)},_toHex=function(x,y){return String.fromCharCode(parseInt(y,16))},parse_pseudo=function(key,match){var expr=match[3]||match[2];expr=expr?expr.replace(reg_attrval,_toHex):match[1];if(!key.indexOf("nth")){expr=expr.replace(/^\+|\s*/g,"");match=(expr==="even"&&"2n"||expr==="odd"&&"2n+1"||!/\D/.test(expr)&&"0n+"+expr||expr).match(reg_parse_pseudo);return{a:(match[1]+(match[2]||1))-0,b:match[3]-0}}return expr},makeArray=function(nodes,result,flag_multi){nodes=slice.call(nodes,0);if(result){result.push.apply(result,nodes)}else{result=nodes}return flag_multi?dom.unique(result):result},getElementsByTagName=function(tagName,els,flag_xml){var method="getElementsByTagName",elems=[],uniqResult={},prefix;if(flag_xml&&tagName.indexOf(":")>0&&els.length&&els[0].lookupNamespaceURI){var arr=tagName.split(":");prefix=arr[0];tagName=arr[1];method="getElementsByTagNameNS";prefix=els[0].lookupNamespaceURI(prefix)}switch(els.length){case 0:return elems;case 1:var all=prefix?els[0][method](prefix,tagName):els[0][method](tagName);for(var i=0,ri=0,el;el=all[i++];){if(el.nodeType===1){elems[ri++]=el}}return elems;default:for(var nodes,i=0,ri=0;el=els[i++];){nodes=prefix?el[method](prefix,tagName):el[method](tagName);for(var uid,j=0,node;node=nodes[j++];){uid=dom.getUid(node);if(!uniqResult[uid]){uniqResult[uid]=elems[ri++]=node}}}return elems}},getElementsByXPath=function(xpath,context,doc){var result=[];try{if(global.DOMParser){var nodes=doc.evaluate(xpath,context,null,7,null);for(var i=0,n=nodes.snapshotLength;i<n;i++){result[i]=nodes.snapshotItem(i)}}else{nodes=context.selectNodes(xpath);for(i=0,n=nodes.length;i<n;i++){result[i]=nodes[i]}}}catch(e){return false}return result};if(trimLeft.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/}global.onerror=function(){return !0};dom.mix(dom,{isXML:function(el){var doc=el.ownerDocument||el;return doc.createElement("p").nodeName!==doc.createElement("P").nodeName},contains:function(a,b){if(a.compareDocumentPosition){return !!(a.compareDocumentPosition(b)&16)}else{if(a.contains){return a!==b&&(a.contains?a.contains(b):true)}}while((b=b.parentNode)){if(a===b){return true}}return false},getText:function(nodes){var ret="",elem;for(var i=0;nodes[i];i++){elem=nodes[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue}else{if(elem.nodeType!==8){ret+=this.getText(elem.childNodes)}}}return ret},hasDuplicate:false,unique:function(nodes){if(nodes.length<2){return nodes}var result=[],array=[],uniqResult={},node=nodes[0],index,ri=0;if(node.sourceIndex){for(var i=0,n=nodes.length;i<n;i++){node=nodes[i];index=node.sourceIndex+100000000;if(!uniqResult[index]){(array[ri++]=new String(index))._=node;uniqResult[index]=1}}array.sort();while(ri){result[--ri]=array[ri]._}return result}else{var sortOrder=node.compareDocumentPosition?sortOrder1:sortOrder2;nodes.sort(sortOrder);if(sortOrder.hasDuplicate){for(i=1,len=nodes.length;i<len;i++){if(nodes[i]===nodes[i-1]){nodes.splice(i--,1)}}}sortOrder.hasDuplicate=false;return nodes}}});(function(){var select=DOC.createElement("select"),option=select.appendChild(DOC.createElement("option"));option.setAttribute("selected","selected");option.className="x";fixGetAttribute=option.getAttribute("class")!="x";select.appendChild(DOC.createComment(""));fixByTag=select.getElementsByTagName("*").length==2;var all=DOC.getElementsByTagName("*"),node,nodeType,comments=[],i=0,j=0;while((node=all[i++])){nodeType=node.nodeType;nodeType===1?dom.getUid(node):nodeType===8?comments.push(node):0}while((node=comments[j++])){node.parentNode.removeChild(node)}fixHasAttribute=select.hasAttribute?!option.hasAttribute("selected"):true;var form=DOC.createElement("div"),id="fixId"+(+new Date),root=dom.html;form.innerHTML="<a name='"+id+"'/>";root.insertBefore(form,root.firstChild);fixById=!!DOC.getElementById(id);root.removeChild(form)})();try{slice.call(dom.html.childNodes,0)[0].nodeType}catch(e){makeArray=function(nodes,result,flag_multi){var ret=result||[],ri=ret.length;for(var i=0,el;el=nodes[i++];){ret[ri++]=el}return flag_multi?dom.unique(ret):ret}}var Icarus=dom.query=function(expr,contexts,result,lastResult,flag_xml,flag_multi,flag_dirty){result=result||[];contexts=contexts||DOC;var pushResult=makeArray;if(!contexts.nodeType){contexts=pushResult(contexts);if(!contexts.length){return result}}else{contexts=[contexts]}var rrelative=reg_combinator,rBackslash=reg_backslash,rcomma=reg_comma,context=contexts[0],doc=context.ownerDocument||context,rtag=reg_tag,flag_all,uniqResult,elems,nodes,tagName,last,ri,uid;expr=expr.replace(trimLeft,"").replace(trimRight,"");flag_xml=flag_xml!==undef?flag_xml:dom.isXML(doc);if(flag_xml&&expr==="body"&&context.body){return pushResult([context.body],result,flag_multi)}if(!flag_xml&&doc.querySelectorAll){var query=expr,fix_icarus_sqa="fix_icarus_sqa";if(contexts.length>2||doc.documentMode==8&&context.nodeType==1){if(contexts.length>2){context=doc}query="."+fix_icarus_sqa+" "+query;for(var i=0,node;node=contexts[i++];){if(node.nodeType===1){node.className=fix_icarus_sqa+" "+node.className}}}if(doc.documentMode!==8||context.nodeName.toLowerCase()!=="object"){try{return pushResult(context.querySelectorAll(query),result,flag_multi)}catch(e){}finally{if(!query.indexOf("."+fix_icarus_sqa)){for(i=0;node=contexts[i++];){if(node.nodeType===1){node.className=node.className.replace(fix_icarus_sqa+" ","")}}}}}}var match=expr.match(reg_quick);if(match){var value=match[2].replace(rBackslash,""),key=match[1];if(key==""){nodes=getElementsByTagName(value,contexts,flag_xml)}else{if(key==="."&&contexts.length===1){if(flag_xml){nodes=getElementsByXPath("//*[@class='"+value+"']",context,doc)}else{if(context.getElementsByClassName){nodes=context.getElementsByClassName(value)}}}else{if(key==="#"&&contexts.length===1){if(flag_xml){nodes=getElementsByXPath("//*[@id='"+value+"']",context,doc)}else{if(context.nodeType==Math.pow(3,2)){node=doc.getElementById(value);nodes=!node?[]:!fixById?[node]:node.getAttributeNode("id").nodeValue===value?[node]:false}}}}}if(nodes){return pushResult(nodes,result,flag_multi)}}lastResult=contexts;if(lastResult.length){loop:while(expr&&last!==expr){flag_dirty=false;elems=null;uniqResult={};if((match=expr.match(rrelative))){expr=RegExp.rightContext;elems=[];tagName=(flag_xml?match[2]:match[2].toUpperCase()).replace(rBackslash,"")||"*";i=0;ri=0;flag_all=tagName==="*";switch(match[1]){case" ":if(expr.length||match[2]){elems=getElementsByTagName(tagName,lastResult,flag_xml)}else{elems=lastResult;break loop}break;case">":while((node=lastResult[i++])){for(node=node.firstChild;node;node=node.nextSibling){if(node.nodeType===1&&(flag_all||tagName===node.nodeName)){elems[ri++]=node}}}break;case"+":while((node=lastResult[i++])){while((node=node.nextSibling)){if(node.nodeType===1){if(flag_all||tagName===node.nodeName){elems[ri++]=node}break}}}break;case"~":while((node=lastResult[i++])){while((node=node.nextSibling)){if(node.nodeType===1&&(flag_all||tagName===node.nodeName)){uid=dom.getUid(node);if(uniqResult[uid]){break}else{uniqResult[uid]=elems[ri++]=node}}}}elems=dom.unique(elems);break}}else{if((match=expr.match(rtag))){expr=RegExp.rightContext;elems=getElementsByTagName(match[1].replace(rBackslash,""),lastResult,flag_xml)}}if(expr){var arr=Icarus.filter(expr,elems,lastResult,doc,flag_xml);expr=arr[0];elems=arr[1];if(!elems){flag_dirty=true;elems=getElementsByTagName("*",lastResult,flag_xml)}if((match=expr.match(rcomma))){expr=RegExp.rightContext;pushResult(elems,result);return Icarus(expr,contexts,result,[],flag_xml,true,flag_dirty)}else{lastResult=elems}}}}if(flag_multi){if(elems.length){return pushResult(elems,result,flag_multi)}}else{if(DOC!==doc||fixByTag&&flag_dirty){for(result=[],ri=0,i=0;node=elems[i++];){if(node.nodeType===1){result[ri++]=node}}return result}}return elems},filterPseudoNoExp=function(name,isLast,isOnly){var A="for(var result=[],flag_not=A.not,node,el,tagName,i=0,ri=0,found=0;node=el=B[i++];found=0){",B="{0}while(!found&&(node=node.{1})){(node.{2}==={3})&&++found}",C="node=el;while(!found&&(node=node.previousSibling)){node.{2}==={3}&&++found}",D="!found^flag_not&&(result[ri++]=el)}return result",start=isLast?"nextSibling":"previousSibling",fills={type:["tagName=el.nodeName;",start,"nodeName","tagName"],child:["",start,"nodeType","1"]}[name],body=A+B+(isOnly?C:"")+D;return{exec:new Function("A","B",body.replace(/{(\d)}/g,function($,$1){return fills[$1]}))}};dom.mix(Icarus,{getAttribute:!fixGetAttribute?function(elem,name){return elem.getAttribute(name)||""}:function(elem,name,flag_xml){if(flag_xml){return elem.getAttribute(name)||""}name=name.toLowerCase();if(attrURL[name]){return elem.getAttribute(name,2)||""}if(elem.tagName==="INPUT"&&name=="type"){return elem.getAttribute("type")||elem.type}var attr=boolOne[name]?(elem.getAttribute(name)?name:""):(elem=elem.getAttributeNode(name))&&elem.value||"";return reg_sensitive.test(name)?attr:attr.toLowerCase()},hasAttribute:!fixHasAttribute?function(elem,name,flag_xml){return flag_xml?!!elem.getAttribute(name):elem.hasAttribute(name)}:function(elem,name){elem=elem.getAttributeNode(name.toLowerCase());return !!(elem&&(elem.specified||elem.nodeValue))},filter:function(expr,elems,lastResult,doc,flag_xml,flag_get){var rsequence=reg_sequence,rattrib=reg_attrib,rpseudo=reg_pseudo,rBackslash=reg_backslash,rattrval=reg_attrval,pushResult=makeArray,toHex=_toHex,_hash_op=hash_operator,parsePseudo=parse_pseudo,match,key,tmp;while((match=expr.match(rsequence))){expr=RegExp.rightContext;key=(match[2]||"").replace(rBackslash,"");if(!elems){if(lastResult.length===1&&lastResult[0]===doc){switch(match[1]){case"#":if(!flag_xml){tmp=doc.getElementById(key);if(!tmp){elems=[];continue}if(fixById?tmp.id===key:tmp.getAttributeNode("id").nodeValue===key){elems=[tmp];continue}}break;case":":switch(key){case"root":elems=[doc.documentElement];continue;case"link":elems=pushResult(doc.links||[]);continue}break}}elems=getElementsByTagName("*",lastResult,flag_xml)}var filter=0,flag_not=false,args;switch(match[1]){case"#":filter=["id","=",key];break;case".":filter=["class","~=",key];break;case":":tmp=Icarus.hook[key];if((match=expr.match(rpseudo))){expr=RegExp.rightContext;args=parsePseudo(key,match)}if(tmp){filter=tmp}else{if(key==="not"){flag_not=true;if(args==="*"){elems=[]}else{if(reg_tag.test(args)){tmp=[];match=flag_xml?args:args.toUpperCase();for(var i=0,ri=0,elem;elem=elems[i++];){if(match!==elem.nodeName){tmp[ri++]=elem}}elems=tmp}else{var obj=Icarus.filter(args,elems,lastResult,doc,flag_xml,true);filter=obj.filter;args=obj.args}}}else{throw"!"}}break;default:filter=[key.toLowerCase()];if((match=expr.match(rattrib))){expr=RegExp.rightContext;if(match[1]){filter[1]=match[1];filter[2]=match[3]||match[4];filter[2]=filter[2]?filter[2].replace(rattrval,toHex).replace(rBackslash,""):""}}break}if(flag_get){return{filter:filter,args:args}}if(elems.length&&filter){tmp=[];i=0;ri=0;if(typeof filter==="function"){if(onePosition[key]){args=args===undef?elems.length-1:~~args;for(;elem=elems[i];){if(filter(i++,args)^flag_not){tmp[ri++]=elem}}}else{while((elem=elems[i++])){if((!!filter(elem,args))^flag_not){tmp[ri++]=elem}}}}else{if(typeof filter.exec==="function"){tmp=filter.exec({not:flag_not,xml:flag_xml},elems,args,doc)}else{var name=filter[0],op=_hash_op[filter[1]],val=filter[2]||"",flag,attr,className;if(!flag_xml&&name==="class"&&op===4){val=" "+val+" ";while((elem=elems[i++])){className=elem.className;if(!!(className&&~(" "+className+" ").indexOf(val))^flag_not){tmp[ri++]=elem}}}else{if(!flag_xml&&op&&val&&!reg_sensitive.test(name)){val=val.toLowerCase()}if(op===4){val=" "+val+" "}while((elem=elems[i++])){if(!op){flag=Icarus.hasAttribute(elem,name,flag_xml)}else{if(val===""&&op>3){flag=false}else{attr=Icarus.getAttribute(elem,name,flag_xml);switch(op){case 1:(flag=attr===val);break;case 2:(flag=attr!==val);break;case 3:(flag=attr===val||attr.substr(0,val.length+1)===val+"-");break;case 4:(flag=attr!==""&&!!~(" "+attr+" ").indexOf(val));break;case 5:(flag=attr!==""&&!attr.indexOf(val));break;case 6:(flag=attr!==""&&attr.substr(attr.length-val.length)===val);break;case 7:(flag=attr!==""&&!!~attr.indexOf(val));break}}}if(flag^flag_not){tmp[ri++]=elem}}}}}elems=tmp}}return[expr,elems]}});Icarus.hook={root:function(el){return el===(el.ownerDocument||el.document).documentElement},"first-child":filterPseudoNoExp("child",false,false),"last-child":filterPseudoNoExp("child",true,false),"only-child":filterPseudoNoExp("child",true,true),"nth-child":filterPseudoHasExp("firstChild","nextSibling",false),link:{exec:function(flags,elems){var links=(elems[0].ownerDocument||elems[0].document).links;if(!links){return[]}var result=[],checked={},flag_not=flags.not;for(var i=0,ri=0,elem;elem=links[i++];){checked[dom.getUid(elem)]=1}for(i=0;elem=elems[i++];){if(checked[dom.getUid(elem)]^flag_not){result[ri++]=elem}}return result}},lang:{exec:function(flags,elems,arg){var result=[],reg=new RegExp("^"+arg,"i"),flag_not=flags.not;for(var tmp,i=0,ri=0,elem;elem=elems[i++];){tmp=elem;while(tmp&&!tmp.getAttribute("lang")){tmp=tmp.parentNode}tmp=!!(tmp&&reg.test(tmp.getAttribute("lang")));if(tmp^flag_not){result[ri++]=elem}}return result}},contains:{exec:function(flags,elems,arg){var res=[],flag_not=flags.not;for(var i=0,ri=0,elem;elem=elems[i++];){if(!!~((elem.innerText||elem.textContent||dom.getText([elem])).indexOf(arg))^flag_not){res[ri++]=elem}}return res}},selected:function(el){el.parentNode&&el.parentNode.selectedIndex;return el.selected===true},header:function(el){return/h\d/i.test(el.nodeName)},button:function(el){return"button"===el.type||el.nodeName==="BUTTON"},input:function(el){return/input|select|textarea|button/i.test(el.nodeName)},parent:function(el){return !!el.firstChild},has:function(el,expr){return !!dom.query(expr,[el]).length},first:function(index){return index===0},last:function(index,num){return index===num},even:function(index){return index%2===0},odd:function(index){return index%2===1},lt:function(index,num){return index<num},gt:function(index,num){return index>num},eq:function(index,num){return index===num},hidden:function(el){return(el.offsetWidth+el.offsetHeight)==0||(el.currentStyle||{}).display=="none"}};Icarus.hook.visible=function(el){return !Icarus.hook.hidden(el)};"text,radio,checkbox,file,password,submit,image,reset".replace(dom.rword,function(name){Icarus.hook[name]=function(el){return(el.getAttribute("type")||el.type)===name}});var blockCss=/(?:function|open|document|location|alert|confirm|prompt|showmodelessdialog|activexobject|xmlhttprequest|execscript|eval)\s*[(.=;]/i,checkCss=function(a,b){b=b||"visibility";return"hidden"==(w3c_css?DOC.defaultView.getComputedStyle(a,null).getPropertyValue(b):a.currentStyle[b])},removeNode=!!global.VBArray?function(){var b;return function(a){if(a&&"BODY"!=a.tagName){b=b||DOC.createElement("DIV");b.appendChild(a);b.innerHTML=""}}}():function(a){a&&a.parentNode&&"BODY"!=a.tagName&&a.parentNode.removeChild(a)},execFunc=[function(){},function(a){for(var b,c=a.length;c--;){b=a[c];checkCss(b)||(b.style.display="none",b.style.visibility="hidden")}},function(a){for(var c=a.length;c--;){removeNode(a[c])}}],execMainFunc=function(a,b){var c;try{c=dom.query(a)}catch(e){return((c=null),0)}return("function"==typeof execFunc[b]&&execFunc[b](c),c.length)},const_DOMContentLoaded="DOMContentLoaded",const_complete="complete",domReadyList=[],domisReady=0,domReady=function(fn){domisReady?fn():domReadyList.unshift(fn)},domfireReady=function(){if(!domisReady){if(!DOC.body){return setTimeout(domfireReady,32)}domisReady=1;for(var len=domReadyList.length;len--;){domReadyList[len]()}}},createCss=(function(){var style,media,self={},reg_media=/screen|all/i,splitCss=/[\[+>~:].+?/,addCss="{display:none;position:absolute;top:-1000000px;visibility:hidden}",styles=DOC.getElementsByTagName("style"),len=styles.length,new_css=function(g){for(var r=[],z=[],o,y=g.split(","),E=y.length;E--;){o=y[E];o&&(splitCss.test(o)?r:z).push(o)}z.length&&r.push(z.join());return(r.join(addCss)||"iframe")+addCss};while(len--){style=styles[len];media=style.getAttribute("media");if(media===null||reg_media.test(media)){self.style=style;break}}if(!self.style){var head=DOC.head||DOC.getElementsByTagName("head")[0];style=DOC.createElement("style");head.insertBefore(style,head.firstChild);domReady(function(){DOC.body&&DOC.body.insertBefore(style,DOC.body.firstChild)})}return style.styleSheet?function(css){style.styleSheet.cssText+=new_css(css)}:!!global.Components?function(css){style.innerHTML+=new_css(css)}:function(css){style.appendChild(DOC.createTextNode(new_css(css)))}})();if(const_complete==DOC.readyState){domfireReady()}else{if(!DOC.attachEvent){DOC.addEventListener(const_DOMContentLoaded,function(){DOC.removeEventListener(const_DOMContentLoaded,arguments.callee,false);domfireReady()},false)}else{DOC.attachEvent("onreadystatechange",function(){const_complete==DOC.readyState&&(DOC.detachEvent("onreadystatechange",arguments.callee),domfireReady())});(function(){if(domisReady){return}try{var node=new Image();node.doScroll();node=null}catch(e){setTimeout(arguments.callee,64);return}domfireReady()})()}}var AdSafe_CheckRule={regIDS:null,regSub:null,format:function(){var str=arguments[0];var regM=/\{\s*(\d+)\s*\}/,arr,temp="",xb;while((arr=regM.exec(str))!=null){xb=parseInt(arr[1]);if(isNaN(xb)||typeof(arguments[xb+1])=="undefined"){throw"��ָ������:"+arr[0]}temp+=str.substr(0,arr.index)+arguments[xb+1];str=str.substr(arr.index+arr[0].length)}temp+=str;return temp},isNullOrEmpty:function(str){var t=str;if(str.constructor==Array){t=str[0]}if(t==null||t==""){return true}return false},trim:function(str,dir){var regTrim;if(dir=="left"){regTrim=/^\s*/g}else{if(dir=="right"){regTrim=/\s*$/g}else{regTrim=/(?:^\s*|\s*$)/g}}if(str.constructor==String){str=str.replace(regTrim,"")}else{if(str.constructor==Array){for(var i=0;i<str.length;i++){str[i]=str[i].replace(regTrim,"")}}}return str},ini:function(){var strSub=":(has|not)\\(",str_i1="(?:[a-zA-Z_][\\w-]*)";var str_zifu_1=this.format('(?:"{0}"|{1})','(?:(?:\\\\\\\\)*(\\\\[^\\\\])?|[^"\\\\])*',"[^\"'\\\\]+");var str_zifu_2=this.format("(?:'{0}'|{1})","(?:(?:\\\\\\\\)*(\\\\[^\\\\])?|[^'\\\\])*","[^\"'\\\\]+");var str_zifu=this.format("(?:{0}|{1})",str_zifu_1,str_zifu_2),htmltag="(?:a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)",str_iden="(?:(?:(?:\\b"+htmltag+")?[\\.#]"+str_i1+")+|\\b"+htmltag+"\\b|\\*)",str_attr=this.format("(?:\\[\\s*{0}\\s*(?:(?:\\*|\\^|\\$|\\!)?\\=\\s*(?:{1})\\s*)?\\])",str_i1,str_zifu),str_quick=this.format("(?:\\:(?:button|input|parent|has{1}|not{1}|first|first-child|only-child|last-child|last|even|odd|lt{0}|gt{0}|eq{0}|nth-child{0}|hidden))","\\(\\s*\\d+\\s*\\)","\\([^)]+\\)"),str_alone=this.format("(?:\\s*(?:[>+]\\s*)?(?:{0}|{1}|{2})+)+",str_iden,str_attr,str_quick),str_jquerys=this.format("^{0}\\s*(?:,\\s*{0}\\s*)*$",str_alone);this.regIDS=new RegExp(str_jquerys,"i");this.regSub=new RegExp(strSub,"i")},Checking:function(str){if(this.isNullOrEmpty(str)){return false}var result=this.AloneSub(str);if(!result){return false}if(this.isNullOrEmpty(str)){return true}if(!this.CheckRules(str)){return false}return true},CheckRules:function(str){var strArr=str[0].split(",");var lst=[];for(var t=0;t<strArr.length;t++){lst.push(this.trim(strArr[t]));if(this.regIDS.test(lst.join(","))){lst=[]}}if(lst.length>0){return false}else{return true}},GetPair:function(k){var t=[],result=[],c;t.push("0");for(var i=0;i<k.length;i++){c=k.charAt(i);if(c=="("){t.push("0")}if(c==")"){t.pop()}if(t.length==0){return result.join("")}result.push(c)}return null},AloneSub:function(str){var v,v1,temp,temp1,result,hasSub=false,m=this.regSub.exec(str[0]);if(m!=null){v=str[0].substr(m.index+m[0].length);v1=[this.GetPair(v)];if(this.isNullOrEmpty(v1)){return false}temp=[v1[0]];result=this.AloneSub(v1);if(!result){return false}else{temp1=this.trim(str[0].substr(0,m.index),"right");if(temp1.length>0){var rc=str[0].charAt(temp1.length-1);if(rc==">"||rc=="+"||rc==","){if(temp1.length-1>=0){temp1=temp1.substr(0,temp1.length-1)}hasSub=true}}if(hasSub){str[0]=temp1+" "+str[0].substr(m.index+m[0].length+temp[0].length+1)}else{str[0]=str[0].substr(0,m.index)+str[0].substr(m.index+m[0].length+temp[0].length+1)}str[0]=this.trim(str[0])}if(this.isNullOrEmpty(str)){return true}return this.AloneSub(str)}else{return this.CheckRules(str)}}};var isIni=false;var checkCSSRule=function(line){if(!isIni){AdSafe_CheckRule.ini();isIni=true}var i=line.indexOf("??1");if(i>=0){line=line.substr(0,i)}line=AdSafe_CheckRule.trim(line);if(line==""){return false}return AdSafe_CheckRule.Checking([line])};global.kkkkkkkkkkk=function(c){if(c.indexOf("??1")>-1||c.indexOf("??")<0){try{if(!checkCSSRule(c)){return}}catch(e){}}if(!c||blockCss.test(c)){return}var d=String(c).split("??"),f=parseInt(d[1],10)||1,g=d[0],l=100;var setCookie=function(name,value,expires,path,domain,secure){var curCookie=name+"="+escape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"")+((domain)?"; domain="+domain:"")+((secure)?"; secure":"");document.cookie=curCookie};var addCookieForHours=function(name,value,path,domain,hour,secure){var t;if(hour){t=new Date();hour=isNaN(parseFloat(hour))?1:hour;t.setTime(t.getTime()+hour*3600*1000)}setCookie(name,value,t,path,domain,secure)};var deleteCookie=function(name,path,domain){document.cookie=name+"="+((path)?"; path="+path:"")+((domain)?"; domain="+domain:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT"};var clearCookie=function(path,domain,arr){var keys=[],r,reg=/([^=; ]+)=([^;]+)/g,cook=document.cookie;while((r=reg.exec(cook))!=null){keys.push(r[1])}if(keys&&keys.length>0){var _f;if(typeof arr=="undefined"||!arr){arr=[]}if(typeof arr=="string"){arr=[arr]}for(var i=keys.length-1;i--;i>=0){_f=false;for(var k=0;k<arr.length;k++){if(keys[i]==arr[k]){_f=true;break}}if(_f){continue}deleteCookie(keys[i],path,domain)}}};var checkParm=function(parm){return/^(?:\s*(?:(?:"[^"+(),]*"|null|\d+)|\[(?:\s*(?:"[^"+(),]*"|null|\d+)\s*)(?:(?:,(?:\s*(?:"[^"+(),]*"|null|\d+)\s*))*)\])\s*)(?:(?:,(?:\s*(?:(?:"[^"+(),]*"|null|\d+)|\[(?:\s*(?:"[^"+(),]*"|null|\d+)\s*)(?:(?:,(?:\s*(?:"[^"+(),]*"|null|\d+)\s*))*)\])\s*))*)$/.test(parm)};var execYC=function(method,arg){eval("try{"+method+"("+arg+");}catch(e){};")};if(f==3){eval("try{"+g+"}catch(e){}");return}if(f==4){if(!checkParm(g)){return}execYC("addCookieForHours",g);return}if(f==5){if(!checkParm(g)){return}execYC("deleteCookie",g);return}if(f==6){if(!checkParm(g)){return}execYC("clearCookie",g);return}1===f&&createCss(g);(function(){var b="$"+g,a=execMainFunc(g,f);dom[b]&&clearTimeout(dom[b]);dom[b]=null;(a||l--<0)||(dom[b]=setTimeout(arguments.callee,64))})();domReady(function(){execMainFunc(g,f)})}})(self);