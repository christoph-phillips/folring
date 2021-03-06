'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { login: false };
	var action = arguments[1];


	switch (action.type) {
		case _types.UPDATE_UI:
			return _extends({}, state, action.payload);
	}

	return state;
};

var _types = require('../actions/types');