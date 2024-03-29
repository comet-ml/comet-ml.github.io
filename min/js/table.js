class Table{constructor(data,keys,headers,id="data-table",className="data-table"){this.data=data;if(typeof keys==="undefined"){this.keys=Object.keys(this.data[0]);}else{this.keys=keys;}
this.generate(headers,id,className);}
generate(headers,id="data-table",className="data-table"){this.table=window.document.createElement("table");this.table.id=id;this.table.className=className;for(let i=0;i<this.data.length;i++){let element=this.data[i];let row=this.table.insertRow();for(let j=0;j<this.keys.length;j++){let key=this.keys[j];let cell=row.insertCell();let text=element[key];let node=null;if(text&&text.nodeType===1){node=text;}else if(typeof text==="object"){node=window.document.createTextNode(JSON.stringify(text));}else{node=window.document.createTextNode(text);}
cell.appendChild(node);}}
let thead=this.table.createTHead();let row=thead.insertRow();for(let key of this.keys){let th=window.document.createElement("th");if(typeof headers!=="undefined"&&key in headers)
key=headers[key];key=this.title(key);key=key.replace(/_/g," ");let text=window.document.createTextNode(key);th.appendChild(text);row.appendChild(th);}}
appendTo(id){const div=window.document.getElementById(id);div.appendChild(this.table);}
title(text){return text.replace(/(^\w{1})|(\s{1}\w{1})/g,match=>match.toUpperCase());}}