// spec: specs/TEST_PLAN.md
// seed: tests/tic-tac-toe.spec.ts

import { test, expect } from '@playwright/test';

const GAME_URL = '/games/tic-tac-toe-hot-seat.html';

test.describe('Gameplay - X Wins (Top Row)', () => {
  test('should allow Player X to win by completing the top row @tic-tac-toe @game @gameplay @x-wins', async ({ page }) => {
    await page.goto(GAME_URL);

    const startButton = page.getByRole('button', { name: 'Start New Game' });
    const status = page.getByRole('status');
    const board = page.getByRole('grid', { name: 'Tic Tac Toe board' });

    // Step 1: Click "Start New Game" - Button becomes disabled, status shows "X's turn"
    await startButton.click();
    await expect(startButton).toBeDisabled();
    await expect(status).toHaveText("X's turn");

    // Step 2: X clicks cell (1,1) - Cell shows "X", status shows "O's turn"
    await board.getByRole('gridcell', { name: 'Empty cell, row 1, column 1' }).click();
    await expect(board.getByRole('gridcell', { name: 'Empty cell, row 1, column 1' })).toHaveText('X');
    await expect(status).toHaveText("O's turn");

    // Step 3: O clicks cell (2,1) - Cell shows "O", status shows "X's turn"
    await board.getByRole('gridcell', { name: 'Empty cell, row 2, column 1' }).click();
    await expect(board.getByRole('gridcell', { name: 'Empty cell, row 2, column 1' })).toHaveText('O');
    await expect(status).toHaveText("X's turn");

    // Step 4: X clicks cell (1,2) - Cell shows "X", status shows "O's turn"
    await board.getByRole('gridcell', { name: 'Empty cell, row 1, column 2' }).click();
    await expect(board.getByRole('gridcell', { name: 'Empty cell, row 1, column 2' })).toHaveText('X');
    await expect(status).toHaveText("O's turn");

    // Step 5: O clicks cell (2,2) - Cell shows "O", status shows "X's turn"
    await board.getByRole('gridcell', { name: 'Empty cell, row 2, column 2' }).click();
    await expect(board.getByRole('gridcell', { name: 'Empty cell, row 2, column 2' })).toHaveText('O');
    await expect(status).toHaveText("X's turn");

    // Step 6: X clicks cell (1,3) - X wins with top row
    await board.getByRole('gridcell', { name: 'Empty cell, row 1, column 3' }).click();
    await expect(board.getByRole('gridcell', { name: 'Empty cell, row 1, column 3' })).toHaveText('X');

    // Step 7: Verify end state - Player X score is 1, status shows "Click start to play again", button is enabled
    await expect(page.getByText('Player X: 1')).toBeVisible();
    await expect(status).toHaveText('Click start to play again');
    await expect(startButton).toBeEnabled();
  });
});