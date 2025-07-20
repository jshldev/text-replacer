import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [replaceThis, setReplaceThis] = useState("");
  const [withThis, setWithThis] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [usePercentS, setUsePercentS] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // 處理 Replace this input 變化
  const handleReplaceThisChange = (e) => {
    setReplaceThis(e.target.value);
  };

  // 處理 With this input 變化
  const handleWithThisChange = (e) => {
    setWithThis(e.target.value);
  };

  // 處理 textarea 變化
  const handleTextareaChange = (e) => {
    setTextareaContent(e.target.value);
  };

  // 處理忽略大小寫 checkbox 變化
  const handleIgnoreCaseChange = (e) => {
    setIgnoreCase(e.target.checked);
  };

  // 處理使用 %s checkbox 變化
  const handleUsePercentSChange = (e) => {
    setUsePercentS(e.target.checked);
    if (e.target.checked) {
      setReplaceThis("%s");
    } else if (replaceThis === "%s") {
      setReplaceThis("");
    }
  };

  // 清空所有輸入
  const handleClearAll = () => {
    setTextareaContent("");
    setReplaceThis("");
    setWithThis("");
    setUsePercentS(false);
    setIgnoreCase(false);
  };

  // 替換邏輯
  const resultText = replaceThis
    ? textareaContent.replace(
        new RegExp(
          replaceThis.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          ignoreCase ? "gi" : "g"
        ),
        withThis || ""
      )
    : textareaContent || "[請輸入內容]";

  // 自動複製到剪貼簿
  useEffect(() => {
    if (resultText && resultText !== "[請輸入內容]") {
      navigator.clipboard
        .writeText(resultText)
        .catch((err) => console.error("自動複製失敗:", err));
    }
  }, [resultText]);

  // 手動複製按鈕
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
      })
      .catch((err) => {
        console.error("複製失敗:", err);
        setShowCopyMessage(false);
      });
  };

  return (
    <div className="container">
      <h1>文字替換工具</h1>
      <div className="input-group">
        <label htmlFor="textareaInput">內容</label>
        <textarea
          id="textareaInput"
          value={textareaContent}
          onChange={handleTextareaChange}
          placeholder="輸入原始內容"
          rows="5"
        />
      </div>
      <div className="input-group">
        <div className="label-group">
          <label htmlFor="replaceThis">Replace this</label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={usePercentS}
              onChange={handleUsePercentSChange}
            />
            使用 %s
          </label>
        </div>
        <input
          id="replaceThis"
          type="text"
          value={replaceThis}
          onChange={handleReplaceThisChange}
          placeholder="輸入要查找的文字"
          autoComplete="off"
        />
      </div>
      <div className="input-group">
        <label htmlFor="withThis">With this</label>
        <input
          id="withThis"
          type="text"
          value={withThis}
          onChange={handleWithThisChange}
          placeholder="輸入要替換成的文字"
          autoComplete="off"
        />
      </div>
      <div className="input-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={handleIgnoreCaseChange}
          />
          忽略大小寫
        </label>
      </div>
      <div className="result">
        <h2>結果</h2>
        <p>{resultText}</p>
        <div className="button-group">
          <button className="copy-button" onClick={handleCopyClick}>
            複製結果
          </button>
          <button className="clear-button" onClick={handleClearAll}>
            清空所有
          </button>
        </div>
        {showCopyMessage && <p className="copy-message">已複製到剪貼簿！</p>}
      </div>
    </div>
  );
}

export default App;
