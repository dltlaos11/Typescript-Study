// import * as React from "react";
// import React from "react";

import React, {
  useState,
  useCallback,
  useRef,
  FunctionComponent,
  ReactElement,
  FC,
  ReactNode,
  useEffect,
  FormEvent,
  MouseEvent,
} from "react";
// JSX.Element는 import할 필요 ❌
// import { useState, useCallback, useRef } from "react";

interface P {
  name: string;
  title: string;
  children?: ReactNode | undefined;
}

const WordRelay: FC<P> = (props) => {
  // const WordRelay: FunctionComponent<P> = (props) => {
  // const WordRelay = (props: P): ReactElement | JSX.Element => {
  const [word, setWord] = useState<string>("bao");
  // const [word, setWord] = useState<'bao'>("bao"); // 절대 변하지 않는다면 이렇게도 가능
  const [word1, setWord1] = useState(() => {
    return "bao";
  });
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const HeadInputEl = useRef<HTMLHeadElement>(document.querySelector("head"));
  const MutaHeadInputEl = useRef<HTMLHeadElement>(
    document.querySelector("head")!
  );

  const mutaRef = useRef<number>(0);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {}, []);

  const onSubmitForm = useCallback<
    (e: React.FormEvent<HTMLFormElement>) => void
  >(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const deps: readonly any[] = [];
  useEffect(() => {
    // const finc = async () => {
    //     await axios.post();
    // }
    // finc();
    setWord((prev) => {
      return prev + 2;
    });
    console.log("useEffect"); // 처음 호출

    return () => {
      console.log("Lifecycle cleanup"); // 끝날 떄 호출
    };
  }, deps);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
