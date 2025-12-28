const Country = ({country, onShow}) => {
    return (
        <li>
            {country.name.common} <button type="button" onClick={onShow}>Show</button>
      </li>
    )
  }
  
  export default Country
  
