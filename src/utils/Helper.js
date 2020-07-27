export const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const getMetaContentByName = (name, content) => {
	var content = (content == null) ? 'content' : content;
	return document.querySelector("meta[name='" + name + "']").getAttribute(content);
}

export const setMetaContentByName = (name, content, value) => {
	var content = (content == null) ? 'content' : content;
	return document.querySelector("meta[name='" + name + "']").setAttribute(content, value);
}

export const getCanvasImageURL = (letter) => {
	let name = letter.trim().split(" ")
	let shortName = name[0][0] + (name[1] ? name[1][0] : '')
	let canvas = window.document.createElement('canvas');
	canvas.style.display = 'none';
	canvas.width = '100';
	canvas.height = '100';
	var context = canvas.getContext('2d');
	context.fillStyle = "#0097F4";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = "50px Roboto";
	context.fillStyle = "#fff";
	var initials = shortName;
	context.textAlign = "center";
	context.fillText(initials.toUpperCase(), 50, 66);
	var data = canvas.toDataURL();
	return data;
}