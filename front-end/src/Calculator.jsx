import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import operations from './operations';

const client = axios.create({
    baseURL: "http://localhost:8080/api"
});


function Calculator(){
    
    const [currentValue, setCurrentValue] = useState("0");
    const [currentExpression, setCurrentExpression] = useState("");
    const isTypingRef = useRef(false);
    const isError = useRef(false);

    useEffect(() => {
        // Function to handle key presses
        const handleKeyDown = (event) => {
            console.log(`handle key down: ${event.key}`);
            if(operations.includes(String(event.key))){
                handleClick(String(event.key));
            }
            else if (event.key == "Backspace") handleClick("X");
            else if (event.key == "ُEnter") handleClick("=");
            else if (event.key == "ُDelete") handleClick("C");
        };
    
        // Attach event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener on unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    });
    
    function handleClick(operation){
        if(isError.current) clearDisplay();
        else if(operation == "C" || operation=="CE") clearDisplay();
        else if(operation=="X")     deleteLast()
        else if(operation=="+/-")   setCurrentValue(c=>String(-c));
        else if(operation=="%")     handlePercentage();
        else if(operation=="√")     handleSquareRoot();
        else if(operation=="1/x")   handleInverse();
        else if(["=", "*", "/", "+", "-", "^"].includes(operation)){
            appendOperator(operation);
        }
        else appendNumber(operation);
    }

    function clearDisplay(){
        setCurrentValue("0");
        setCurrentExpression("");
        isTypingRef.current=false;
        isError.current=false;
    }

    function deleteLast(){
        if(currentExpression[currentExpression.length-1]=="="){
            setCurrentExpression("");
            return;
        }
        if(currentValue.length==1){
            setCurrentValue("0");
            isTypingRef.current=false;
        }
        else 
        setCurrentValue(c => c.slice(0,-1))
    }

    function appendNumber(num){
        if(isTypingRef.current){
            setCurrentValue(c => c+num);
        } else {
            setCurrentValue(String(num));
            isTypingRef.current = true;
        }
    }

    async function handlePercentage() {
        let newExpression = currentValue+"/100";
        const response = await requestSolution(newExpression).catch((e)=>{ 
            ErrorDisplay()
            return;
        });
        setCurrentExpression(response.data+"=");
        setCurrentValue(String(response.data));
        isTypingRef.current=false;
    
    }
    
    async function handleSquareRoot() {
        let newExpression = `sqrt(${currentValue})`;
        const response = await requestSolution(newExpression).catch((e)=>{ 
            ErrorDisplay()
            return;
        });
        setCurrentExpression(`√(${currentValue})=`);
        setCurrentValue(String(response.data));
        isTypingRef.current=false;
    }
    
    async function handleInverse() {
        let newExpression = `1/${currentValue}`;
        const response = await requestSolution(newExpression).catch((e)=>{ 
            ErrorDisplay()
            return;
        });
        setCurrentExpression(`1/${currentValue}=`);
        setCurrentValue(String(response.data));
        isTypingRef.current=false;
    }
    
    async function appendOperator(opertor){
        if(currentExpression[currentExpression.length-1]=="=" && opertor=="=") return;

        let newExpression = currentExpression + currentValue;
        if(currentExpression[currentExpression.length-1]=="=")
            newExpression = currentValue;

        const response = await requestSolution(newExpression).catch((e)=>{ 
            ErrorDisplay()
            return;
        });
        setCurrentValue(String(response.data));
        setCurrentExpression( (opertor=="="?newExpression:response.data) + opertor);
        isTypingRef.current=false;
    }

    function ErrorDisplay(){
        setCurrentValue("Error!");
        isTypingRef.current = false;
        isError.current = true;
        setCurrentExpression("");
    }

    async function requestSolution(expression) {
        const response = await client.get("/calculate", {
            params: {
                expression: String(expression)
            }
        });
        return response;
    }

 
    return(<div className="calculator-container">
        <div className="calculator-display">
            <p className='helper-display'>{currentExpression}</p>
            <p className='main-display'>{currentValue}</p>
        </div>
        <div className="calculator-buttons">
            {
                operations.map((opr,index) => <button key={index} onClick={() => handleClick(opr)}>{opr}</button>)     
            }
        </div>
    </div>)
}

export default Calculator;