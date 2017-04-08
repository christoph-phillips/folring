import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Folring from './folring/Folring';
import Nav from './nav/Nav';
import Login from './Login/login';

class App extends Component {

 constructor(props) {
    super(props);
    this.state = {
      rooms: null,
      user: null
    }

    this.HomepageWrapper = (props) => {
    return <Homepage {...props} rooms={this.state.rooms} user={this.state.user} />
    }

    this.ProfileWrapper = (props) => {
       return <Profile {...props} user={this.state.user} />
    }

    this.FolringWrapper = (props) => {
      return <Folring {...props} user={this.state.user} />
   }

   this.LoginWrapper = (props) => {
      return <Login {...props} />
   }
  }

  componentDidMount() {
    // window.socket.on('update_room', (room) => {
    //   const newRooms = { ...this.state.rooms };
    //   newRooms[room.id] = room;
    //   this.setState({rooms: newRooms});
    // });

    // window.socket.on('send_all_rooms', (rooms) => {
    //   this.setState({rooms: rooms})
    // });

    // window.socket.on('user', (user) => {
    //   this.setState({user: user});
    // });
  }

  render() {
    return (
          <div>
            <Nav user={this.state.user}/>
            <Route exact path="/" component={this.LoginWrapper}/>
            <Route path="/rooms" component={this.HomepageWrapper} />
            <Route path="/profile" component={this.ProfileWrapper}/>
            <Route path="/folring" component={this.FolringWrapper} />
          </div>
      )
  }
 
}


export default App;