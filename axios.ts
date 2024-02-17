import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
} // 객체지향적
// type Post = {userId: number, id: number, title: string, body: string} // type alias, 간단
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: number;
}

interface Config<D = any> {
  method?: "post" | "get" | "put" | "delete" | "head" | "options";
  // method?: string; 타입은 좁히는 것이 좋다.
  url?: string;
  data?: D;
}

(async () => {
  // try {
  //   const res = await axios.get<Post>(
  //     "https://jsonplaceholder.typicode.com/posts/1"
  //   );
  //   console.log(res.data);
  //   console.log(res.data.userId);
  //   console.log(res.data.id);
  //   console.log(res.data.title);
  //   console.log(res.data.body);
  // } catch (error) {}
  try {
    const res = await axios.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const res2 = await axios.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    const res3 = await axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    const res4 = await axios("https://jsonplaceholder.typicode.com/posts/", {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
  } catch (error) {
    // console.log((error as AxiosError).response?.data);
    // error.response?.data; //error'은(는) 'unknown' 형식, ts는 건망증이 심하다.

    const errResponse = (error as AxiosError).response;
    console.error(errResponse?.data);
    errResponse?.data; // const errResponse: AxiosResponse<unknown, any> | undefined

    if (error instanceof AxiosError) {
      error.response; // (local var) error: AxiosError<any, any> 보장이 된다.
    }
    // export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
    if (axios.isAxiosError<{ message: string }>(error)) {
      console.error(error.response?.data.message);
    }

    if (axios.isAxiosError(error)) {
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
  }
})();

interface A {
  get: <T = any, R = AxiosResponse<T>>(url: string) => Promise<R>;
  // res.data가 T, 응답 자체는 AxiosResponse 이므로 AxiosResponse을 제네릭 변수로 저장한 Promise<R>이 return값
  // T=any, 코드에 제네릭을 안쓰고 싶을수도 있으니 T에도 any부여
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D
  ) => Promise<R>;
  // await이 붙을 수 있다면, return 값은 Promise. Promise는 ts에서 기본적으로 제공을 해줌.

  //   interface Promise<T> {
  //     /**
  //      * Attaches callbacks for the resolution and/or rejection of the Promise.
  //      * @param onfulfilled The callback to execute when the Promise is resolved.
  //      * @param onrejected The callback to execute when the Promise is rejected.
  //      * @returns A Promise for the completion of which ever callback is executed.
  //      */
  //     then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

  //     /**
  //      * Attaches a callback for only the rejection of the Promise.
  //      * @param onrejected The callback to execute when the Promise is rejected.
  //      * @returns A Promise for the completion of the callback.
  //      */
  //     catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
  // }
  /*
지금까지 axios타입분석에서 왜 data=any를 할당했는지에 대한 이유
post: <T, R = AxiosResponse<T>, D>(url: string, data: D) => Promise<R>;
Error: 필수 형식 매개 변수는 선택적 형식 매개 변수 다음에 올 수 없습니다.❌
R = AxiosResponse<T>: 선택적, D: 필수
a.post<Created, Data> -> AxiosResponse가 없어도 된다.
post: <T, R = AxiosResponse<T>, D=any> -> 기본타입 any로 필수를 선택으로 변경
*/
  (config: Config): void;
  (url: string, config: Config): void;
  isAxiosError: (error: unknown) => error is AxiosError;
  // 같은 변수명이면 오버로딩되기에 다른파일에 있는 타입이 영향을 미칠 수 있다. 🟠
  // export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
}

const jyjaxios: A = axios;

(async () => {
  try {
    const res = await jyjaxios.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const res2 = await jyjaxios.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    const res3 = await jyjaxios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    const res4 = await jyjaxios("https://jsonplaceholder.typicode.com/posts/", {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
  } catch (error) {
    const errResponse = (error as AxiosError).response;
    console.error(errResponse?.data);
    errResponse?.data; // const errResponse: AxiosResponse<unknown, any> | undefined

    if (error instanceof AxiosError) {
      error.response; // (local var) error: AxiosError<any, any> 보장이 된다.
    }

    if (jyjaxios.isAxiosError(error)) {
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
  }
})();
