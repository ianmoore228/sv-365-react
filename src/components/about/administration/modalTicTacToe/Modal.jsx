import "./modal.css";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalLetters from "./modalLetters/ModalLetters.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { openLettersModal, closeDeleteModal } from '../../../../redux/deleteModalSlice.jsx';

const Modal = () => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector((state) => state.deleteModal.isDeleteModalOpen);

const [cells, setCells] = useState(Array(9).fill(null));
const [move, setMove] = useState(0);
const [win, setWin] = useState(false);
const rows = Array(3).fill(null);
const columns = Array(3).fill(null);
// const [showLettersModal, setShowLettersModal] = useState(false);
const [draw, setDraw] = useState(false);
const [winner, setWinner] = useState(null);

// const openLettersModal = () => {
//   setShowLettersModal(true); 
// };

// const closeLettersModal = () => {
//   setShowLettersModal(false);
// };

  if (!isDeleteModalOpen) return null;

  const handleCellClick = (cellIndex) => {
    setCells((prevCells) => {

 
      if (prevCells[cellIndex] !== null) return prevCells;


      // setMove(move + 1);

      const updatedCells = [...prevCells];

      updatedCells[cellIndex] = "X";

      checkWin(updatedCells);

      // console.log(`updatedCells ${updatedCells}`)

      getBestMove(updatedCells, move % 2 === 0 ? "X" : "O");

      setTimeout(() => makeBotMove(updatedCells), 500);

      return updatedCells;
    });
  };

  const checkWin = (cells) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const line of winLines) {
      const [a, b, c] = line;
      if ((cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) && cells[a] === "X") {
        setWin(true);
        setWinner("X");
        return;
      } else if ((cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) && cells[a] === "O") {
        setWin(false);
        setWinner("O");
        return;
      }
    }
  
    if (cells.every((cell) => cell !== null)) {
      setDraw(true);
    }
  };

  const getBestMove = (board, currentPlayer) => {
    const opponent = currentPlayer === "O" ? "X" : "O";

    
    let bestMove = -1;
    let bestScore = -Infinity;
  

    if(board[5] === "X" && board[2] === "X") {
      bestMove = 1;
      // console.log(`yyess`)
      return bestMove;
    }

  

    const checkWinner = (board, player) => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6],
      ];
  
      return winPatterns.some((pattern) =>
        pattern.every((index) => board[index] === player)
      );


    };
  
  
    const isBoardFull = (board) => board.every((cell) => cell !== null);


  
    const minimax = (board, depth, isMaximizing) => {
      if (checkWinner(board, currentPlayer)) return 10 - depth;
      if (checkWinner(board, opponent)) return depth - 10; 
      if (isBoardFull(board)) return 0; 

   
      // console.log(`board5 ${board[5]}`)
  
      if (isMaximizing) {
        let bestScore = -Infinity;
  
        board.forEach((cell, index) => {
          if (cell === null) {
            board[index] = currentPlayer; 
            const score = minimax(board, depth + 1, false); 
            board[index] = null; 
            bestScore = Math.max(score, bestScore);
          }
        });
  
        return bestScore;
      } else {
        let bestScore = Infinity;
  
        board.forEach((cell, index) => {
          if (cell === null) {
            board[index] = opponent; 
            const score = minimax(board, depth + 1, true); 
            board[index] = null; 
            bestScore = Math.min(score, bestScore);
          }
        });
  
        return bestScore;
      }
    };
  
  
    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = currentPlayer; 
        const moveScore = minimax(board, 0, false); 
        board[index] = null; 
  
        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = index;
        }
      }
 

    });

    // console.log(bestMove)
   
    return bestMove;

  };

 const makeBotMove = (board) => {
  const boardCopy = [...board]; 
  const botMove = getBestMove(boardCopy, "X");

    if (botMove !== -1 && board[botMove] === null) {
      setCells((prevCells) => {
        const updatedCells = [...prevCells];
        updatedCells[botMove] = "O";
        checkWin(updatedCells);
        return updatedCells;
      });
    
      setMove((prevMove) => prevMove + 1); 
    }

  };

  console.log(move);

  // console.log(showLettersModal)

  const redrawGame = () => {
    setCells(Array(9).fill(null));
    setMove(0);
    setWin(false);
    setDraw(false);
    setWinner(null);
  };

  return (
    <>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="modal__wrapper">
          <motion.div
            initial={{ transform: "translateY(-100%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="modal__content"
          >
            <button
              onClick={() => {
                dispatch(closeDeleteModal())
              }}
              className="modal__button-close"
            >
              ×
            </button>
            <h2 className="modal__title">Удаление аккаунта</h2>
            <p className="modal__text">Пожлауйста, решите головоломку, чтобы продолжить.</p>
            <div className="modal__game">
              <div className="modal__game-row">
              {rows.map((_, rowIndex) => (
                <div
                  className={`modal__row modal__row_${rowIndex}`}
                  key={rowIndex}
                >
                  {columns.map((_, colIndex) => {
                 
                    const cellIndex = rowIndex * 3 + colIndex;

                    return (
                      <div
                        className={`modal__cell modal__cell_${colIndex}`}
                        key={colIndex}
                        onClick={() => handleCellClick(cellIndex)} 
                      >
                        {cells[cellIndex]} 
                      </div>
                    );
                  })}
                </div>
              ))}
              </div>
            </div>
            {winner === "O" && (
              <button onClick={() => {redrawGame()}} className="modal__text modal__text-button">Поздравляем! Вы проиграли! Начать заново?</button>
            )}
            {win && (
              <button onClick={() => {dispatch(openLettersModal())}} className="modal__text modal__text-button">Молодцы! Продолжить?</button>
            )}
            {draw && (
              <button onClick={() => {redrawGame()}} className="modal__text modal__text-button">Ничья! Начать заново?</button>
            )}
          </motion.div>
        </div>
      </motion.div>

    </>
  );
};
export default Modal;