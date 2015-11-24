!function(){var analytics=window.analytics=window.analytics||[];if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.0";
	var segmentWriteKey = null;
	var segmentPagename = 'Unknown';
	var segmentOptions = {};
	if ( typeof Segment_Vars !== 'undefined' ) {
		if ( Segment_Vars.writekey && Segment_Vars.writekey.write_key ) {
			segmentWriteKey = Segment_Vars.writekey.write_key;
		}
		if ( Segment_Vars.pagename ) {
			segmentPagename = Segment_Vars.pagename;
		}
		if ( Segment_Vars.options ) {
			segmentOptions = Segment_Vars.options;
		}
	}
	if ( segmentWriteKey !== null ) {
		window.analytics.load(segmentWriteKey);
		window.analytics.page('marketing', segmentPagename, {}, segmentOptions);
	}
}}();
