# Test Plan: Tic Tac Toe (Hot Seat)

**Application URL**: `http://localhost:3000/games/tic-tac-toe-hot-seat.html`  
**Last Updated**: December 2, 2025

---

## Overview

This test plan covers the Tic Tac Toe Hot Seat game functionality, including page load verification, gameplay scenarios, and edge cases.

---

## Test Scenarios

### 1. Smoke Test - Page Load ✅ AUTOMATED

**Objective**: Verify the game page loads correctly with all elements in their initial state.

**Automated**: `tests/tic-tac-toe.spec.ts` - Test: "should load the game page with all elements in initial state"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the game URL | Page loads successfully |
| 2 | Check page title | Title is "🦎 GAD \| Game: Tic Tac Toe (Hot Seat)" |
| 3 | Verify "Start New Game" button | Button is visible and enabled |
| 4 | Verify status display | Shows "..." |
| 5 | Verify Player X score | Score is 0 |
| 6 | Verify Player O score | Score is 0 |
| 7 | Verify game board | All 9 cells are empty |

---

### 2. Gameplay - X Wins (Top Row)

**Objective**: Verify Player X can win by completing the top row.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start New Game" | Button becomes disabled, status shows "X's turn" |
| 2 | X clicks cell (1,1) | Cell shows "X", status shows "O's turn" |
| 3 | O clicks cell (2,1) | Cell shows "O", status shows "X's turn" |
| 4 | X clicks cell (1,2) | Cell shows "X", status shows "O's turn" |
| 5 | O clicks cell (2,2) | Cell shows "O", status shows "X's turn" |
| 6 | X clicks cell (1,3) | X wins with top row |
| 7 | Verify end state | Player X score is 1, status shows "Click start to play again", button is enabled |

---

### 3. Gameplay - O Wins (Middle Column)

**Objective**: Verify Player O can win by completing the middle column.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start New Game" | Game starts |
| 2 | X: (1,1), O: (1,2) | Moves registered |
| 3 | X: (3,3), O: (2,2) | Moves registered |
| 4 | X: (3,1), O: (3,2) | O wins with middle column |
| 5 | Verify end state | Player O score increments, status shows "Click start to play again" |

---

### 4. Gameplay - Draw

**Objective**: Verify a draw scenario where no player wins.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start New Game" | Game starts |
| 2 | Play sequence: X:(1,1), O:(2,2), X:(3,3), O:(1,2), X:(3,2), O:(3,1), X:(1,3), O:(2,3), X:(2,1) | All cells filled |
| 3 | Verify end state | No score increment, status shows "Click start to play again", button is enabled |

---

### 5. Restart Game

**Objective**: Verify the game can be restarted after completion.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a game | Game ends |
| 2 | Click "Start New Game" | Board is cleared, all 9 cells are empty |
| 3 | Verify status | Shows "X's turn" |
| 4 | Verify button | "Start New Game" is disabled |
| 5 | Verify scores | Scores are preserved from previous games |

---

### 6. Edge Cases

**Objective**: Verify the game handles invalid actions correctly.

| Test Case | Action | Expected Result |
|-----------|--------|-----------------|
| Click cell before game starts | Click any cell when status shows "..." | No effect - cell stays empty, status unchanged |
| Click occupied cell | Click a cell that already has X or O | No effect - turn doesn't switch, cell unchanged |
| Page refresh | Refresh the browser | Scores reset to 0, game state resets to initial |

---

## Cell Grid Reference

```
(1,1) | (1,2) | (1,3)
------+-------+------
(2,1) | (2,2) | (2,3)
------+-------+------
(3,1) | (3,2) | (3,3)
```

---

## Prerequisites

- Application running at `http://localhost:3000`
- Chromium browser (or compatible)
