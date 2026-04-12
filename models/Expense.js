import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Type is required'],
    default: 'expense'
  }
}, {
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;