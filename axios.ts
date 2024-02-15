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
