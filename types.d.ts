declare global {
  interface Error {
    status: number;
    // Error는 lib이라서 import 안해도 사용 가능
  }
  // 혹여 import { ... , Error } from 'xxx'처럼 사용할 경우, 충돌을 대비해 declare global 사용, namespace까지 같이있다면 같이 사용
}

declare global {
  namespace Express {
    interface User {
      baoBabTree: string;
    }
  }
}

declare module "connect-flash" {
  global {
    // req.flash("플래시메시지"); 🟠 부분
    namespace Express {
      interface Request {
        flash(message: string);
        flash(event: string, message: string): void;
        flash(): { [key: string]: string[] }; // 인덱스드 시그니처
        // 맵드 시그니처(key를 줄일 수 있음)
        // type Q = "Human" | "Mammal" | "Animal"; // interface는 |, & 사용이 안됨, type만 가능
        // type C1 = { [key in Q]: number };
      }
    }
  }

  import express = require("express");
  function flash(): express.RequestHandler; // RequestHandler 미들웨어 타입
  import exp, { Response, NextFunction } from "express";
  // exp: default export, { Response, NextFunction }: named export
  export default flash;
} // app.use(flash()); 미들웨어 장착 부분 🟠
export {};
// 바깥에 import 혹은 export문이 있어야 declare global을 사용했을 떄 type 인식이 된다.
