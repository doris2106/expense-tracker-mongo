import express from 'express';
import {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expenseController.js';

const router = express.Router();

// Routes
router.get('/', getAllExpenses);
router.get('/:id', getExpense);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;