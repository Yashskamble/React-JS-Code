import { useState } from "react"

const Form = ({onSubmit}) => {
    const initialValues = {
        'current-savings' : '10000',
        'yearly-contribution' : '111',
        'expected-return' : '7',
        'duration' : "2"
    }

    const [userInput, setUserInput] = useState(initialValues);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(userInput);
        handleResetInput();
    }

    const handleResetInput = () => {
        setUserInput(initialValues)
    }

    const handleInputChange = (name, value) => {
        setUserInput((prev) => {
            return {
                ...prev,
                [name] : +value
            }
        })
    }

    return (
        <form className="form" id="form" onSubmit={handleFormSubmit}>
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input type="number" id="current-savings" name="current-savings" onChange={(event) => handleInputChange('current-savings', event.target.value)} value={userInput['current-savings']} />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input type="number" id="yearly-contribution"  name="yearly-contribution" onChange={(event) => handleInputChange('yearly-contribution', event.target.value)} value={userInput['yearly-contribution']}/>
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expected-return" name="expected-return" onChange={(event) => handleInputChange('expected-return', event.target.value)} value={userInput['expected-return']} />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration"name="duration" onChange={(event) => handleInputChange('duration', event.target.value)} value={userInput['duration']}/>
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt" onClick={handleResetInput}>
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
    )
}

export default Form;