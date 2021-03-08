import "./CurrencyConverter.css"
import React from 'react'


export default class CurrencyConverter extends React.Component {
    constructor() {
      super();
      
      this.state = {
        baseCurrency:'INR',
        convertToCurrency:'USD',
        baseAmount: 100,
        rates: [],
        currencies: []
      };
      
      this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
      this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
      this.changeBaseAmount = this.changeBaseAmount.bind(this);
      this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
      this.callAPI = this.callAPI.bind(this);
    }
    
    componentDidMount() {
     this.callAPI(this.state.baseCurrency)
    }
    
    changeBaseCurrency(e) {
      this.setState({ baseCurrency: e.target.value});
      this.callAPI(e.target.value)
      
    }
    
   callAPI(base) {
     const api = `https://api.exchangeratesapi.io/latest?base=${base}`;
      
      fetch(api)
       .then(results => {
          return results.json();
      }).then(data => this.setState({
        rates: data['rates'],
        currencies: Object.keys(data['rates']).sort()
      }));
     
   } 
    
    
    changeConvertToCurrency(e) {
      this.setState({
        convertToCurrency: e.target.value
      });
    }
    
    changeBaseAmount(e) {
     this.setState({
       baseAmount: e.target.value
     });
    }
    
    getConvertedCurrency(baseAmount,convertToCurrency,rates) {
        return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(3);
    }
    
    render() {
      const {currencies,rates,baseCurrency,baseAmount,convertToCurrency} = this.state;
      
      const currencyChoice = currencies.map(currency =>
        <option key={currency} value={currency}> {currency} </option>      
      );
                                            
      const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);
      
      
      return(
        <div className="form-container">
            <h3>Conversion Page</h3>
          <form className='ui mini form'>
          
           <h3>Select Base Currency: {baseCurrency}</h3>
            <select  value={baseCurrency} onChange={this.changeBaseCurrency}>
              {currencyChoice}
              <option>{baseCurrency}</option>
            </select>
          
            <h3>Select Secondary Currency: {convertToCurrency}</h3>
            <select value={convertToCurrency} onChange={this.changeConvertToCurrency}>
              {currencyChoice}
            </select>
          
           <h3>Enter the Amount:</h3>
             <input type='number' 
                    id='base-amount' 
                    defaultValue={baseAmount} 
                    onChange={this.changeBaseAmount}>
            </input>                             
         </form>                       
         <h2 id='result-text'>{result} {convertToCurrency}</h2>
       </div>
      );
    }
  }



