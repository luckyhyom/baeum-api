<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description


여러 강의를 들으며 지속적으로 리팩토링 하게 될 학습형 프로젝트 입니다.

- 학습한 것을 실제로 사용 및 응용
- 좋은 설계를 위한 리팩토링 훈련

## Question List & Memo

- 절대경로 설정
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


- single responsibility principle !
  - 하나의 책임을 가진 객체들
  - 서비스는 각 객체에게 필요한 것을 요청해서 복잡한 로직을 처리한다.

- Type? Interface? Class?
  - type: 데이터 정의,
  - interface: 클래스 규격사항 정의
  - class: NestJS에서 DTO를 만들때 권장됨

- Authentication ( jwt와 bcrypt를 어떻게 응용 할 것이냐 )
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

- Model? entity? DTO? 따로 만들어야 하는건가?
  1. nest에서 class사용을 권장함
  2. entity가 아닌 dto를 주고 받아야 한다?
  3. 유효성 검사를 한 DTO의 데이터로 Model을 완성시킨다?
model(entity): DB와 1:1 매핑되는 데이터
DTO: 데이터를 네트워크로 주고받을 때의 규격사항, 유효성 검사를 한다.

- config 파일 만들기, 일반 ts파일에서 process.env 접근 안되는 이유?
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

- dotenv
  - 운영체제 환경변수를 직접 설정하지 않아도 .env파일을 자동으로 읽어 설정해주는 라이브러리
  원래는 터미널에서 export DB_USER=hostname 설정 후에 process.env.DB_USER를 쓸 수 있다.

- Mapped Type - Partial
```tsx
// 모든 속성이 선택사항으로 설정된 타입(클래스)을 반환
export class UpdateCatDto extends PartialType(CreateCatDto) {}
```

- Module의 정체

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

