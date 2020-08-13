import React from 'react';
import axios from 'axios';
export default class App extends React.Component {

  apiBaseUrl = 'https://api.hgbrasil.com/weather?woid=449704&format=json-cors&locale=pt';
  
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      forecast: [],
    }
  }

  componentDidMount() {
    axios.get(this.apiBaseUrl).then(
      ({ data }) => {
        this.setState({
          city: data.results.city_name,
          forecast: data.results.forecast,
        })
    });

    // fetch(this.apiBaseUrl).then(
    //   response => response.json()
    // ).then(json => {
    //   this.setState({
    //     city: json.results.city_name
    //   })
    //   console.log(json);
    // });
  }

  render() {
  
    return (
      <div className="container">
        <h2> { this.state.city }</h2>
        <table className="striped centered">
          <thead>
            <tr>
              <th> Data </th>
              <th> Min. </th>
              <th> Max. </th>
              <th> Previsão </th>
              <th>Img</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.forecast.map((day, index) => {
                return(
                  <tr key={index}>
                    <td>{day.date}</td>
                    <td>{day.min}</td>
                    <td>{day.max}</td>
                    <td>{day.description}</td>
                    <td><img src={`/weather-icons/${day.condition}.svg`} alt={day.description}/></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}