import cookieParser from "cookie-parser";
import exp, {
  Request,
  RequestHandler,
  ErrorRequestHandler,
  Response,
  NextFunction,
} from "express";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";

const app = exp();

app.use(exp.json()); // Body Parser
app.use(exp.urlencoded({ extended: false }));
app.use("/", exp.static("./public"));
app.use(cookieParser("SECRET"));
app.use(
  session({
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

declare global {
  namespace Express {
    export interface Response {
      baoBabTree: "babTree";
    }
    export interface Request {
      baoBabTree: "babTree";
    }
  }
}

// 미들웨어는 RequestHandler 타입이다.
const middleware: RequestHandler<
  { paramType: string },
  { message: string },
  { bodyType: number },
  { queryType: boolean },
  { localType: unknown }
> = (req, res, next) => {
  req.params.paramType;
  req.body.bodyType;
  req.query.queryType;
  res.locals.localType;
  res.json({
    message: "hello",
  });
  req.baoBabTree;

  req.flash("플래시메시지");
  req.flash("1회성", "플래시메시지");
  req.flash();

  req.session;
  req.user?.baoBabTree;
  //   declare global {  types.d.ts
  //     namespace Express {
  //       interface User {
  //         baoBabTree: string;
  //       }
  //     }
  //   }
  //   export {};
};
app.get("/", middleware);
// app.get("/", (req, res) => {

// }, cors(), multer(), (req, res) => {

// }, (req, res) => {

// });

declare global {
  interface Error {
    status: number;
    // Error는 lib이라서 import 안해도 사용 가능
  }
  // 혹여 import { ... , Error } from 'xxx'처럼 사용할 경우, 충돌을 대비해 declare global 사용, namespace까지 같이있다면 같이 사용
}

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Express.Response, // 🔥
  next: NextFunction
) => {
  console.log(err.status);
};
app.use(errorMiddleware);

app.listen(8080, () => {});
