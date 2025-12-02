# Agent Exploration Plan for Tic Tac Toe (Hot Seat)

## Goal
Automate the testing of the Tic Tac Toe game at `http://localhost:3000/games/tic-tac-toe-hot-seat.html`.

## Prerequisites
- The application must be running at `http://localhost:3000`.
- Browser: Chromium (or similar).

## Exploration Findings

### Page Information
- **Page Title**: `🦎 GAD | Game: Tic Tac Toe (Hot Seat)`
- **App Version**: v2.8.8 (shown in footer)

### Key Elements (Accessibility-based selectors - VERIFIED)
| Element | Role/Selector | Description |
|---------|---------------|-------------|
| Start Button | `button[name="Start New Game"]` | Starts/restarts the game |
| Board | `grid[name="Tic Tac Toe board"]` | Contains 9 gridcells |
| Cells | `gridcell[name="Empty cell, row X, column Y"]` | Where X=1-3 (row), Y=1-3 (column) |
| Status | `status` role element | Shows turn info or game state |
| Player X Score | Text: "Player X: N" | Displays X's score |
| Player O Score | Text: "Player O: N" | Displays O's score |
| Return Links | Links to collection and games list | Navigation options |

### Cell Grid Mapping (Row, Column)
```
(1,1) | (1,2) | (1,3)
------+-------+------
(2,1) | (2,2) | (2,3)
------+-------+------
(3,1) | (3,2) | (3,3)
```

### Game Logic (VERIFIED)
- **Initial State**: 
  - Status shows "..." (ellipsis)
  - "Start New Game" button is **enabled**
  - All cells empty
  - Scores are 0
  - Clicking cells before starting has **no effect**
  
- **Game Started**:
  - Status shows "X's turn"
  - "Start New Game" button becomes **disabled**
  - Player X always starts first
  
- **During Gameplay**:
  - Turns alternate between X and O
  - Status updates to show current player's turn ("X's turn" / "O's turn")
  - Clicking an already-occupied cell has **no effect** (turn doesn't change)
  
- **Game End (Win/Draw)**:
  - Status shows "Click start to play again"
  - "Start New Game" button becomes **enabled**
  - Winning player's score increments immediately
  - Draw does NOT increment any score
  - Board is **NOT cleared** until "Start New Game" is clicked
  
- **Restart**:
  - Clicking "Start New Game" clears the board
  - Scores are **preserved** across games
  - Scores **reset to 0** on page refresh/reload

### Additional Page Elements
- **Navigation Bar**: Links to Articles, Comments, Flashposts, Game List
- **Footer**: Version info, links to jaktestowac.pl and GitHub
- **Cookie Banner**: Accept/Reject buttons (shown on first load)
- **Backoffice Tools**: Link in header

---

## Test Scenarios / Actions

### 1. Smoke Test - Page Load ✅ VERIFIED
1.  **Navigate** to `http://localhost:3000/games/tic-tac-toe-hot-seat.html`.
2.  **Verify** page title is "🦎 GAD | Game: Tic Tac Toe (Hot Seat)".
3.  **Verify** "Start New Game" button is visible and **enabled** (not disabled).
4.  **Verify** Status shows "..." (ellipsis).
5.  **Verify** Player X Score is 0.
6.  **Verify** Player O Score is 0.
7.  **Verify** All 9 cells are empty.

### 2. Gameplay - X Wins (Top Row) ✅ VERIFIED
1.  **Click** "Start New Game".
2.  **Verify** "Start New Game" button is **disabled**.
3.  **Verify** Status says "X's turn".
4.  **Action**: Click cell (1,1) - Top-Left.
5.  **Verify** Cell (1,1) contains "X".
6.  **Verify** Status says "O's turn".
7.  **Action**: Click cell (2,1) - Middle-Left.
8.  **Verify** Cell (2,1) contains "O".
9.  **Verify** Status says "X's turn".
10. **Action**: Click cell (1,2) - Top-Center.
11. **Action**: Click cell (2,2) - Center.
12. **Action**: Click cell (1,3) - Top-Right (winning move).
13. **Verify** Player X Score is 1.
14. **Verify** Player O Score is 0.
15. **Verify** Status says "Click start to play again".
16. **Verify** "Start New Game" button is **enabled**.
17. **Verify** Board still shows X's and O's (not cleared).

### 3. Gameplay - O Wins (Middle Column) ✅ VERIFIED
1.  **Click** "Start New Game".
2.  **Action**: X clicks (1,1), O clicks (1,2), X clicks (3,3), O clicks (2,2), X clicks (3,1), O clicks (3,2).
3.  **Verify** Player O Score increments by 1.
4.  **Verify** Status says "Click start to play again".

### 4. Gameplay - Draw ✅ VERIFIED
1.  **Click** "Start New Game".
2.  **Action**: Play sequence: X:(1,1), O:(2,2), X:(3,3), O:(1,2), X:(3,2), O:(3,1), X:(1,3), O:(2,3), X:(2,1).
3.  **Verify** All cells are filled.
4.  **Verify** Scores remain unchanged (no increment for draw).
5.  **Verify** Status says "Click start to play again".
6.  **Verify** "Start New Game" button is **enabled**.

### 5. Restart Game ✅ VERIFIED
1.  **Click** "Start New Game" after a game is finished.
2.  **Verify** All 9 cells are empty.
3.  **Verify** Status says "X's turn".
4.  **Verify** "Start New Game" button is **disabled**.
5.  **Verify** Scores are preserved from previous games.

### 6. Edge Cases ✅ VERIFIED
1.  **Click cell before game starts** → No effect (cell stays empty, status stays "...").
2.  **Click occupied cell during game** → No effect (turn doesn't switch, cell unchanged).
3.  **Page refresh** → Scores reset to 0, game state resets.

---

## Playwright Locator Recommendations

```typescript
// Recommended locators for Playwright tests
const locators = {
  startButton: page.getByRole('button', { name: 'Start New Game' }),
  status: page.getByRole('status'),
  board: page.getByRole('grid', { name: 'Tic Tac Toe board' }),
  cell: (row: number, col: number) => 
    page.getByRole('gridcell', { name: `Empty cell, row ${row}, column ${col}` }),
  playerXScore: page.getByText(/Player X: \d+/),
  playerOScore: page.getByText(/Player O: \d+/),
  acceptCookies: page.getByText('Accept', { exact: true }),
};
```

## Exploration Date
- **Explored on**: December 2, 2025
- **Tool used**: Microsoft Playwright MCP
