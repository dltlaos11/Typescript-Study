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
  const [word, setWord] = useState<string>("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
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
