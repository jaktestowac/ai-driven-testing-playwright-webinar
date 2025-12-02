# Agent Exploration Plan for Tic Tac Toe (Hot Seat)

## Goal
Automate the testing of the Tic Tac Toe game at `http://localhost:3000/games/tic-tac-toe-hot-seat.html`.

## Prerequisites
- The application must be running at `http://localhost:3000`.
- Browser: Chromium (or similar).

## Exploration Findings
- **Page Title**: `🦎 GAD | Game: Tic Tac Toe (Hot Seat)`
- **Key Elements**:
    - Start Button: `#start-button`
    - Board: `.board` containing 9 `.cell` elements.
    - Score Board: `#player-x-score` and `#player-o-score`.
    - Message Label: `#messageLbl`.
- **Game Logic**:
    - Game starts by clicking "Start New Game".
    - Player X always starts.
    - Turns alternate between X and O.
    - Winning updates the score immediately and enables the "Start New Game" button.
    - The board is NOT cleared upon winning/draw; it is cleared when "Start New Game" is clicked again.
    - Message label indicates turn ("X's turn", "O's turn") or reset state ("Click start to play again").

## Test Scenarios / Actions

### 1. Smoke Test - Page Load
1.  **Navigate** to `http://localhost:3000/games/tic-tac-toe-hot-seat.html`.
2.  **Verify** page title contains "Tic Tac Toe".
3.  **Verify** "Start New Game" button is visible and enabled.
4.  **Verify** Scores are 0.

### 2. Gameplay - X Wins
1.  **Click** "Start New Game".
2.  **Verify** Message label says "X's turn".
3.  **Action**: Player X clicks cell 0 (Top-Left).
4.  **Verify** Cell 0 contains "X".
5.  **Verify** Message label says "O's turn".
6.  **Action**: Player O clicks cell 3 (Middle-Left).
7.  **Action**: Player X clicks cell 1 (Top-Center).
8.  **Action**: Player O clicks cell 4 (Center).
9.  **Action**: Player X clicks cell 2 (Top-Right).
10. **Verify** Player X Score is 1.
11. **Verify** Message label says "Click start to play again".
12. **Verify** "Start New Game" button is enabled.

### 3. Gameplay - Draw
1.  **Click** "Start New Game".
2.  **Action**: Play moves to result in a draw (e.g., X:0, O:4, X:8, O:1, X:7, O:6, X:2, O:5, X:3).
3.  **Verify** Scores remain unchanged (or check specific values if continuing from previous test).
4.  **Verify** Message label says "Click start to play again".

### 4. Restart Game
1.  **Click** "Start New Game" after a game is finished.
2.  **Verify** All cells are empty.
3.  **Verify** Message label says "X's turn".
