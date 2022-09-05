# Typescript-Study

ts를 써야하는 이유는 안정성이 늘어난다.
안정성이 늘어나면 -> 에러가 줄어든다.

js에 비해 자유도는 줄어든다.

공식문서 Handbook읽기, TS ver1.1부터 최신 버전까지 읽어보기

# 기본지식

메인 룰: <b>typescript는 최종적으로 javascript로 변환된다.</b> 순전한 typescript 코드를 돌릴 수 있는 것은 deno이나 대중화 되지 않았음. 브라우저, 노드는 모두
js파일을 실행한다.

typescript는 언어이자 컴파일러(`tsc`)이다. 컴파일러는 ts코드를 js코드로 바꿔준다. (코드 변환 역할)

`tsc`는 `tsconfig.json`(`tsc --init` 시 생성)에 따라 ts 코드를 js(`tsc` 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 `tsconfig.json` 설정을 반드시 거쳐야 한다.

`tsc`는 코드 자체의 타입 검사하는 역할도 한다. `tsc --noEmit` 으로 실행

ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.
