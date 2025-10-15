const Filter = ({ value, onChange }) => {
    return (
        <div>
            search by name <input
                value={value}
                onChange ={onChange}
                />
        </div>
    )
  }
  
  export default Filter
  