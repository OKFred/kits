/*\	
| | Let's say you have some data to send.
| | Either POST or GET, doesn't matter.
| | Here I'd make an object pass the data.
| | And return that object as well.
| | So, here comes with my object structure first.
| |
| | 如果你有一些数据需要发送。
| | 不管是POST还是GET，都可以。
| | 这里我用一个对象来传递数据。
| | 同样返回那一个对象。
| | 因此，我先介绍一下我对象的结构。
\*/

/* 
An object to send, save & describe the data
以下先创建一个对象，用于发送，保存和描述该对象 

Parameters 候选参数
	"method": ["POST","GET"]
	"Content-Type": ["x-www-form-urlencoded","Form Data","json"]
data to send / receive stores in

数据发送/接收储存位置
	obj.request/response.data
*/

function someApp(){
	let appObj={
		"request": {
			"method":	"POST",
			"url": "https://example.com/queryCustomerInfo.json",
			"header": {
				"Content-Type": "json"
			},
			"data": {
					"customerId": "",
					"token": "",
					"filter" : {
						"order": "id",
						"limit": 10
					}
			}
		},
		"response": {
			"data": {}
		},
		"info": {
			"type": "customerData",
			"index": 101,
			"name": "findMyCustomer"
		}
	};
	let url=appObj.request.url;
	(async function (){
		await doFetch(appObj, url);
		appObj.response.data=result;
		//console.log(appObj);
	})();
};

/*
functions to help you send and receive the data
帮助你发送和处理数据的对象
*/

async function doFetch(obj, url){
	let method=obj.request.method;
	let header = {method: method};
	if (method==='POST'){
		changeForm(obj, header);
		header.body=formdata;
	}else if(method==='GET'){
		if (url.match(/\?/)==null){
			let parameters='';
			for ( [k, v] of Object.entries(obj.request.data)){
				let params = new URLSearchParams();
				params.set(`${k}`,`${v}`);
				parameters=parameters+params.toString()+'&';
			};
			parameters=parameters.replace(/&$/, '');
			url=url+'?'+parameters;
		};
	};
	if (typeof(url)=='undefined'){
		result='failed';
		return result;
	}else{
		try{
			response = await fetch(url, header);
			if(!response.ok){
				console.log('response not ok');
				result='NotMyType';
			}else{
				//console.log('response is ok');
				let isRedirected = response.redirected;
				let myType = response.type;
				let myURL = new URL(response.url).origin;
				let myStatus = response.status;
				//console.log('Redirected: '+isRedirected+'；type: '+ myType+'; status'+myStatus+'; URL: '+myURL);
				if (response.headers.get("content-type").match(/json/gi)){
					//console.log('JSON got');
					result = await response.json();
					//console.table(result);
				}else{
					result = await response.text();
					try{
						let test = JSON.parse(result);
						result=test;
						//console.log('JSON got');
					}catch(e){
						//console.log(e);
					};
				};
			};
		}catch(e){
			//console.log(e);
			result=e;
		};
	};
	//console.log(result);
	return result;
};

/*
type transforms automatically
类型自动转换
*/

function changeForm(obj, header){
	header.headers={};
	(obj.request.header.headers)? header.headers=obj.request.header.headers: false;
	if (obj.request.header['Content-Type']=='Form Data'){
		formdata = new FormData();
		for ( [k, v] of Object.entries(obj.request.data)){
			formdata.set(`${k}`,`${v}`);
		};
		//header.headers['Content-Type']='Form Data';
	}else if(obj.request.header['Content-Type']=='x-www-form-urlencoded'){
		formdata=[];
		let arr=[];
		for ([k,v] of Object.entries(obj.request.data)){
			if (typeof(v)=='object'){
				arr.push(encodeURIComponent(k)+'='+encodeURIComponent(JSON.stringify(v)));
			}else{
				arr.push(encodeURIComponent(k)+'='+encodeURIComponent(v));
			};
		};
		formdata=arr.join('&');
		header.headers['Content-Type']='application/x-www-form-urlencoded';
	}else if(obj.request.header['Content-Type']=='json'){
		formdata=JSON.stringify(obj.request.data);
		header.headers['Content-Type']='application/json';
	};
};
