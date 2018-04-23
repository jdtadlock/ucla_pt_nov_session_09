import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      zip: '',
      lat: '',
      long: '',
      eats: [],
      show_alert: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getLocation = () => {
    return axios.get('http://ip-api.com/json')
      .then(({ data }) => {
        this.setState({
          lat: data.lat,
          long: data.lon
        });
      })
  }

  findEats = (event) => {
    event.preventDefault();

    // let places = {};
    
    // console.log("URL: ", url);
    this.getLocation()
      .then(() => {
        axios.get(`/eats?lat=${this.state.lat}&long=${this.state.long}`)
          .then(({ data }) => {

            this.setState({eats: data});
          }); 
      });         
  }

  storeEat = (eat) => {
    axios.post('/eats', {
      name: eat.name,
      address: eat.formatted_address
    }).then(({ data }) => {
      console.log(data);
      if ( !data.result ) return;

      this.setState({
        show_alert: true
      });

      setTimeout(() => this.setState({show_alert: false}), 2000);
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.zip}</h1>
        {this.state.show_alert ? (
          <p className="alert">Eat has been successfully favorited!</p>
        ) : ''}
        <form>
          {/* <label>
            Zip Code
             <input type="text" 
              name="zip"  
              placeholder="Zip Code"
              onChange={this.handleChange}
              value={this.state.zip}/> 
            
          </label> */}

          <button onClick={this.findEats}>Get Eats By Location</button>
        </form>

        {this.state.eats.map(eat => 
          <div className="eat" key={eat.id}>
            <h2>{eat.name}</h2>
            <p>{eat.formatted_address}</p>
            <button onClick={() => this.storeEat(eat)}>Favorite</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