- DI
    - 모듈의 의존성을 외부 개체에 의해 입력으로 전달 받는 것
        - authController는 authService를 *전달 받아서 사용한다. 출처와 구현사항은 알 필요 없이 그냥 필요한것을 얻는데 사용한다.
    - [https://jsqna.com/ndp-7-dependency-injection-1/](https://jsqna.com/ndp-7-dependency-injection-1/)
    - 설계에 필요한 이유: 각 코드의 역할이 명확하므로 유지보수에 유리함
- 의존성 제어 역전
	- 의존성 관리를 프로그램에 맡기는 것
    - NestJS없이 제어 역전?

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

- 변수명 수정하기가 번거롭다.
status: string을 viewStatus: boolean으로 변경하기 위한 과정이 번거롭다.

- service와 repository 차이
repository: db에 접근하는 객체
service: 비즈니스 로직 실행 객체

- updateDTO request 아무값 넣지 않았을때 에러처리 하는 방법

- save-dev

- 내부 함수는 클래스 밖에둬서 this없이 써도 되나?

- 에러 던진 후 서버 안죽는 법은? (로그인)

- passport란?

## TODO
- config 내장 라이브러리 사용하기
- sliding session
- access token
- ~~useGuards 에서 cookie 검사 추가 하는 법~~ (완료)
- express용 Req()없이 cookie 이용 하기 (일부 적용)
- joi 적용

## comments
- lecture-status-validation.pipe.ts
  - 커스텀 타입의 status 값을 배열 대신 객체로 선언하고 싶었고, 고민 끝에 모델에 상수를 선언하여 씀. (임포트 하는게 메모리 비용이 더 비쌀수도 있다.)

## 학습자료
- DreamCoding Ellie's Nodejs
- DreamCoding Ellie's TypeScript
- Nomad Coder's NestJS
- John Ahn's NestJS
- NestJS Offilcial Lecture

## Scheduler
[Task List](https://docs.google.com/spreadsheets/d/18JKjdmzfDFWJOE5eyLeBO9D9hJ33JBrW7tyZJU244-E/edit?usp=sharing)

# 기능 목록

TODO: Error Code

### 회원

- 회원 가입
    - SNS
    - Github
- 나의 프로필
    - 이름
    - 소개
    - 이메일
    - 사진
- 회원정보 수정
- 나의 강의
    - 수강중인 강의
    - 결제 내역
    - 위시 리스트
- 로그인
- 로그아웃

## User Schema

```tsx
type user = {
	id: number,
	userId: string,
	password: string,
	name: string,
	about: string,
	email: string,
	photoURL: string,
	admin: boolean,
}	
```

### Token

```tsx
{
	jwt: string,
	username: string,
}
```

## Auth API

### 회원 가입 `POST` /auth/signup

Request

```tsx
{
	userId: string,
	password: string,
	name: string,
	about: string,
	email: string,
	photoURL: string,
}
```

Response `201`

```tsx
{
	jwt: string,
	username: string,
}
```

### 회원 정보 수정 `POST` /auth

Request

```tsx
{
	password: string,
	name: string,
	about: string,
	email: string,
	photoURL: string,
}
```

Response `200`

```tsx
{
	name: string,
	about: string,
	email: string,
	photoURL: string,
}
```

### 회원 정보 조회 `GET` /auth/:id

Response `200`

```tsx
{
	name: string,
	about: string,
	email: string,
	photoURL: string,
}
```

### 나의 강의 `GET` /lecture/mine/:id

Response `200`

```tsx
{
	[ lecture, lecture ... ],
}
```

### 로그인 `POST` /auth/login

Request

```tsx
{
	userId: string,
	password: string,
}
```

Response `200`

```tsx
{
	jwt: string,
	name: string,
}
```

### 로그아웃 `POST` /auth/logout

Request & Response `200`

```tsx
{
	undefined
}
```

### 회원 탈퇴 `POST` /auth/:id

Request

```tsx
{
	userId: string,
	password: string,
}
```

Response `204`

## 상품

- 쓰기
    - 설명 글
    - 공개 or 비공개
- 읽기
    - 챕터 리스트
    - 각 챕터 상세보기 (영상 + 글)
        - 강의를 구매한 사용자만 읽기 가능
    - 진도율
        - 각 영상 진도율 표시
        - 각 영상 진도율 100%면 완료 표시
        - 전체 챕터 진도율
- 수정
- 삭제
- 검색
    - 태그
    - 정렬 옵션 (평점순, 조회순)
- 찜하기
- 내 목록
- 구매하기
- 평점

### Lecture Schema

```tsx
type Lecture = {
	id: number,
	author: number,
	title: string,
	description: string,
	chapters: Chapter[],
	tags: string[],
	rate: number,
	state: boolean,
}
```

### Chapter Schema

```tsx
type Chapter = {
	title: string,
	description: string,
	videoURL: string,
}
```

### Wish Schema

```tsx
type Wish = {
	id: number,
	userId: number,
	lectureId: number,
}
```

### WatchingLecture Schema

```tsx
type WatchingVideo = {
	id: number,
	userId: number,
	lectureId: number,
}
```

### PurchasedLecture Schema

```tsx
type purchasedLecture = {
	id: number,
	userId: number,
	lectureId: number,
}
```

## Lecture API

- 쓰기
    - 제목
    - 설명
    - 챕터
    - 공개 or 비공개
- 읽기
    - 챕터 리스트
    - 각 챕터 상세보기 (영상 + 글)
        - 강의를 구매한 사용자만 읽기 가능
- 수정
- 삭제
- 검색

### 강의 등록 `POST` /lecture

Request

```tsx
{
	author: number,
	title: string,
	description: string,
	chapters: [
		{ 
			title: string,
			description: string,
			videoURL: string,
		},
		...
	],
	tags: string[],
	state: boolean,
}
```

Response `201`

### 강의 전체보기 `GET` /lecture

Response `200`

```tsx
{
		[ lecture, lecture ... ]
}	
```

### 강의 상세보기 `GET` /lecture/:id

Response `200`

```tsx
{
	...lecture
}
```

### 강의 수정 `POST` /lecture

Request

```tsx
{
	author: number,
	title: string,
	description: string,
	chapters: [
		{
			title: string,
			description: string,
			videoURL: string,
		},
		...
	],
	tags: string[],
	state: boolean,
}
```

Response `200`

### 강의 삭제 `DELETE` /lecture/:id

Response `204`

### 강의 검색 `GET` /lecture/search?title=

Response `200`

```tsx
{
	[ lecture, lecture ... ]
}
```

### 강의 읽기 권한 확인 `POST` /lecture/checking/:id

Request

```tsx
{
	jwt: string,
}
```

Response `200`

### 강의 읽기 권한 등록 `POST` /lecture/checking

Request

```tsx
{
	userId: number,
	lectureId: number,
}
```

Response `200`
