/*\	
| | Let's say you have an unordered array.
| | And you want to check find your target and move it to the front.
| | Here I'd make an array to demostrate.
| | And then transform it to the one we wanted.
| | So, here comes with my array structure first.
| |
| | 如果你有一个没有排序的数组。
| | 你想要将你的目标值排到最前面。
| | 这里我用一个数组来展示。
| | 然后转换成想要的形式。
| | 因此，我先介绍一下我数组的结构。
\*/

function someApp(){
  let data=[
    {'name':'Tom', 'isMain':'n'},
    {'name':'Jerry', 'isMain':'y'},
    {'name':'Alex', 'isMain':'n'}
   ];
	let mainId=0;
	let orderedArr=[];
	for (io=0, len=data.length; io<len; io++){
		let isMain=data[io].isMain;
		(isMain=='y')? mainId=io : false;
		orderedArr.push(io);
	};
	orderedArr.splice(mainId, 1);
	orderedArr.unshift(mainId);
	//console.log(orderedArr);
	for (i=0, length=orderedArr.length; i<length; i++){
		let name=data[orderedArr[i]].name;
		let isMain=data[orderedArr[i]].isMain;
		console.log(isMain+' '+name);
	};
};
