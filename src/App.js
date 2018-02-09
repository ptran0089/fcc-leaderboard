import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      campersSortedByRecent: [],
      campersSortedByAllTime: [],
      sortBy: 'recent'
    };
    
    this.fetchThirtyDays = this.fetchThirtyDays.bind(this);
    this.fetchAllTime = this.fetchAllTime.bind(this);
  }
  
  componentWillMount() {
    this.fetchThirtyDays();
    this.fetchAllTime();
  }
  
  fetchThirtyDays() {
    const request = axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    
    request.then(data => {
      const sortedData = data.data.sort((a, b) => {
        return b.recent - a.recent;
      });
      this.setState({
        campersSortedByRecent: sortedData
      });
    });
  }
  
  fetchAllTime() {
    const request = axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    
    request.then(data => {
      const sortedData = data.data.sort((a, b) => {
        return b.alltime - a.alltime;
      });
      this.setState({
        campersSortedByAllTime: sortedData
      });
    });
  }

  sortBy(order) {
    this.setState({
      sortBy: order
    });
  }
  
  renderCampers() {
    if (this.state.sortBy === 'all time') {
      return this.state.campersSortedByAllTime.map((camper, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>         
              <img className="img" src={camper.img} alt="user icon"/>
              <span className="username">{camper.username}</span>
            </td>
            <td>{camper.recent}</td>
            <td>{camper.alltime}</td>          
          </tr>
        );
      });
    } else {
      return this.state.campersSortedByRecent.map((camper, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>         
              <img className="img" src={camper.img} alt="user icon"/>
              <span className="username">{camper.username}</span>
            </td>
            <td>{camper.recent}</td>
            <td>{camper.alltime}</td>          
          </tr>
        );
      });
    }
  }
  
  render() {
    const allTimePointer = this.state.sortBy === 'all time' ? String.fromCharCode(0x25BC) : String.fromCharCode(0x25BD);
    const thirtyDaysPointer = this.state.sortBy === 'all time' ? String.fromCharCode(0x25BD) : String.fromCharCode(0x25BC);
    return (
      <div className="container">
        <table>
          <caption>Leaderboard</caption>
          <tbody>
            <tr>
              <th>#</th>
              <th>Camper name</th>
              <th>Points in the past 30 days <span onClick={() => this.sortBy('recent')}>{thirtyDaysPointer}</span></th>
              <th>All time points <span onClick={() => this.sortBy('all time')}>{allTimePointer}</span></th>
            </tr>
            {this.renderCampers()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
