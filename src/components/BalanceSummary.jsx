import React from 'react'
import { formatCurrency } from '../utils/format'

export default function BalanceSummary({ balance, income, expense }) {
  return (
    <div className="card summary-card">
      <h2>Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">Balance</div>
          <div className="value balance">{formatCurrency(balance)}</div>
        </div>

        <div className="summary-item">
          <div className="label">Income</div>
          <div className="value income">{formatCurrency(income)}</div>
        </div>

        <div className="summary-item">
          <div className="label">Expenses</div>
          <div className="value expense">{formatCurrency(expense)}</div>
        </div>
      </div>
    </div>
  )
}