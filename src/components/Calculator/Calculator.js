import React, { useState } from 'react';

import './Calculator.css';

const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];

function Calculator() {
  const [operandA, setOperandA] = useState('');
  const [operator, setOperator] = useState('');
  const [operandB, setOperandB] = useState('');
  const [result, setResult] = useState('');

  function inputOperand(operand) {
    if (!operator) {
      setOperandA(operandA + operand);
    } else {
      setOperandB(operandB + operand);
    }
  }

  function inputOperator(operator) {
    if (!operandA) return;
    setOperator(operator);
  }

  function evaluate() {
    // if no operands or operator, return
    if (!operandA || !operandB || !operator) return;
    // parse operands
    const intA = parseInt(operandA);
    const intB = parseInt(operandB);
    // parse operation
    let res;
    if (operator === '+') res = intA + intB;
    else if (operator === '-') res = intA - intB;
    else if (operator === '*') res = intA * intB;
    else if (operator === '/') res = intA / intB;
    // set result
    setResult(res);
  }

  function clear() {
    setOperandA('');
    setOperator('');
    setOperandB('');
    setResult('');
  }

  return (
    <div className="Calculator widget">
      <h1>Calculator</h1>
      <div className="button-list">
        {
          operands.map((o, i) =>
            <button key={`calculator-operandbutton${i}`} onClick={() => inputOperand(o)}>{o}</button>
          )
        }
        {
          operators.map((o, i) =>
            <button key={`calculator-operatorbutton${i}`} onClick={() => inputOperator(o)}>{o}</button>
          )
        }
        <button onClick={evaluate}>=</button>
        <button onClick={clear}>Clear</button>
      </div>
      <p>
        {operandA && <>{operandA}</>}
        {operator && <>{operator}</>}
        {operandB && <>{operandB}</>}
      </p>
      {result && <p>{result}</p>}
    </div>
  );
}

export default Calculator;
