import { useState, useEffect, ChangeEvent } from "react";
import "./CountdownTimer.css";

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const message = isEditing
        ? "Enter new time"
        : timeLeft === 0
        ? "Time's up!"
        : "seconds left";
    const btnText = isActive ? "⏸️ Pause" : "▶️ Start";

    // Återställer timer och startar edit
    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(60);
        setIsEditing(true);
    };

    // Hanterar input
    const handleInput = (input: string) => {
        setIsEditing(false);
        if (input === "") return;

        const inputNum = parseInt(input);
        inputNum < 0 ? setTimeLeft(0) : setTimeLeft(inputNum);
    };

    // Startar timer om isActive === true
    useEffect(() => {
        if (timeLeft === 0) setIsActive(false);
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    return (
        <section>
            <h1>Countdown Timer</h1>
            <div>
                {isEditing ? (
                    <input
                        type="number"
                        placeholder={timeLeft.toString()}
                        className="time-input"
                        onBlur={(e) => handleInput(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <p className="time-left">{timeLeft}</p>
                )}
            </div>
            <h2 className="time-info">{message}</h2>
            <button
                disabled={timeLeft <= 0}
                onClick={() => setIsActive(!isActive)}
            >
                {btnText}
            </button>
            <button onClick={() => handleReset()}>🔄️ Reset</button>
        </section>
    );
}
