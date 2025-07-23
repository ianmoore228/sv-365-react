import "./wordsearch.css";
import { useState, useEffect } from "react";

const wordsToFind = ["ОТПРАВИТЬ"];
const gridSize = 10;

const WordSearchGame = ({ setIsFound }) => {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); 

  // console.log(timeLeft)

  useEffect(() => {
    const savedGrid = localStorage.getItem("wordsearch-grid");
    // const savedIsAdded = localStorage.getItem("wordsearch-isAdded");
    const savedDate = localStorage.getItem("date");

    const now = new Date();
    const expirationTime = 5 * 60 * 1000;

    if (savedGrid && savedDate) {
      const savedDateObj = new Date(savedDate);
      const timeDiff = now - savedDateObj;
      const timeRemaining = expirationTime - timeDiff;

      if (timeDiff < expirationTime) {
        setGrid(JSON.parse(savedGrid));
        // setIsAdded(JSON.parse(savedIsAdded));
        setTimeLeft(Math.floor(timeRemaining / 1000));
      } else {
        localStorage.removeItem("wordsearch-grid");
        // localStorage.removeItem("wordsearch-isAdded");
        localStorage.removeItem("date");
        initializeGrid();
        setTimeLeft(expirationTime / 1000);
      }
    } else {
      initializeGrid();
      setTimeLeft(expirationTime / 1000);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null) return; 

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      localStorage.removeItem("wordsearch-grid");
      localStorage.removeItem("date");
      initializeGrid();
      setTimeLeft(5 * 60);
    }
  }, [timeLeft]);

  const initializeGrid = () => {
    const newGrid = createGrid();
    const randomValue = Math.random();

    if (randomValue < 0.5) {
      placeWordsInGrid(newGrid);
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
    fillEmptyCells(newGrid);
    setGrid(newGrid);

    localStorage.setItem("wordsearch-grid", JSON.stringify(newGrid));
    // localStorage.setItem("wordsearch-isAdded", JSON.stringify(randomValue < 0.5));
    localStorage.setItem("date", new Date().toISOString());

    console.log("инициализировано")
  };


  const createGrid = () => {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
  };


  const placeWordsInGrid = (grid) => {
    wordsToFind.forEach((word) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        const direction = Math.floor(Math.random() * 2);
        if (canPlaceWord(grid, word, row, col, direction)) {
          placeWord(grid, word, row, col, direction);
          placed = true;
        }
      }
    });
  };


  const canPlaceWord = (grid, word, row, col, direction) => {
    if (direction === 0 && col + word.length > gridSize) return false;
    if (direction === 1 && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
      const newRow = row + (direction === 1 ? i : 0);
      const newCol = col + (direction === 0 ? i : 0);
      if (grid[newRow][newCol] && grid[newRow][newCol] !== word[i])
        return false;
    }
    return true;
  };

  const placeWord = (grid, word, row, col, direction) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + (direction === 1 ? i : 0);
      const newCol = col + (direction === 0 ? i : 0);
      grid[newRow][newCol] = word[i];
    }
  };

  const fillEmptyCells = (grid) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!grid[row][col]) {
          grid[row][col] = getRandomLetter();
        }
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (foundWords.length > 0) return;

    setIsMouseDown(true);

    const cellIndex = selectedCells.findIndex(
      (cell) => cell.row === row && cell.col === col
    );

    if (cellIndex !== -1) {
      setSelectedCells((prev) =>
        prev.filter((_, index) => index !== cellIndex)
      );
    } else {
      setSelectedCells((prev) => [...prev, { row, col }]);
    }

    const selectedWord = [...selectedCells, { row, col }]
      .map((cell) => grid[cell.row][cell.col])
      .join("");

    if (
      wordsToFind.includes(selectedWord) &&
      !foundWords.includes(selectedWord)
    ) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setIsFound(true);
    }
  };

  const getRandomLetter = () => {
    const letters = "ОТПРАВИТЬ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown && foundWords.length === 0) {
      handleCellClick(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (foundWords.length === 0) {
      setSelectedCells([]);
    }
  };

  const formatTimeLeft = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="wordsearch-game">
      <p className="wordsearch-game__text">
        Найдите слово ОТПРАВИТЬ, чтобы отправить форму
      </p>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${
                  selectedCells.some((selected) => selected.row === rowIndex && selected.col === colIndex)
                   ? "selected" : foundWords.includes(cell) ? "found": ""}`}
                onMouseDown={() => handleCellClick(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="wordsearch-game__cooldown-container">
      <p className="wordsearch-game__cooldown-text">Не увидели слово? Создать новую игру:</p>
      <button
      type="button"
      style={{
        opacity: timeLeft <= 0 ? 1 : 0.5,
        pointerEvents: timeLeft <= 0 ? "auto" : "none",
      }}
      onClick={ initializeGrid }
       className="wordsearch-game__cooldown-button">Cooldown: {formatTimeLeft(timeLeft)}</button>
      </div>
    </div>
  );
};

export default WordSearchGame;
