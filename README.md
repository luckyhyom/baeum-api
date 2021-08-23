<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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


## 학습자료
- DreamCoding Ellie's Nodejs
- DreamCoding Ellie's TypeScript
- Nomad Coder's NestJS
- John Ahn's NestJS
- NestJS Offilcial Lecture