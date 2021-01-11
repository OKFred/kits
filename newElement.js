  
/*\
| | Let's say you have want to create a new Element with object.
| | And you want to match the data with this element. 
| | 
| | 如果你想要用对象的形式去创建一个元素。
| | 然后数据匹配到该元素。
\*/

/*

*/


function app(){
	let data=[
		{
			'new':{
				'startDate': '2020-01-01',
				'courseName': '挖掘机'
			}
		},
		{
			'new':{
				'startDate': '2021-01-02',
				'courseName': '编程'
			}
		}
	];
	let nodeObj={
		"tag": "table",
		"attributes": {
			"class": "table table-sm table-striped",
			"id": "tableLearning"
		},
		"children": [
			{
				"copies": 1
			},
			{
				"tag": "thead",
				"attributes": {},
				"children": [
					{
						"copies": 1
					},
					{
						"tag": "tr",
						"attributes": {
							"class": "table-success"
						},
						"children": [
							{
								"copies": 1
							},
							{
								"tag": "th",
								"innerText": "学习时间"
							},
							{
								"tag": "th",
								"innerText": "课程"
							}
						]
					}
				]
			},
			{
				"tag": "tbody",
				"children": [
					{
						"copies": ["length"]
					},
					{
						"tag": "tr",
						"children": [
							{
								"copies": 1
							},
							{
								"tag": "td",
								"innerText": ['new','startDate']
							},
							{
								"tag": "td",
								"innerText": ['new','courseName']
							}
						]
					}
				]
			}
		]
	};
	return newElement(nodeObj);
};

function newElement(obj){
	let node=document.createElement(obj.tag);
	if (obj.attributes){
		for (let key in obj.attributes){
			node.setAttribute(key, obj.attributes[key]);
		};
	};
	if (obj.innerText){
		let contents=obj.innerText;
		if (Array.isArray(contents)){	/* 多维属性识别 */
			let saver=container;
			//console.log('saver: ', saver);
			for (let i=0; i<contents.length; i++){
				//console.log(contents[i]);
				saver=saver[contents[i]];
			};
			node.innerText=saver;
		}else{
			node.innerText=obj.innerText;
		};
	};
	if (obj.children){
		let copies=obj.children[0].copies;
		if (Array.isArray(copies)){	/* 长度检测 */
			copies=data[copies];
			for (let theCopy=0; theCopy<copies; theCopy++){	/* 副本 */
				container=data[theCopy];
				for (let theChild=1; theChild< obj.children.length; theChild++){	/* 后代 */
					children=createElement(obj.children[theChild]);
					node.appendChild(children);
				};
			};
		}else{
			for (let theCopy=0; theCopy<copies; theCopy++){
				for (let theChild=1; theChild< obj.children.length; theChild++){
					children=createElement(obj.children[theChild]);
					node.appendChild(children);
				};
			};
		};
	};
	console.log(node);
	return node;
};
