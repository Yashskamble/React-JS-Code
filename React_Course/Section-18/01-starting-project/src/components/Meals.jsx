import React from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import ErrorComponent from './ErrorComponent';

const requestConfig = {};

function Meals() {

  const {data: loadedMeals, isError, isLoading} = useHttp('http://localhost:3000/meals', requestConfig, [])
  
  if(isLoading) {
    return <p className='center'>Fetching the meals in a moment....</p>;
  }

  if (isError) {
    return <ErrorComponent title="Failed to fetch meals" errorCnt={isError}/>;
  }

  return (
    <ul id='meals'>
        {loadedMeals.map((meal) => {
            return(
                <MealItem key={meal.id} meal={meal}/>
            )
        })}
    </ul>
  )
}

export default Meals