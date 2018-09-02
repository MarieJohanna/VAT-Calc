import React from "react"
import { exVatToIncVat, incVatToExtVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      vatRate: 25,
      incVat: 0,
      exVat: 0,
      lastUpdate: 0
    }
  }

  handleVatRate = (event) => {
    if (this.state.lastUpdate === "incVat") {
      this.setState({
        vatRate: parseInt(event.target.value, 10),
        exVat: incVatToExtVat(event.target.value, parseInt(this.state.incVat, 10)).toFixed(2)
      })
    } else if (this.state.lastUpdate === "exVat") {
      this.setState({
        vatRate: parseInt(event.target.value, 10),
        incVat: exVatToIncVat(event.target.value, parseInt(this.state.exVat, 10)).toFixed(2)
      })
    } else {
      this.setState({
        vatRate: parseInt(event.target.value, 10)
      })
    }
  }

  handleExVatChange = (event) => {
    this.setState({
      incVat: exVatToIncVat(this.state.vatRate, parseInt(event.target.value, 10)),
      exVat: parseInt(event.target.value, 10),
      lastUpdate: "exVat"
    })
  }

  handleIncVatChange = (event) => {
    this.setState({
      exVat: incVatToExtVat(this.state.vatRate, parseInt(event.target.value, 10)),
      incVat: parseInt(event.target.value, 10),
      lastUpdate: "incVat"
    })
  }

  render() {
    return (
      <div className="App">
        <h1>VAT Calculator</h1>

        <form>
          <div className="radio_container">
            <label>VAT (%):</label>
            <div className="radio">
              <input
                type="radio"
                name="vat"
                value="25"
                onChange={this.handleVatRate} />
                  25%
              <input
                type="radio"
                name="vat"
                value="12"
                onChange={this.handleVatRate} />
                  12%
              <input
                type="radio"
                name="vat"
                value="6"
                onChange={this.handleVatRate} />
                  6%
            </div>
          </div>

          <div className="container">
            <label htmlFor="incl-vat">Amount incl VAT:</label>
            <input
              className="input"
              type="number"
              name="amount-incl-vat"
              value={this.state.incVat}
              onChange={this.handleIncVatChange} />
          </div>
          <div className="container">
            <label htmlFor="excl-vat">Amount excl VAT:</label>
            <input
              className="input"
              type="number"
              name="amount-excl-vat"
              value={this.state.exVat}
              onChange={this.handleExVatChange} />
          </div>
          <div className="container">
            <label htmlFor="amount-vat">VAT amount:</label>
            <input
              disabled
              type="number"
              name="amount-excl-vat"
              value={(this.state.incVat - this.state.exVat).toFixed(2)} />
          </div>
        </form>
      </div>
    )
  }

}

export default App
