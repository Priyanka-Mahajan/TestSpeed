function resizeInput(){
    // Get the container element
    var container = document.getElementById('parameterForm');

    // Find its child `input` elements
    var inputs = container.getElementsByTagName('input');

    for (let index = 0; index < inputs.length; ++index) {
        
        let input = inputs[index];

        let delta = parseFloat(input.max) - parseFloat(input.min);
        let inputDelta = parseFloat(input.value) - parseFloat(input.min);
        let elementWidth = (inputDelta / delta) * 100;

        input.setAttribute("style", "width: " + elementWidth + "%");
    }
}
