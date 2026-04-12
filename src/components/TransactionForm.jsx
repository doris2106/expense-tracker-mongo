import React, { useState } from 'react'
import axios from 'axios'

export default function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const a = parseFloat(amount)
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }
    if (!a || a <= 0) {
      setError('Amount must be a positive number')
      return
    }
    if (!type || !['income', 'expense'].includes(type)) {
      setError('Please select income or expense')
      return
    }
    if (!category.trim()) {
      setError('Please select a category')
      return
    }
    if (!date) {
      setError('Please select a date')
      return
    }

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/api/expenses`, {
        title: title.trim(),
        amount: a,
        type,
        category: category.trim(),
        date: new Date(date)
      })

      if (response.data.success) {
        setSuccess('Expense added successfully!')
        onAdd(response.data.data)
        setTitle('')
        setAmount('')
        setType('expense')
        setCategory('')
        setDate(new Date().toISOString().split('T')[0])
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card form-card">
      <h2>Add Expense</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={submit} className="tx-form">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Groceries, Rent"
            required
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  )
}