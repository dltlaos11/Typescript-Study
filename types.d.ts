declare global {
  interface Error {
    status: number;
    // Error는 lib이라서 import 안해도 사용 가능
  }
  // 혹여 import { ... , Error } from 'xxx'처럼 사용할 경우, 충돌을 대비해 declare global 사용, namespace까지 같이있다면 같이 사용
}

export {};
// 바깥에 import 혹은 export문이 있어야 declare global을 사용했을 떄 type 인식이 된다.
