import { utilService } from "../services/util.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";

const { useRef } = React;

export function About() {
  const titleRef = useRef();
  return (
    <section className="about">
      <h1 ref={titleRef}>About miss books and us...</h1>
      <LongTxt txt={utilService.makeLorem(750)} length={500} />
      <button
        onClick={() => {
          utilService.animateCSS(titleRef.current);
        }}
      >
        Animate
      </button>
    </section>
  );
}
