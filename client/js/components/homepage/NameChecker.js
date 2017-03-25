

import React, { Component } from 'react';

export default class NameChecker extends Component {

	constructor(props) {
		super(props);
		this.addUser = this.addUser.bind(this);
	}

	addUser(e) {
		window.user = e.target.value;
		console.log(window.user);
	}

	render() {
		return (
			<div>
				<h2> What is your name? </h2>
				<input onChange={this.addUser}></input>
				<button onClick={this.props.goToRooms}></button>
			</div>
		);
	}
}