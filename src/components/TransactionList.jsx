import React, { useState } from 'react'
import axios from 'axios'
import { formatCurrency } from '../utils/format'

export default function TransactionList({ transactions, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startEdit = (expense) => {
    setEditingId(expense._id)
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      type: expense.type || 'expense',
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0]
    })
    setError('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
    setError('')
  }

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const saveEdit = async (id) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.put(`${API_BASE}/api/expenses/${id}`, {
        ...editForm,
        amount: parseFloat(editForm.amount),
        date: new Date(editForm.date)
      })

      if (response.data.success) {
        onUpdate(response.data.data)
        setEditingId(null)
        setEditForm({})
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update expense')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return

    setLoading(true)
    try {
      const response = await axios.delete(`${API_BASE}/api/expenses/${id}`)
      if (response.data.success) {
        onDelete(id)
      }
    } catch (error) {
      alert('Failed to delete expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card list-card">
      <h2>Expenses</h2>
      {error && <div className="error-message">{error}</div>}
      <ul className="tx-list">
        {transactions.length === 0 && <li className="empty">No expenses yet</li>}
        {transactions.map((expense) => {
          const itemType = expense.type || 'expense'
          return (
            <li key={expense._id} className={`tx-item ${itemType}`}>
              {editingId === expense._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  placeholder="Title"
                />
                <input
                  type="number"
                  step="0.01"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                  placeholder="Amount"
                />
                <select
                  value={editForm.type}
                  onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                />
                <div className="edit-actions">
                  <button
                    className="btn success"
                    onClick={() => saveEdit(expense._id)}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn secondary" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="tx-info">
                <div className="tx-desc">
                  <strong>{expense.title}</strong>
                  <span className="category">{expense.category}</span>
                  <span className="date">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <div className="tx-amt">
                  {itemType === 'expense' ? '-' : '+'}
                  {formatCurrency(expense.amount)}
                </div>
                <div className="tx-actions">
                  <button className="btn secondary" onClick={() => startEdit(expense)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(expense._id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
          )
        })}
      </ul>
    </div>
  )
}