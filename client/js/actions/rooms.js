
import axios from 'axios';
import { LOAD_CURRENT_ROOM, LOAD_MAIN_ROOMS, UPDATE_CURRENT_ROOM } from './types';

export function listRooms(query) {

	return function(dispatch) {
	    const url = '/api/rooms';
	    const options = {
	      headers: { authorization: window.localStorage.apitoken }
	    };

	    axios.get(url, options)
	      .then(response => {
	        if (response.error) {
	          console.log(response.error);
	          dispatch({type: LOAD_MAIN_ROOMS, payload: []});
	        } else {
	          dispatch({
	            type: LOAD_MAIN_ROOMS,
	            payload: response.data
	          });

	        }
	   
	      }).catch(err => {
	      	console.log(err);
	        dispatch({type: LOAD_MAIN_ROOMS, payload: []});
	      });
    }

}

export function getCurrentRoom(roomId) {

	return function(dispatch) {
	    const url = `/api/room/${roomId}`;
	    const options = {
	      headers: { authorization: window.localStorage.apitoken }
	    };

	    axios.get(url, options)
	      .then(response => {
	        if (response.error) {
	          console.log(response.error);
	          dispatch({type: LOAD_CURRENT_ROOM, payload: {}});
	        } else {
	          dispatch({
	            type: LOAD_CURRENT_ROOM,
	            payload: response.data
	          });

	        }
	   
	      }).catch(err => {
	      	console.log(err);
	        dispatch({type: LOAD_CURRENT_ROOM, payload: {}});
	      });
    }

}	

export function updateCurrentRoom(config) {
	console.log('CALLING UPDATE CURRENT ROOM')
	return { type: UPDATE_CURRENT_ROOM, payload: config }
}