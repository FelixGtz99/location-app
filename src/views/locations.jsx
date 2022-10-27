import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "../css/locations.css";
const locationDefault = {
  lat: 0,
  long: 0,
};

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLocation: [],
      last: locationDefault,
    };
    this.handleLocation = this.handleLocation.bind(this);
  }

  async handleLocation() {
    console.log(this.state);
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(
            ` https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAbisn1B492xoAMMh_ulC9Rau_k28j5nn0
        `
          )
          .then((res) => {
            let postCode = res.data.results[0].address_components[7].long_name;

            this.setState({
              last: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
              listLocation: [
                ...this.state.listLocation,
                {
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                  postCode,
                },
              ],
            });
          })
          .catch((err) => console.log(err));
      },
      (err) => console.log(err)
    );
  }
  render() {
    return (
      <center>
        <article id="location-container">
          <Button variant="primary" onClick={this.handleLocation}>
            Location Now
          </Button>
          <div className="divider"></div>
          <h1>Last Location </h1>
          <br />
          <h3>
            Lat: <span id="last-lat">{this.state.last.lat}</span>
          </h3>
          <h3>
            Long: <span id="last-long">{this.state.last.lat}</span>{" "}
          </h3>
          <Table striped bordered hover id="table">
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>C.P</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listLocation.map((location) => {
                return (
                  <tr>
                    <td>{location.lat}</td>
                    <td>{location.long}</td>
                    <td>{location.postCode}</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </Table>
        </article>
      </center>
    );
  }
}

export default Locations;
