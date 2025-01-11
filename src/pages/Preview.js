import { MainContent } from "../main";
import { MyContext } from "../App";
import "../styles/slider.css";
import { useState, useEffect, useCallback, useContext, memo } from "react";

function Preview() {
  const { query, order } = useContext(MyContext);

  return (
    <>
      <div>hello this is preview</div>
    </>
  );
}

const MemoizedPreview = memo(Preview);

export { MemoizedPreview as Preview };
