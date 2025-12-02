import { test, expect } from '@playwright/test';

const GAME_URL = '/games/tic-tac-toe-hot-seat.html';

test.describe('Tic Tac Toe (Hot Seat) @tic-tac-toe @game', () => {
  test.describe('1. Smoke Test - Page Load @smoke', () => {
    test('should load the game page with all elements in initial state @smoke @page-load', async ({ page }) => {
      // Step 1: Navigate to the game URL
      await page.goto(GAME_URL);

      // Step 2: Check page title
      await expect(page).toHaveTitle('🦎 GAD | Game: Tic Tac Toe (Hot Seat)');

      // Step 3: Verify "Start New Game" button is visible and enabled
      const startButton = page.getByRole('button', { name: 'Start New Game' });
      await expect(startButton).toBeVisible();
      await expect(startButton).toBeEnabled();

      // Step 4: Verify status display shows "..."
      const status = page.getByRole('status');
      await expect(status).toHaveText('...');

      // Step 5: Verify Player X score is 0
      await expect(page.getByText('Player X: 0')).toBeVisible();

      // Step 6: Verify Player O score is 0
      await expect(page.getByText('Player O: 0')).toBeVisible();

      // Step 7: Verify game board - all 9 cells are empty
      const board = page.getByRole('grid', { name: 'Tic Tac Toe board' });
      await expect(board).toBeVisible();

      const cells = board.getByRole('gridcell');
      await expect(cells).toHaveCount(9);

      // Verify all cells are empty (have "Empty cell" accessible name)
      for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
          const cell = page.getByRole('gridcell', { name: `Empty cell, row ${row}, column ${col}` });
          await expect(cell).toBeVisible();
        }
      }
    });
  });
});
