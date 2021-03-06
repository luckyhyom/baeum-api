<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Baeum API

인프런을 모티브로 제작중인 개인 프로젝트입니다. </br>
[AWS EC2, S3, Docker, Docker-compose를 이용하여 직접 배포한 NestJS + React 웹 사이트 입니다.](https://www.makevalue.net/)

[Front-end](https://github.com/luckyhyom/baeum-web) \
[Infra 계획](https://github.com/luckyhyom/AWS/tree/main/baeum)

### 사용 언어 & 프레임워크: Node.js & NestJS

npm 패키지 설치가 안되거나 프로젝트 실행이 정상적이지 않을 경우
npm 버전을 6 이상 7 미만으로 설정해주세요.

```tsx
node -v
v14.18.0
npm -v
6.14.15

git clone https://github.com/luckyhyom/baeum-api.git
npm i
npm run start:dev
```

### 유닛 테스트, 통합 테스트

```tsx
npm run test
npm run test:e2e
```


### 회원가입 `POST` /auth/signup

로그인 또는 회원가입을 했을 때, 회원임을 인증하기 위해 jwt를 이용합니다. 다양한 클라이언트를 위한 Restful API, MSA에 유리함, 등의 장점이 있다고 합니다.

```tsx
curl -X POST 'http://127.0.0.1:3000/auth/signup' \
-H 'CSRF_TOKEN: $2a$04$7ebvc5Qq9WABTYnwJLU1EueFK8GoMQf94KdCEJzy1s5oN2fhJVgs.' \
-H 'Content-Type: application/json' \
-d '{
    "userId":"testuser01",
    "password":"test12345",
    "name":"김효민",
    "about":"S/W엔지니어",
    "email":"bs_khm@naver.com"
}'
```

Request

```tsx
{
    "userId",
    "password",
    "name",
    "about",
    "email",
}
```

Response `201`

```tsx
{
	id,
	name,
	about,
	profileImageURL,
	email,
	token
}
```

### 로그인 `POST` /auth/login

```tsx
curl -X POST 'http://localhost:3000/auth/login' \
-H 'CSRF_TOKEN: $2a$04$BGIFcXFklqUWNxCADjPRV.xD/WPfCHhEVsXnyWiBVgYgO6tCN9hxO' \
-H 'Content-Type: application/json' \
-d '{
    "userId":"testuser01",
    "password":"test12345"
}'
```

Request

```tsx
{
    "userId",
    "password",
    "name",
    "about",
    "email",
}
```

Response `201`

```tsx
{
	id,
	name,
	about,
	profileImageURL,
	email,
	token
}
```

### 회원 가입, 또는 로그인 후 반환 받은 token을 메모장에 적어서 다른 API 사용시 헤더에 포함해 주세요

```tsx
-H 'Authorization: Bearer '

-H 'Authorization: Bearer ABCDEFGHIJK' // Bearer 옆에 붙여넣기 (한칸 띄워진게 정상)
```

### 게시글 생성 `POST` /lectures

TypeORM을 이용하여 유저와 게시글간의 관계를 형성하였습니다.

```tsx
curl -X POST '127.0.0.1:3000/lectures' \
-H 'CSRF_TOKEN: $2a$04$BGIFcXFklqUWNxCADjPRV.xD/WPfCHhEVsXnyWiBVgYgO6tCN9hxO' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{
    "title": "No.1 JavaScript",
    "description": "Javascript 스테디셀러",
    "thumbnail": "https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/af98e7e689b8411cb51aef899b8be1a2",
    "price": 21000
}'
```

Request

```tsx
{
	title,
	description,
	thumbnail,
	price
}
```

Response `201`

```tsx
{
	title,
	description,
	thumbnail,
	author,
	price,
	viewStatus,
	userId,
	user,
}
```

### 게시글 불러오기(페이징,검색) `GET` /lectures/search?pageNo=1&title=JavaScript

typeORM을 이용하여 간단하게 페이징과 검색 기능을 구현했습니다. 검색은 옵션이며 pageNo에 원하는 페이지를 입력합니다. 테스트 하기 위해 게시글을 많이 생성해야 할 수 있습니다.

```tsx
curl -X GET '127.0.0.1:3000/lectures/search?pageNo=1&title=JavaScript' \
-H 'Authorization: Bearer '
```

Response `200`

```tsx
{
	pageSize,
	totalCount,
	totalPage,
	[ item, item, item ... ],
}
```

### 게시글 업데이트 `PATCH` /lectures/:id

Request Body에 수정하고싶은 값만 등록하기 위해 PATCH를 이용하여 업데이트합니다.

```tsx
curl -X PATCH 'http://127.0.0.1:3000/lectures/1' \
-H 'CSRF_TOKEN: $2a$04$BGIFcXFklqUWNxCADjPRV.xD/WPfCHhEVsXnyWiBVgYgO6tCN9hxO' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{
    "title": "updated! JavaScript"
}'
```

Request

```tsx
{
	title?,
	description?,
	thumbnail?,
	author?,
	price?,
}
```

Response `200`

```tsx
{
	title,
	description,
	thumbnail,
	author,
	price,
	viewStatus,
	userId,
	user,
}
```

### 게시글 삭제 `PATCH` /lectures/trash/:id

게시글 삭제시, 실제 데이터를 삭제하지 않고 viewStatus만 수정하여 평상시에 읽어오지 않게 합니다. 

```tsx
curl -X PATCH 'http://127.0.0.1:3000/lectures/trash/1' \
-H 'CSRF_TOKEN: $2a$04$BGIFcXFklqUWNxCADjPRV.xD/WPfCHhEVsXnyWiBVgYgO6tCN9hxO' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gO2aqOuvvCIsImlhdCI6MTYzNTE4MTEwOCwiZXhwIjoxNjM1MjY3NTA4fQ.B5kzSgA-To_A7MIg_S3FHlZQ7xpU9YkKra1hH62mgE4'
```

Response `200`

```tsx
{
	message
}
```

### CSRF_TOKEN `GET` /auth/csrf-token

CSRF에 대응하기 위한 한가지 방식, request에 지정한 헤더명과 토큰값이 있을때 요청을 수락합니다.
bcrypt를 활용했습니다.

```tsx
curl -X GET 'http://127.0.0.1:3000/auth/csrf-token'
```

Response `200`

```tsx
{
	csrfToken
}
```


# Question List & Memo

### single responsibility principle !
  - 하나의 책임을 가진 객체들
  - 서비스는 각 객체에게 필요한 것을 요청해서 복잡한 로직을 처리한다.


### 초기 MVC 패턴
Request(요청)를 받는 순서, 응답 할 때는 역순이다.
1. View
    - UI (User Interface): 버튼, 등의 유저에게 제공되는 컨트롤러
2. Controller 
    - View와 model 사이의 중개자.
    - view의 요청을 수행할 적절한 Model을 찾아서 값을 받고 그 값을 view에게 전달.
    - 중간에서 유효성검사
3. Model

   - **DAO**
      - DB 쿼리문과 비즈니스 로직을 둘 다 가지고 있으며 후에 DAO, Service로 분리됨
      - 하나의 테이블에 하나의 DAO (UserDAO, BoardDAO)

   - **VO**
     - 테이블의 컬럼 값을 담아서 객체로 다루기 위해 사용



### MVC 패턴 + Service

역할을 세분화 하여 구조를 더 나누고 있다. 따라서 구조의 계층이 점점 늘어난다.

**View (브라우저 UI)**

1. View → Router
    - UI 에서 서버의 Router에 요청을 보낸다.

**Server에 요청이 전달된다.**

1. Controller
    - Router의 역할을 한다. (서버에서는 UI가 없기에 View의 역할을 Router가 한다.)
        - 즉, view의 요청을 적절한 Service에게 넘겨 반환된 값을 다시 View에 넘긴다.
    - Request, Response 객체를 그대로 넘기지 않고 필요한 데이터가 규격화된 DTO를 Service에 전달
        - View와 Model을 분리하는 과정
        - 유효성검사 (더 나아가면 이를 위한 Pipe, Guard 등의 계층이 추가된다.)
        - Pipe,Guard에서 리퀘스트 데이터를 가공하여 넘겨받으면 해당 과정이 생략되기도 한다.
            - ex) queryString에 RequestDTO타입을 적용하여 유효성검사 했던 것처럼
2. Service
    - Model에서 분리된 구조, 비즈니스 로직을 담당한다.
    - View에 종속적이지 않음
        - 요청과 응답은 Controller에서만 작업하고 서비스에는 적절한 데이터가 담긴 DTO로 보내야함
    - Repository에서 반환받은 Entity를 적절한 응답 데이터를 규격화한 DTO에 담아서 반환한다.
3. Repository (DAO)
    - Model에서 분리된 구조, DB 데이터에 관한 쿼리를 관리한다.
    - 각 테이블 마다 1:1 맵핑된 Entity와, 쿼리를 실행하는 Repository를 가지고있다.
    - DAO와 Repository는 차이가 있지만 같다고 봐도 무방하다고한다.
        - Repository는 DDD에서 나온 개념이므로, 그때 다시 한번 보면 좀더 이해가 될 것 같다.
        - Repository가 여러개의 DAO를 조합해서 사용할 수 있다고 한다.

    Repository는 VO 또는 Entity를 반환한다.

    **VO**

    - 테이블의 컬럼 값을 담아서 객체로 다루기 위해 사용
    - 객체 속성과 테이블 컬럼을 1:1 맵핑한다.
    - 속성값으로 판별 (hashCode, equals) *나는 아직 VO 쓰임새에 대한 이해가 없다.

    **Entity**

    - ID로 판별, 로직을 가짐
    - VO를 대체해도 되는걸로 현재 이해하고 있다.

### **DTO**

- 요청/응답을 할 때 전송되는 데이터에 대한 규격 & MVC계층간 데이터 교환용
    - 요청: 들어오는 데이터에 대한 유효성검사
    - 응답: DB데이터를 그대로 주는 것이 아닌 적절하게 가공하여 클라이언트에게 제공한다.
    - 일반적으로 로직을 가지고있지 않음


### **Active Record & Data Mapped**

  - Active Record

    - Entity로 DB데이터 CRUD, 쿼리 수행 (Repository 필요없음)

  - Data Mapped

    - Entity는 테이블과 1:1 맵핑될뿐 DB 기능과 상관 없이 객체 자체로 사용된다.
  → 나는 이 부분 때문에 VO와 같은 것이라고 생각되는 것 같다.
  ORM을 사용하면서도 쿼리를 좀더 한 곳에 배척시킬 수 있다.
  

### DI
 - 모듈의 의존성을 외부 개체에 의해 입력으로 전달 받는 것
   - authController는 authService를 *전달 받아서 사용한다. 출처와 구현사항은 알 필요 없이 그냥 필요한것을 얻는데 사용한다.
 - [https://jsqna.com/ndp-7-dependency-injection-1/](https://jsqna.com/ndp-7-dependency-injection-1/)
 - 설계에 필요한 이유: 각 코드의 역할이 명확하므로 유지보수에 유리함
### 의존성 제어 역전
- 의존성 관리를 프로그램에 맡기는 것
- NestJS없이 제어 역전?


### Module의 정체

의존성을 관리하는(제어를 해주는) 객체 ⇒ IoC Container ⇒ Inversion of Control ⇒ 제어의 역전
Module의 구성

```tsx
@Module({
  controllers: [CatsController], // 서비스를 필요로 하는 소비자들
  providers: [CatsService,DogsService], // 서비스를 제공하는 제공자들
})

// 사실 providers의 구성은 축약된 코드였다..
// 원래는 이렇게 생겼다.
providers: [
  {
    provide: CatsService, // 이 이름으로 인스턴스를 제공할거야
    useClass: CatsService, // 이녀석을 이용해서 인스턴스를 만들거야
  },
  {
    provide: DogsService, // 이 이름으로 인스턴스를 제공할거야
    useClass: DogsService, // 이녀석을 이용해서 인스턴스를 만들거야
  },
];
```

[네스트JS 한국어 매뉴얼 사이트](https://docs.nestjs.kr/fundamentals/custom-providers)


### Authentication ( jwt와 bcrypt를 어떻게 응용 할 것이냐 )
   - 세션 / 쿠키 / 캐시
        1. 캐시는 브라우저의 빠른 렌더링을 위한 용도
            - 이미지, 오디오, 비디오 파일 등을 캐싱
            - 만료 기간이 없어 사용자가 직접 삭제 해야함
        2. 세션과 쿠키는 사용자 인증 용도
            - 쿠키는 서버가 클라이언트에게 인증 키를 넘겨 줄 때 사용하는 저장소
    - session
        1. 서버의 메모리에 사용자 인증 정보를 저장한다.
            - 쿠키의 stateless의 한계(어떤 한계?)를 보완
            - 브라우저를 종료시키기 전까지 서버를 이용해 사용자 요청에 state를 가진다.
        2. 서버가 종료되면 초기화되므로, 세션을 저장할 서버를 따로 두기도 한다. ( Redis )
        3. 쿠키에 사용자 개인 정보가 아닌 식별값만을 암호화 해서 넘겨준다.
            - 탈취한 식별값을 이용한다면 jwt와 다를게 있나?
        5. 장점: http only, 사용자데이터가 아닌 세션을 주고받으므로 비교적 안전 ??
        6. 단점: 서버에 상태가 있다. 분산형 서버라고 하더라도 요청이 세션서버에 몰려서 느려짐
    - jwt
        1. 장점: No state. 세션정보를 가지고 있을 필요 없이 시크릿 키로 검증만 하면 되므로 마이크로 서비스에 용이.
        2. 단점: 계속 주고받으므로 위험함. → 기간 만료 설정
        3. 인증 성공하면 request에 디코딩한 토큰에 들어있는 id와 token 등록하고 다음 미들웨어에 전달
        4. 어디다 저장 할 것이냐? → web=cookie, mobile=body로 받아서 모바일저장소에 저장
    - XSS 대응
        1. 로컬스토리지는 javascript로 접근 가능하므로 서버는 http only 쿠키를 사용하여 토큰을 보냄.
        2. 클라이언트가 토큰을 저장할 때 브라우저의 로컬스토리지를 사용하지 않기 위함
            - 모바일 저장소에 비해서 많이 취약하기 때문
        3. server는 클라이언트가 보낸 토큰을 req.cookies로 조회 가능
        4. 웹 브라우저가 http-only-cookie를  자동으로 저장
            - 쿠키이므로 웹 클라이언트는 header에 Authorization 설정 필요 없어짐
            - 모바일 클라이언트는 통상적으로 쿠키를 사용하지 않으므로 헤더에 Authorization 설정
        5. 클라이언트는 요청 옵션에 credentials: 'include'를 추가하면 쿠키를 헤더에 포함시킴.
        6. 개발자 도구 외에 확인 할 방법 없음
        7. 저장소 접근 방법이 없으므로, 로그아웃(토큰 제거)은 클라이언트가 서버에게 빈 토큰 쿠키를 요청해야한다.
    - CSRF 대응
        1. 클라이언트는 헤더에 커스텀 옵션(_csrk-token)을 암호화된 번호를 담아서 서버에게 보냄
        2. 서버에게 POST등의 요청을 할 때 검증된 사이트라는 알리는 키를 커스텀 헤더에 포함해야함.

- session과 JWT의 인증 방식 차이점에 대해
     - session도 결국 JWT처럼 쿠키를 이용해 브라우저에 session id를 저장하고 이를 탈취당하면 해커가 계정을 사용 할 수 있을 것 같은데
     - JWT가 http-only 옵션을 이용하고, 사용자 정보도 최소한의 것만 포함시키면 세션이 어떤 점에서 JWT보다 보안에 더 유리 할 수 있을까?

- CORS
    - 브라우저에서만 가지고있는 정책
    - 같은 도메인이 아니면 파일을 주고받을 수 없음
    - 다른 도메인을 허락하기 위해 서버에서 응답 헤더에 Access-Control-Allow-Origin 추가

    ```tsx
    app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http...');
    res.setHeader(
    	'Access-Control-Allow-Methods',
    	'OPTIONS, GET, POST, PUT, DELETE');
    next();
    });
    ```

    - cors express의 미들웨어 사용

    ```tsx
    app.use(
    	cors({
    		origin: [url],
    		credentials: true, // 헤더에 토큰등의 정보를 추가하는 것을 허용
    	})
    );
    ```

- CanActivate ?
	- Guard를 구현할 때 필요
	- Execution Context를 매개변수로 받음

- reflector ?

### config 파일 만들기
일반 ts파일에서 process.env 접근 안되는 이유?
1. process.env 접근하는 방법 (1)
```tsx
import { ConfigModule } from '@nestjs/config'
ConfigModule.forRoot();
```
2. nestjs 내장 라이브러리 namespace 사용하기
```tsx
// configs/db-config.ts 
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432
}));

// app.module.ts
import dbconfig from 'configs/db-config.ts';
...
imports: [
    ConfigModule.forFeature(dbconfig)
]

// servise.ts
constructor(
  @Inject(databaseConfig.KEY)
  private dbConfig: ConfigType<typeof databaseConfig>,
) {
	dbConfig.host
}

```

### dotenv
  - 운영체제 환경변수를 직접 설정하지 않아도 .env파일을 자동으로 읽어 설정해주는 라이브러리
  원래는 터미널에서 export DB_USER=hostname 설정 후에 process.env.DB_USER를 쓸 수 있다.

### Mapped Type - Partial
```tsx
// 모든 속성이 선택사항으로 설정된 타입(클래스)을 반환
export class UpdateCatDto extends PartialType(CreateCatDto) {}
```

### Type? Interface? Class?
  - type: 데이터 정의,
  - interface: 클래스 규격사항 정의
  - class: NestJS에서 DTO를 만들때 권장됨

### Jest 절대경로 설정
``` tsx
  // package.json
  "rootDir": "src",
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>$1"
  }
```
``` tsx
  // jest-e2e-.json
  "rootDir": ".",
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
```

### 기타

- Where should i handle Exception Error
  [일단 컨트롤러에서 처리하자](https://stackoverflow.com/questions/29731353/what-are-the-best-practices-to-handle-exception-at-controller-service-and-dao-l)

  추후 수정하기 [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)

  - CustomPipe

- 들어온 값이 custom type에 해당하는지 체크하기 위해서는?

- 유효성 검사 방식 (pipe, decorator)

- 파일명은 단수? 복수? Product? Products?
일단 단수로 사용해보자 [단수? 복수?](https://www.it-gundan.com/ko/sql/%ED%85%8C%EC%9D%B4%EB%B8%94-%EB%AA%85%EB%AA%85-%EB%94%9C%EB%A0%88%EB%A7%88-%EB%8B%A8%EC%88%98-%EB%8C%80-%EB%B3%B5%EC%88%98-%EC%9D%B4%EB%A6%84/958085184/)

- database 관련 (entity) 파일은 어디에 위치해야할까?
익스프레스에서는 모든 sequlize entity 파일을 db폴더에 두고 관리했었음.

- save-dev

- 내부 함수는 클래스 밖에둬서 this없이 써도 되나?

- passport란?

- sliding session

- access token

- ~~useGuards 에서 cookie 검사 추가 하는 법~~ (완료)

- joi
