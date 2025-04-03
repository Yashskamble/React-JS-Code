import { useState } from 'react';
import logo from './assets/investment-calculator-logo.png';
import Header from './components/Header/Header';
import Form from './components/InputForm/Form';
import Table from './components/ResultTable/Table';

function App() {
  const [data, setData] = useState()

  const addDataHandler = (newData) => {
    calculateHandler(newData);

  }
  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      console.log(userInput)
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
        totalInterest : currentSavings - userInput['current-savings'] - yearlyContribution - (i+1)
      });
    }

    setData(yearlyData)

    // do something with yearlyData ...
  };

  return (
    <div>
      <Header/>

      <Form onSubmit = {addDataHandler}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      {data?.length > 0  && <Table tableData = {data}/>}
    </div>
  );
}

export default App;
