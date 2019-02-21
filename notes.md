서버 
: 인터넷에 연결된 컴퓨터 
- 물리적: 늘켜진 컴
- 소프트웨어적: 내접속 요청에 응답하는 컴 (인터넷에 연결된 한덩어리 코드)   
  url에 접속 허락 (공개/비공개/제한공개)  
  
node.js   
: javascript 프론트로 서버구축, npm(버전관리) 자동설치  
: 실시간 데이터처리 유용 netflix, uber, paypal   

# express : server생성 프레임워크
```
$ npm init //package.json 생성
$ npm install express //node_modules 생성
//$ npm install //package.json 만있으면 재설치
```


#git site repository 생성   
.gitignore 추가 
```
git init
git add README.md
git commit -m "first commit"
git remote add origin 주소 
git push -u origin master
//git cela
```

index.js  
<https://www.npmjs.com/package/express>
```js
var express = require('express')
var app = express()
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3000)
```

서버실행
```
$ node index.js
$ npm start  //package.json추가 "start": "node index.js"
```

# babel
: 최신코드 -> 무난한js
```
$ npm install @babel/node
$ @babel/preset-env 
$ npm install @babel/preset-env
```
preset-env 최신안정적 
<https://babeljs.io/docs/en/options> Usage > options> babelrc 
.babelrc 파일생성 (여기설정따라바뀜. 다운받은거추가)
```
{
  "presets": ["@babel/preset-env"]
}
```
# es6사용 가능
```js
  //구 const express = require('express');
  import express from 'express'; //require대신
```
babel로 변경한뒤 node실행 
```
//구 "node index.js" 
  "scripts": {
    "start": "babel-node index.js"
  }
```

접속 
<http://localhost:4000/>


# 개발자위한 패키지설치 -D
```
//nodemon 새로고침 서버재실행
$ npm install nodemon -D
```
"start": "nodemon babel-node index.js" 수정
"nodemon --exec babel-node index.js --delay 2" 두번재시작 안하게 2초기다렸다가 바벨이 변환하면 재시작



# express에서 middleware
:처리가 끝날때까지 연결되있는것 
:express에서 모든 함수 
:유저와 마지막사이 (거부ip찾기,로그인), 순서가중요, 미들웨어하고 루트로감

:(req,res,next) 미들웨어에 권한주기, 커넥션관련 모두 저3가지 갖음
```
const betweenhome = (req,res,next) => {
  console.log("between");
  next(); //handle실행
};
app.get("/", betweenhome, handleHome);  //하나의 라우터에만 적용
```
```
app.use(betweenhome); 모두에 적용하려면 모든 라우터보다 앞에쓰기
```
# 미들웨어 종류
(1)mogan 모건  
: 앱에서 발생하는 모든일을 loggin 로깅(무슨일이 어디서 일어났는지 기록)에 도움주는 미들웨어
```
npm install morgan
```
어떤접속인지 //GET /profile 304 - - 2.571 ms
```js
app.use(morgan("tiny")); //"common" "dev"
``` 

(2)helmet
:앱의 보안 도움
<https://www.npmjs.com/package/helmet>
```js
import helmet from "helmet";
const middleware = (req, res, next) => {
  res.send('not happending'); //next함수대신 연결끊기
}
app.get("/", middleware, handleHome);
```

(3)body-parser
: 사용자가 웹사이트로 전달하는 정보들을 검사
: 사진이나 비디오 업로드 할때, 제목이나 댓글 정보를 전달할때 form에 담아서 업로드 requerst정보에서 form이나 json형태로된 body를 검사
: 폼정보 서버로 보낼때 req obg에 접근(body로부터 정보를 얻을수있게함)
https://www.npmjs.com/package/body-parser
여기서 찾아서 사용
$ npm install body-parser

(4)cookie-parser
: cookie를 전달받아서 사용할수 있는 미들웨어
: 사용자 인증같은 곳에서 쿠기 검사할때 사용 
: 쿠키에 유저정보저장(세션 다루기위해) :쿠키로부터받은정보를이해
$ npm install cookie-parser
```
app.use(bodyParser());
app.use(cookieParser());
```


- 복잡해지니까
index.js -> app.js (app obj)
init.js생성 (여기서 app.js를 실행)
자바스크립트 모듈 이용  export import 
```
import app from "./app"
```
app obj를 부름


#router 
많은 route담은것
route만들어서 export 하는이유
```js
const handleProfile = (req,res) => res.send("profile page");
app.get("/profile",handleProfile);// 위의 함수가져옴.구림

import { userRouter } from "./router";
app.use("/user",userRouter); //누군가 /user에 접속하면 userRouter파일이 사용되서 접속됨
```
```js
//router.js
//이것도 url과 함수(컨트롤러)가 합쳐진 형태라 아래서 개선
import express from 'express';
export const userRouter = express.Router();
userRouter.get("/", (req,res) => res.send("user index"));
userRouter.get("/edit", (req,res) => res.send("user edit"));
```

#mvc (#2.10)
:패턴(섹시구조)
M (모델)data
V (뷰) how does the data look
c (컨트롤러) 데이터찾는함수

- 데이터에맞춰 router.js에서 url과 함수 분리하기
```js
//userRouter.js
export default 이름 //파일로 내보내겠다
//app.js
import 이름 from "./경로";
```

다른 곳에서 같은 경로 쓸수있기 때문에
./routers/userRouter.js에 다쓰지않고 
외부에 routes.js를 만들어서 하나에 정리 
```js
//기존(이름외워야)
app.user("/users",userRouter)
//변경
app.use(routes.users, userRouter);
```
userRoute.js에 다쓰지말고
상위경로 routes.js에 정의 (경로이름변경도 한방에!)


# 컨트롤러
어떤일이 발생하는 지에대한 로직(모든함수)
각 모델마다 만듬 (user컨트롤 video컨트롤 만들기)
코드복잡해 질수있으니 분리
```js
//globalRouter의 home함수는 videoContrller.js로 이동
globalRouter.get(routes.home, (req, res) => res.send('Home'));

//videoController.js
export const homeController = (req,res) => res.send('Home')
//수정
globalRouter.get(routes.home, homeController); //home입력후 화살표에서 homeController 표시선택하면 vscode export 자동완성기능
import { homeController, serach } from '../controller/videoController';
import { join, login, logout } from '../controller/userController';

```

#arrow funcion
```js
//일반
function name(){
  return true //리턴할때
}; 
//arr function : 
name = () => trun //괄호없음
name = () => { return true }
join = (req,res) => res.send(""); //리턴코드
```


#Pug
: 퍼그는 탬플릿언어 html간단히 쓰는것. 안써도됨
익스프레스에서 mvc중 view다루는방식중 하나. express로 html보여줌
(res.send대신에 실제 html전달)
<!https://expressjs.com/en/api.html#app.set> express공식문서 api가이드

```
npm install pug
```

set함수 name과 value필요 (application설정하는 함수들)
view engine 바꿀예정. (undefined)->pug로
```js
app.set("view engine", "pug")
export const home = (req, res) => res.render("home"); //home.pug
```
pug와 express에는 view파일들 위치관한 기본설정이 있음.
설정바꾸기 ( /views/home.pug ) 
- 불러오기
```pug    
// home.pug
extends layouts/main.pug
// views/main.pug
doctype html
html
    head 
        title Wetube              
    body 
        main 
            block content
        footer
            span &copy; WeTube all rights reserved

```



---------------------------------
terminal 단축키 
- [c]+c 서버끄기 
- cleae
