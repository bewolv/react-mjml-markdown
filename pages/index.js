import Editor from "rich-markdown-editor";

export default () => {
  const [markdown, updateMarkdown] = React.useState();
  const [html, updateHtml] = React.useState("");
  const [isPreviewMode, updateIsPreviewMode] = React.useState(true);

  return (
    <>
      <div className="root">
        <div className="left-side-container">
          <Editor
            onChange={(getValue) => {
              const value = getValue();
              updateMarkdown(value);
            }}
            onSave={() =>
              fetch(`/api/generatehtml`, {
                method: "POST",
                body: JSON.stringify({
                  markdown,
                }),
              })
                .then((res) => res.json())
                .then((res) => updateHtml(res.html))
            }
          />
        </div>
        <div className="right-side-container">
          {isPreviewMode ? (
            <iframe srcDoc={html} className="preview-mode" />
          ) : (
            <div className="html-mode">{html}</div>
          )}
        </div>
      </div>
      <div className="controls-container">
        <button onClick={() => updateIsPreviewMode(!isPreviewMode)}>
          {isPreviewMode ? "HTML" : "PREVIEW"}
        </button>
      </div>
      <style jsx>{`
        .root {
          display: flex;
        }
        .left-side-container {
          width: 50%;
          padding: 40px;
          height: calc(100vh - 80px);
          overflow: scroll;
        }
        .right-side-container {
          width: 50%;
          background: #24354b;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .right-side-container .preview-mode {
          height: 99%;
          width: 99%;
          border: none;
          background: #fff;
        }
        .right-side-container .html-mode {
          padding: 20px;
          height: 100vh;
          white-space: pre-wrap;
          overflow: scroll;
        }
        .controls-container {
          position: fixed;
          top: 10px;
          right: 10px;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </>
  );
};
