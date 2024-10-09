// app/page.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialDisplayValue = "0";

const App = () => {
  const [displayValue, setDisplayValue] = useState(initialDisplayValue);
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (value: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(value);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue((prevValue) =>
        prevValue === initialDisplayValue ? value : prevValue + value
      );
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue.toString());
    } else if (operator) {
      const result = calculate(firstOperand, inputValue.toString(), operator);
      setDisplayValue(result);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: string, secondOperand: string, operator: string) => {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    if (operator === "+") return (first + second).toString();
    if (operator === "-") return (first - second).toString();
    if (operator === "*") return (first * second).toString();
    if (operator === "/") return second === 0 ? "Error" : (first / second).toString();
    return secondOperand;
  };

  const handleEqualClick = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand) {
      const result = calculate(firstOperand, inputValue.toString(), operator);
      setDisplayValue(result);
      setFirstOperand(null);
      setOperator(null);
    }
  };

  const handleClearClick = () => {
    setDisplayValue(initialDisplayValue);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const renderButton = (value: string, onClick: () => void) => (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="flex justify-center items-center m-1 p-4 bg-gray-200 rounded-lg"
    >
      <Button variant="outline" onClick={onClick}>
        {value}
      </Button>
    </motion.div>
  );

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="p-6 w-96 shadow-lg bg-white">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl font-bold"
          >
            Calculator
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Input
              type="text"
              value={displayValue}
              readOnly
              className="text-right text-xl py-2 px-4 border rounded-lg w-full"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-2">
            {renderButton("7", () => handleButtonClick("7"))}
            {renderButton("8", () => handleButtonClick("8"))}
            {renderButton("9", () => handleButtonClick("9"))}
            {renderButton("/", () => handleOperatorClick("/"))}

            {renderButton("4", () => handleButtonClick("4"))}
            {renderButton("5", () => handleButtonClick("5"))}
            {renderButton("6", () => handleButtonClick("6"))}
            {renderButton("*", () => handleOperatorClick("*"))}

            {renderButton("1", () => handleButtonClick("1"))}
            {renderButton("2", () => handleButtonClick("2"))}
            {renderButton("3", () => handleButtonClick("3"))}
            {renderButton("-", () => handleOperatorClick("-"))}

            {renderButton("0", () => handleButtonClick("0"))}
            {renderButton("C", handleClearClick)}
            {renderButton("=", handleEqualClick)}
            {renderButton("+", () => handleOperatorClick("+"))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
