import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import BalanceSummary from './components/BalanceSummary'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE}/api/expenses`)
      if (response.data.success) {
        setExpenses(response.data.data)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load expenses')
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev])
  }

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    )
  }

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense._id !== id))
  }

  const totals = useMemo(() => {
    const income = expenses
      .filter((expense) => expense.type === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0)
    const expenseTotal = expenses
      .filter((expense) => expense.type === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0)

    return {
      income,
      expense: expenseTotal,
      balance: income - expenseTotal
    }
  }, [expenses])

  if (loading) {
    return (
      <div className="app-root">
        <div className="loading">Loading expenses...</div>
      </div>
    )
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p className="tagline">Track your expenses with ease</p>
      </header>

      <main className="container">
        {error && <div className="error-message global-error">{error}</div>}
        <section className="left">
          <BalanceSummary {...totals} />
          <TransactionForm onAdd={addExpense} />
        </section>

        <section className="right">
          <TransactionList
            transactions={expenses}
            onUpdate={updateExpense}
            onDelete={deleteExpense}
          />
        </section>
      </main>
    </div>
  )
}