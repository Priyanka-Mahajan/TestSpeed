function UnityProgress(unityInstance, progress) {

	var container = document.getElementById("unityContainer");
	if (container) 
		document.body.style.background = container.style.background;

	if (!unityInstance.Module) {
	  return;
	} else if (progress === "complete") {

		document.getElementById("spinner").style.display = "none";
		document.getElementById("bgBar").style.display = "block";
		document.getElementById("progressBar").style.display = "inherit";
		document.getElementById("progressBar").style.display = "none";
		document.getElementById("loadingInfo").innerHTML = "Loading...";

		setTimeout(() => {
			document.getElementById("loadingBox").style.display = "none";
			document.getElementById("icon").style.display = "none";
			document.getElementById("loadingInfo").style.display = "none";
		}, 10000)

	} else if (progress === 1 || progress === "preinit") {
		document.getElementById("progressBar").style.width = 200 * 0.95 + "px"
		document.getElementById("loadingInfo").innerHTML = "95%";
		document.getElementById("spinner").style.display = "none";
		document.getElementById("bgBar").style.display = "block";
		document.getElementById("progressBar").style.display = "inherit";

	} else if (progress > 0) {

		document.getElementById("progressBar").style.width = 200 * (progress) + "px"
		document.getElementById("loadingInfo").innerHTML = Math.round((progress) * 100) + "%";
		document.getElementById("spinner").style.display = "none";
		document.getElementById("bgBar").style.display = "block";
		document.getElementById("progressBar").style.display = "inherit";
	}

	}

UnityLoader.Error.handler = function(e, t){
	document.getElementById("loadingBox").style.display = "none";
	document.getElementById("icon").style.display = "none";
	document.getElementById("loadingInfo").style.display = "none";
	document.getElementById("unityContainer").style.display = "none";
	document.getElementById("updateSpinner").style.display = "none";
	document.getElementById("processing").style.display = "none";

	document.getElementById("unityError").style.display = "block";
}
	
var unityInstance = UnityLoader.instantiate("unityContainer", "UnityBuild/GeometryTest.json", {
	onProgress: UnityProgress,
	Module: {
		onRuntimeInitialized: function() { UnityProgress(unityInstance, "complete"); },
		preInit: [function() { UnityProgress(unityInstance, "preinit"); }]
	}
});

function loadComplete(){

	document.getElementById("loadingBox").style.display = "none";
	document.getElementById("icon").style.display = "none";
	document.getElementById("loadingInfo").style.display = "none";
}