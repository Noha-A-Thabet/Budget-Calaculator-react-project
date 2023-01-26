import React, { useState } from "react"
import './App.css';
import ExpenseItem from "./Components/ExpenseItem";
import ExpenseList from "./Components/ExpenseList";
import ExpensesForm from "./Components/ExpensesForm";
import Alert from "./Components/Alert";
import { v4 as uuidv4 } from 'uuid'


const initialExpenses = [
  { id: uuidv4(), charge: 'rent', amount: 1600 },
  { id: uuidv4(), charge: 'Car Payment', amount: 1400 },
  { id: uuidv4(), charge: 'Boat Payment', amount: 1200 }
]
function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);



  // for charge handling
  const handleCharge = e => {
    setCharge(e.target.value);
  }

  // for Amount handling
  const handleAmount = e => {
    setAmount(e.target.value);
  }

  // for handling alert 
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }
  // for handle submitting button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
        const singlExpense = { id: uuidv4(), charge, amount }
        setExpenses([singlExpense, ...expenses]);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singlExpense = { id: uuidv4(), charge, amount }
        setExpenses([singlExpense, ...expenses]);
        handleAlert({ type: "success", text: "item added" });
      }
      setAmount("");
      setCharge("");
    } else {
      handleAlert({ type: "danger", text: "charge can't be empty value and amount value has to be bigger than zero " })
    }
  }

  // for clearing all expenses 
  const clearAllExpenses = () => {
    setExpenses([]);

  }

  // for remove selected item
  const clearOneItem = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
  }

  // for handling item
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }
  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">

        <ExpensesForm charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit} />

        <ExpenseList
          expenses={expenses}
          clearAllExpenses={clearAllExpenses}
          clearOneItem={clearOneItem}
          handleEdit={handleEdit} />
      </main>
      <h1>
        total spending: <span className="total">
          $ {expenses.reduce((acc, curr) => {
            return acc += parseInt(curr.amount)
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  )
}

export default App;
