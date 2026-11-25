import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);

  // Number button
  const handleNumber = (num) => {
    if (waiting) {
      setDisplay(num);
      setWaiting(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  // Decimal button
  const handleDecimal = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Calculation function
  const calculateResult = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;

      case "-":
        return a - b;

      case "×":
        return a * b;

      case "÷":
        return b === 0 ? "Error" : a / b;

      default:
        return b;
    }
  };

  // Operator button
  const handleOperator = (op) => {
    const input = parseFloat(display);

    if (operator && !waiting) {
      const result = calculateResult(
        firstNumber,
        input,
        operator
      );

      if (result === "Error") {
        setDisplay("Error");
        setFirstNumber(null);
        setOperator(null);
        setWaiting(true);
        return;
      }

      setDisplay(String(result));
      setFirstNumber(result);
    } else {
      setFirstNumber(input);
    }

    setOperator(op);
    setWaiting(true);
  };

  // Equal button
  const handleEqual = () => {
    if (operator === null || firstNumber === null) return;

    const secondNumber = parseFloat(display);

    const result = calculateResult(
      firstNumber,
      secondNumber,
      operator
    );

    setDisplay(
      result === "Error"
        ? "Error"
        : String(Number(result.toPrecision(12)))
    );

    setFirstNumber(null);
    setOperator(null);
    setWaiting(true);
  };

  // Clear button
  const clear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaiting(false);
  };

  // Percentage
  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  // Backspace
  const backspace = () => {
    if (waiting) return;

    setDisplay(
      display.length > 1
        ? display.slice(0, -1)
        : "0"
    );
  };

  const buttons = [
    { label: "AC", type: "special", action: clear },
    { label: "⌫", type: "special", action: backspace },
    { label: "%", type: "special", action: percentage },
    { label: "÷", type: "operator", action: () => handleOperator("÷") },

    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "×", type: "operator", action: () => handleOperator("×") },

    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "-", type: "operator", action: () => handleOperator("-") },

    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "+", type: "operator", action: () => handleOperator("+") },

    { label: "0", type: "zero", action: () => handleNumber("0") },
    { label: ".", action: handleDecimal },
    { label: "=", type: "equal", action: handleEqual },
  ];

  return (
    <div className="container">
      <div className="calculator">

        <div className="header">
          <h2>Calculator</h2>
          <span>✦</span>
        </div>

        <div className="display">
          <p>YOUR RESULT</p>
          <h1>{display}</h1>
        </div>

        <div className="buttons">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={btn.type || ""}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <p className="footer">
          Designed with React ✨
        </p>

      </div>
    </div>
  );
}

export default App;