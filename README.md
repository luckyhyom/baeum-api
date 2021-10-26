# Baeum API


[직접 배포한 웹사이트](https://www.makevalue.net/) \
회원 가입 후 JWT와 함께 터미널에 입력하면 게시글이 생성됩니다.

```tsx
curl -X POST 'https://www.makevalue.net/api/lectures' \
-H 'CSRF_TOKEN: $2a$04$BGIFcXFklqUWNxCADjPRV.xD/WPfCHhEVsXnyWiBVgYgO6tCN9hxO' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{
    "title": "No.1 Linux 강의!",
    "description": "JS 스터디셀러라구!!",
    "thumbnail": "https://cdn.inflearn.com/public/course-325918-cover/f641b64b-1d8d-41f7-a159-10579aac950b",
    "price": 21000
}'
```

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

### 유닛 테스트

src/lecture/lecture.repository.spec.ts, 등..

```tsx
npm run test
```
