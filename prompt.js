document.addEventListener('DOMContentLoaded', () =>
{
	document.querySelector('a').onclick = function() { chrome.tabs.create({url:'chrome:\/\/extensions',active:true}); };
}, { "once":true });