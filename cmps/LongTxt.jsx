const { useState, useEffect } = React;

export function LongTxt({ txt = "", length = 100 }) {
  const [isLongTxtShown, setIsLongTxtShown] = React.useState(false);
  let txtActualLength = txt.length;

  useEffect(() => {
    txtActualLength = txt.length;
  }, [txt]);

  if (!txt || typeof txt !== "string") return <div>No text provided</div>;
  return (
    <section className="long-txt">
      {txtActualLength <= length && (
        <p>
          {txt}
          <br />
        </p>
      )}
      {txtActualLength > length && (
        <p>
          {isLongTxtShown ? txt : txt.substring(0, length) + "..."}
          <br />
          <button onClick={() => setIsLongTxtShown(!isLongTxtShown)}>
            {isLongTxtShown ? "Show Less" : "Show More"}
          </button>
        </p>
      )}
    </section>
  );
}
