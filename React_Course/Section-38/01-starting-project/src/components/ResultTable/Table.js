const Table = ({tableData}) => {
    console.log(tableData)
    return (
        <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((data) => {
            return <tr>
            <td>{data?.year}</td>
            <td>{data?.savingsEndOfYear}</td>
            <td>{data?.yearlyInterest.toFixed(2)}</td>
            <td>{data?.totalInterest.toFixed(2)}</td>
            <td>{data?.yearlyContribution}</td>
          </tr>
        })}
          
        </tbody>
      </table>
    )
}

export default Table;