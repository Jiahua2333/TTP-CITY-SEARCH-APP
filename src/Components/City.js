import React, { Component } from "react";
import axios from "axios";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
         ZipCode: [],
        cityName: '',
    };
  }

//   componentDidMount() {
//     axios
//       .get("http://ctp-zip-api.herokuapp.com/city/" + this.state.cityName)
//       .then((response) => {
//         const data = response.data;
//         // const newZipCode = {
//         //   name: data.name,
//         //   imageUrl: data.sprites.front_default,
//         // };

//         this.setState({ ZipCode: data });
//       })
//       .catch((err) => {
//           console.log(err);
//         });
//   }

  componentDidUpdate(preProps, preState) {
    if(preState.cityName !== this.state.cityName){
        axios
        .get("http://ctp-zip-api.herokuapp.com/city/" + this.state.cityName.toUpperCase())
        .then((response) => {
            const data = response.data;
            // const newZipCode = {
            //   name: data.name,
            //   imageUrl: data.sprites.front_default,
            // };

            this.setState({ ZipCode: data });
        })
        .catch((err) => {
            console.log(err);
            //this.setState({Zipcode: [] });
            //alert(this.state.ZipCode.length);
            });
    }
  }


  handleChange = (event) =>{
    this.setState({
       cityName: event.target.value,
       ZipCode: [],
    });
  }

  render() {
    // let upperCity = this.state.cityName;
    // upperCity =  upperCity.toUpperCase();
    let zipCodeList;
    if (this.state.ZipCode.length === 0) {
        zipCodeList = <><p>No results:</p></>;
    } else {
        zipCodeList = (
        <ul className="list">
          {this.state.ZipCode.map((zip, index) => (
            <li key={index}>
                {zip}
            </li>
          ))}
        </ul>
      );
    }

    return (
        <div className="City">
          <h1>Type a city name to show its zipcode:</h1>
          <label for="City">City Name:</label>
          <input type="text" id="City" name="City"
                value={this.state.cityName}
                placeholder="try new york"
                onChange={this.handleChange}
          />
          <h3>{this.state.cityName.toUpperCase()}</h3>
          {zipCodeList}
        </div>
      );
  }
}

export default City;