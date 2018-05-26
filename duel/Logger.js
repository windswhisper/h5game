var Logger = {}
Logger.log = function(event,text) {
	console.log("["+event+"]"+text);
}
module.exports = Logger;
