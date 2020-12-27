/*\	
| | Let's say you have a list of regular expressions.
| | And you want to check if the string matches one of your RegExps. 
| | Here I'd make an object to save the expressions.
| | And then transform them so that we can match.
| | So, here comes with my object structure first.
| |
| | 如果你有一些正则表达式。
| | 你想知道文本是否匹配当中的表达式。
| | 这里我用一个对象来保存表达式。
| | 然后转换下用于匹配。
| | 因此，我先介绍一下我对象的结构。
\*/

/* 
An object to save the expressions
以下先创建一个对象，保存表达式
*/

function someApp(){
  RegExpObj={
      "companyName": [
          "Whtsapp",
          "\\d{4,}"
      ],
      "name": [
          "Mr Mario"
      ],
      "email": [
          "mail\\w.*com",
          "\\.*simple.net",
          "\\mail.*top",
          "\\d{1,}mailcloud"
      ]
  };
  let companyName='1234';
  let result=(companyName.match(toReg(RegExpObj,'companyName'))!==null);
  console.log(result);
};

function toReg(obj, objChild){
	let cases=obj[objChild].join('|');
	let regExp=new RegExp(cases,'gi');
	return regExp;
};
