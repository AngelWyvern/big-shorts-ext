const regex = new RegExp("^(https?://(?:[^./]+\\.)?youtube\\.com)/(?:shorts/)([\\w-]+)");

function begoneShorts(details, callback)
{
	const match = details.url.match(regex);
	if (match)
	{
		console.log(`Redirecting to "${match[1]}/watch?v=${match[2]}"...`);
		return callback(`${match[1]}/watch?v=${match[2]}`);
	}
}

chrome.webRequest.onBeforeRequest.addListener(e => begoneShorts(e, url =>
{
	return { "redirectUrl":url };
}), { "urls":[ "*://*.youtube.com/shorts/*" ] }, [ "blocking" ]);

chrome.webNavigation.onHistoryStateUpdated.addListener(e => begoneShorts(e, url =>
{
	chrome.tabs.reload(e.tabId); // forces onBeforeRequest to happen
}), { "urls":[ "*://*.youtube.com/*" ] });