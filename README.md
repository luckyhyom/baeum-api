<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

여러 강의를 들으며 지속적으로 리팩토링 하게 될 학습형 프로젝트 입니다.

- 학습한 것을 실제로 사용 및 응용
- 좋은 설계를 위한 리팩토링 훈련

## Question List
- 파일명은 단수? 복수? Product? Products?
일단 단수로 사용해보자 [단수? 복수?](https://www.it-gundan.com/ko/sql/%ED%85%8C%EC%9D%B4%EB%B8%94-%EB%AA%85%EB%AA%85-%EB%94%9C%EB%A0%88%EB%A7%88-%EB%8B%A8%EC%88%98-%EB%8C%80-%EB%B3%B5%EC%88%98-%EC%9D%B4%EB%A6%84/958085184/)

- Type? Interface? class?
type: 데이터 정의,
interface: 클래스 규격사항 정의
? class: NestJS에서 DTO를 만들때 권장됨

- Model? entity? DTO? 따로 만들어야 하는건가?
  1. nest에서 class사용을 권장함
  2. entity가 아닌 dto를 주고 받아야 한다?
  3. 유효성 검사를 한 DTO의 데이터로 Model을 완성시킨다?
model(entity): DB와 1:1 매핑되는 데이터
DTO: 데이터를 네트워크로 주고받을 때의 규격사항, 유효성 검사를 한다.

- Where should i handle Exception Error
  [일단 컨트롤러에서 처리하자](https://stackoverflow.com/questions/29731353/what-are-the-best-practices-to-handle-exception-at-controller-service-and-dao-l)

  추후 수정하기 [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)

  - CustomPipe

- 들어온 값이 custom type에 해당하는지 체크하기 위해서는?

- import의 비용은?

- 유효성 검사 방식 (pipe, decorator)

- database 관련 (entity) 파일은 어디에 위치해야할까?
익스프레스에서는 모든 sequlize entity 파일을 db폴더에 두고 관리했었음.

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
