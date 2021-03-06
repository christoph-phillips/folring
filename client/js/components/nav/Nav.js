
import {
  Link
} from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutUser } from '../../actions/auth';
import { updateUI } from '../../actions/ui';

if (process.env.BROWSER) {
	require('./Nav.css');
}

class Nav extends Component {

	logout() {
		this.props.logoutUser();
		this.props.updateUI({login: true});
		this.props.history.push(`/`);
	}

	render() {
		return (
			<div>
	     	{ this.props.user ? 
	      	<div className="nav">
	       		<Link to="/rooms"><button className="home" title="home"></button></Link>
	       		<Link to="/profile"><button className="profile" title="profile"></button></Link>
	       		<button className="logout" onClick={this.logout.bind(this)}>Logout</button> 
			</div>
	  		: null }
  		</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    	user: state.user
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutUser,
        updateUI
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);;
