import CalcBtn from "./CalcBtn";
import '../assets/style/main.scss'
import { useEffect, useRef, useState } from "react";
import { evaluate } from 'mathjs'
import FuncBtn from "./FuncBtn";
import copiedLink from "../assets/img/copiedlink.svg"
import access from "../assets/img/access.svg"
import deleteHistory from "../assets/img/delete.svg"

const Calc = () => {

    const [expression, setExpression] = useState("");
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const buttons = [
        { symbol: "AC", action: "clear", bg: "gray" },
        { symbol: "+/-", action: "sign", bg: "gray" },
        { symbol: "%", action: "percentage", bg: "gray" },
        { symbol: "/", action: "operator", bg: "orange" },
        { symbol: "7", action: "number", bg: "dark" },
        { symbol: "8", action: "number", bg: "dark" },
        { symbol: "9", action: "number", bg: "dark" },
        { symbol: "*", action: "operator", bg: "orange" },
        { symbol: "4", action: "number", bg: "dark" },
        { symbol: "5", action: "number", bg: "dark" },
        { symbol: "6", action: "number", bg: "dark" },
        { symbol: "-", action: "operator", bg: "orange" },
        { symbol: "1", action: "number", bg: "dark" },
        { symbol: "2", action: "number", bg: "dark" },
        { symbol: "3", action: "number", bg: "dark" },
        { symbol: "+", action: "operator", bg: "orange" },
        { symbol: "<=", action: "backspace", bg: "dark" },
        { symbol: "0", action: "number", bg: "dark" },
        { symbol: ".", action: "number", bg: "dark" },
        { symbol: "=", action: "equal", bg: "orange" },
    ]

    const functions = [
        { symbol: "(", action: "parenthesis", type: "open" },
        { symbol: ")", action: "parenthesis", type: "close" },
        { symbol: "√x", action: "sqrt" },
        { symbol: "x²", action: "square" },
        { symbol: "x³", action: "cube" },
        { symbol: "xʸ", action: "power" },
        { symbol: "x!", action: "factorial" },
        { symbol: "x!!", action: "doubleFactorial" },
    ]

    const addBracket = (type) => {
        if (type === 'open') {
            setExpression(prev => prev + '(');
        } else if (type === 'close') {
            setExpression(prev => prev + ')');
        }
    };


    const sqrt = () => {
        setExpression(prev => {
            const match = prev.match(/(\d+)(?!.*\d)/);
            if (match) {
                const lastNumber = match[1];
                const newExpr = prev.replace(/(\d+)(?!.*\d)/, `sqrt(${lastNumber})`);
                return newExpr;
            } else {
                return prev;
            }
        });
    };

    const square = () => {
        setExpression(prev => {
            const match = prev.match(/([\-]?\d+\.?\d*)$/);
            if (match) {
                const num = match[1];
                return prev.slice(0, -num.length) + `(${num}^2)`;
            }
            return prev;
        });
    };

    const cube = () => {
        setExpression(prev => {
            const match = prev.match(/([\-]?\d+\.?\d*)$/);
            if (match) {
                const num = match[1];
                return prev.slice(0, -num.length) + `(${num}^3)`;
            }
            return prev;
        });
    };

    const power = () => {
        setExpression(prev => {
            const match = prev.match(/([\-]?\d+\.?\d*)$/);
            if (match) {
                const num = match[1];
                return prev.slice(0, -num.length) + `${num}^`;
            }
            return prev;
        });
    };

    const addDoubleFactorial = () => {
        setExpression(prev => {
            const match = prev.match(/(\d+)(?!.*\d)/);
            if (match) {
                const lastNumber = match[1];
                const newExpr = prev.replace(/(\d+)(?!.*\d)/, `${lastNumber}!!`);
                return newExpr;
            } else {
                return prev;
            }
        });
    };

    const addFactorial = () => {
        setExpression(prev => {
            const match = prev.match(/(\d+)(?!.*\d)/);
            if (match) {
                const lastNumber = match[1];
                const newExpr = prev.replace(/(\d+)(?!.*\d)/, `${lastNumber}!`);
                return newExpr;
            } else {
                return prev;
            }
        });
    };

    const addPercentage = () => {
        setExpression(prev => {
            const match = prev.match(/(\d+(\.\d+)?)(?!.*\d)/);
            if (match) {
                const lastNumber = match[1];
                const newExpr = prev.replace(/(\d+(\.\d+)?)(?!.*\d)/, `(${lastNumber}/100)`);
                return newExpr;
            }
            return prev;
        });
    }

    const addSymbol = (symbol) => {
        setExpression((prev) => prev + symbol);
    }

    const clear = () => {
        setExpression("");
        setResult("");
    }

    const calculate = () => {
        try {
            const evalResult = evaluate(expression);
            const rounded = Math.round(evalResult * 1000) / 1000;
            setExpression(rounded.toString());
            setResult(rounded);
            if (!history.includes(expression)) {
                setHistory([...history, expression])
            }
        } catch (error) {
            setExpression("Ошибка");
        }
    }

    const backspace = () => {
        setExpression((prev) => prev.slice(0, -1));
    }

    const toggleSign = () => {
        setExpression(prev => {
            if (!prev) return '';
            const match = prev.match(/([\-]?\d+\.?\d*)$/);

            if (match) {
                const number = match[1]

                let newNumber;

                if (number.startsWith('-')) {
                    newNumber = number.slice(1)
                } else {
                    newNumber = '-' + number
                }

                return prev.slice(0, match.index) + newNumber;
            }

            return prev;
        })
    }


    const handleClick = (btn) => {
        if (btn.action === "number" || btn.action === "operator") {
            if (expression.length < 18) {
                addSymbol(btn.symbol);
            }
            setResult("");
        } else if (btn.action === "clear") {
            clear();
            setResult(0);
        } else if (btn.action === "equal") {
            calculate();
        } else if (btn.action === "backspace") {
            backspace();
        } else if (btn.action === "sign") {
            toggleSign();
        } else if (btn.action === "square") {
            square();
        } else if (btn.action === "cube") {
            cube();
        } else if (btn.action === "doubleFactorial") {
            addDoubleFactorial();
        } else if (btn.action === "factorial") {
            addFactorial();
        } else if (btn.action === "sqrt") {
            sqrt();
        } else if (btn.action === "parenthesis") {
            addBracket(btn.type);
        } else if (btn.action === "power") {
            power();
        } else if (btn.action === "percentage") {
            addPercentage();
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(result)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => console.error("Ошибка копирования:", err));
    }

    const handleDelete = () => {
        setHistory([])
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 2000);
    }



    const historyRef = useRef(null)
    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history])

    return (
        <div className="calculator">
            <div className="display">

                <div className="history">
                    {history.map((item, index) => (
                        <span className="history_ex" key={index}>
                            {item}
                        </span>
                    ))}
                </div>

                <div className="result">
                    <span className="result_ex">{expression ? expression : result}</span>
                </div>
            </div>

            <div className="functions">

                {functions.map((btn, index) => (
                    <FuncBtn key={index} symbol={btn.symbol} onClick={() => handleClick(btn)} />
                ))}

                <button className="copy_button" onClick={handleCopy}>
                    {isCopied ? <img src={access} alt="" /> : <img src={copiedLink} alt="" />}
                </button>

                <button className="del_button" onClick={handleDelete}>
                    {isDeleted ? <img src={access} alt="" /> : <img src={deleteHistory} alt="" />}
                </button>



            </div>

            <div className="buttons">
                {buttons.map((btn, index) => (
                    <CalcBtn key={index} symbol={btn.symbol} onClick={() => handleClick(btn)} bg={btn.bg} />
                ))}
            </div>


        </div>
    );
}

export default Calc;