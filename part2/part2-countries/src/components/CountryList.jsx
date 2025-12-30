import Country from "./country";

const CountryList = ({ countries, onShow }) => {
  return (
    <ul>
      {countries.map((country) => (
        <Country
          key={country.cca3}
          country={country}
          onShow={() => onShow(country)}
        />
      ))}
    </ul>
  );
};

export default CountryList;
