/*\
| | Let's say we want to convert xml string to an obj(json)
| | We may use DOMParser to convert xml to xml dom.
| | And check the dom recrusively so that we can have it finally.
| | 
| | 假设我们需要将xml文本转换成object/json
| | 我们可以先用DOMParser将xml 转换成xml dom.
| | 然后遍历这个dom，我们就可以得到最后的数据了。
\*/

function xmljson(xml){
    let xmldom = new DOMParser().parseFromString(xml, 'text/xml');
    let {children, nodeName, nodeValue, attributes}=xmldom;
    let childrenArr;
    if (children && children.length){
        childrenArr=[];
        for (let subxml of children){
            let subobj=xmljson(subxml)
            childrenArr.push(subobj);
        }
    }
    let attributeObj;
    if (attributes && attributes.length){
        attributeObj={};
        for (let attr of attributes){
            attributeObj[attr.nodeName]=attr.nodeValue;
        }
    }
    let obj={nodeName, nodeValue};
    if (childrenArr) obj.children=childrenArr;
    if (attributeObj) obj.attributes=attributeObj;
    return obj;
}
