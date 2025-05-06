import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('10%');
  const [split, setSplit] = useState(1);
  const [splitTotal, setSplitTotal] = useState('--');

  function handleBillChange(e) {
    setBill(e.target.value);
  }

  function handleTipChange(e) {
    let value = e.target.value.replace(/%/g, '');
    if (!isNaN(value) && value !== '') {
      setTip(value + '%');
    } else {
      setTip('%');
    }
  }

  function splitMinus() {
    setSplit((oldValue) => Math.max(oldValue - 1, 1));
  }

  function splitPlus() {
    setSplit((oldValue) => oldValue + 1);
  }

  function calculate() {
    const numericBill = parseFloat(bill);
    const parsedTip = parseFloat(tip.replace('%', ''));

    if (isNaN(numericBill) || isNaN(parsedTip) || numericBill < 0 || parsedTip < 0) {
      setSplitTotal('--');
      return;
    }

    const percentage = 1 + parsedTip / 100;
    const result = ((numericBill * percentage) / split).toFixed(2);
    setSplitTotal(result);
  }

  useEffect(() => {
    calculate();
  }, [bill, tip, split]);

  return (
    <div>
      <label>Bill Total</label>
      <input
        type="text"
        placeholder="0.00"
        value={bill}
        onChange={handleBillChange}
      />

      <label>Tip Percentage</label>
      <input
        type="text"
        placeholder="10%"
        value={tip}
        onChange={handleTipChange}
      />

      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-control">
            <button onClick={splitMinus}>-</button>
            <span>{split}</span>
            <button onClick={splitPlus}>+</button>
          </div>
        </div>

        <div className="result">
          <label>Split Total</label>
          <span>{splitTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
