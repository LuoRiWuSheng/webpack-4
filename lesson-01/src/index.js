import _ from 'lodash'

import "./index.css"

import image from './warn-mode.png'

function component() {
	var element = document.createElement("div")

	element.innerHTML = _.join(['hello', 'webpack'], ' ')

	return element
}

function loadeImage() {
	var o = new Image();
	o.src = image;
	return o;
}

document.body.appendChild(component())
document.body.appendChild(loadeImage())