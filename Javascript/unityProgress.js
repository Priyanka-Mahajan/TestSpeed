var timer;

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

		timer = setInterval(() => {
			let date = new Date();
			updateLoader(date.getMilliseconds() / 1000);
		}, 700);

	} else if (progress === 1 || progress === "preinit") {
		document.getElementById("progressBar").style.width = 200 * 0.4 + "px"
		document.getElementById("loadingInfo").innerHTML = Math.round(0.4 * 100) + "%";
		document.getElementById("spinner").style.display = "none";
		document.getElementById("bgBar").style.display = "block";
		document.getElementById("progressBar").style.display = "inherit";

	} else if (progress > 0) {

		document.getElementById("progressBar").style.width = 200 * (progress/3) + "px"
		document.getElementById("loadingInfo").innerHTML = Math.round((progress/3) * 100) + "%";
		document.getElementById("spinner").style.display = "none";
		document.getElementById("bgBar").style.display = "block";
		document.getElementById("progressBar").style.display = "inherit";
	}

	}

var unityInstance = UnityLoader.instantiate("unityContainer", "UnityBuild/GeometryTest.json", {
	onProgress: UnityProgress,
	Module: {
		onRuntimeInitialized: function() { UnityProgress(unityInstance, "complete"); },
		preInit: [function() { UnityProgress(unityInstance, "preinit"); }]
	}
});

function updateLoader(counter){
	if(counter < 0.5){
		counter += 0.5
	}
	document.getElementById("progressBar").style.width = 200 * counter + "px"
	document.getElementById("loadingInfo").innerHTML = Math.round(counter * 100) + "%";
}

function setSpinnerFlag(flag){

    if(flag == false){
        document.getElementById("loadingBox").style.display = "none";
        document.getElementById("icon").style.display = "none";
        document.getElementById("loadingInfo").style.display = "none";
	}
	
	clearInterval(timer);
}

function updateSpinnerFlag(flag){
    if(flag == true){
        document.getElementById("updateSpinner").style.display = "block";
		document.getElementById("processing").style.display = "block";
		$(document.getElementById("unityContainer")).css("filter", "blur(3px)");
    }
    else{
        document.getElementById("updateSpinner").style.display = "none";
		document.getElementById("processing").style.display = "none";
		$(document.getElementById("unityContainer")).css("filter", "blur(0px)");
    }
}