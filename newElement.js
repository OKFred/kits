  
/*\
| | Let's say you want to create a node based on some data.
| | You already known the data and the node type.
| | Firstly, I'd create an object for the node structure.
| | And then we will have the data attached.
| | 
| | 假设你需要根据某些数据去创建一个节点。
| | 你已经了解了数据和节点类型。
| | 首先我会创建一个形容节点结构的对象。
| | 然后我会把数据附上。
\*/

/*

*/


function app(){
	let data=[
		{
			'course':{
				'startDate': '2019-03-01',
				'courseName': '挖掘机'
			}
		},
		{
			'course':{
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
								"innerText": ['course','startDate']
							},
							{
								"tag": "td",
								"innerText": ['course','courseName']
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
