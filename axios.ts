import axios, { AxiosResponse } from "axios";

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
  } catch (error) {}
})();
