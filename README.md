# Expense Tracker

A full-stack expense tracking application built with React.js frontend and Node.js/Express.js backend with MongoDB.

## Features

- Add, view, update, and delete expenses
- Categorize expenses (Food, Transportation, Entertainment, etc.)
- Date tracking for expenses
- Real-time updates with loading indicators
- Error handling and validation
- Responsive design

## Tech Stack

### Frontend
- React.js
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS support
- Environment variable configuration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - For local MongoDB: Make sure MongoDB is running on `mongodb://localhost:27017`
   - For MongoDB Atlas: Update `MONGODB_URI` in `.env` file

4. Configure environment variables:
   - Copy `.env` file and update the values if needed

## Running the Application

### Development Mode

1. Start the backend server:
```bash
npm run server
```
or for auto-restart on changes:
```bash
npm run dev-server
```

2. In a separate terminal, start the frontend:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
npm run server
```

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/health` - Health check

## Project Structure

```
expense-tracker-main/
├── models/
│   └── Expense.js          # Mongoose schema
├── routes/
│   └── expenseRoutes.js    # API routes
├── controllers/
│   └── expenseController.js # Business logic
├── src/
│   ├── components/
│   │   ├── TransactionForm.jsx  # Add expense form
│   │   ├── TransactionList.jsx  # Display expenses
│   │   └── BalanceSummary.jsx   # Summary display
│   ├── utils/
│   │   └── format.js       # Utility functions
│   ├── App.jsx             # Main app component
│   └── index.css           # Styles
├── server.js               # Express server
├── package.json
├── .env                    # Environment variables
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.