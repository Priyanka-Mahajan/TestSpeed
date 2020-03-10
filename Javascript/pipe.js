function generatePipes() {

    let pipeDiaSec = document.getElementById("PipeDiaSection");
    let pipeDiaCount = pipeDiaSec.childElementCount;
    let pipeCount = Number(document.getElementById("PipeCount").value);

    if(pipeDiaCount == pipeCount){
        return;
    }
    else{   
        removePipeAngleField();
        addPipeAngleField(pipeCount);

        removePipeDiaField();
        addPipeDiaField(pipeCount);

        changeWellDiaBounds(pipeCount);
    }
}

function changeWellDiaBounds(pipeCount){

    if(pipeCount == 4){
        document.getElementById("OuterWellDia").min = 1350;

        document.getElementById("InnerWellDia").min = 1250;
        document.getElementById("InnerWellDia").max = 1400;
    }
    else{
        document.getElementById("OuterWellDia").min = 1250;

        document.getElementById("InnerWellDia").min = 1150;
        document.getElementById("InnerWellDia").max = 2400;
    }
}

function addPipeDiaField(pipeCount) {

    for(let i = 1; i <= pipeCount; i++)
    {
        let val;
        switch(i)
        {
            case 1:
            case 2:
                val = '500';
                break;
            case 3:
                val = '700';
                break;
            case 4:
                val = '200';
                break;
        }

        let inputGrp = document.createElement("div");
        inputGrp.setAttribute("id", "inputGrpDia" + i );
        inputGrp.setAttribute("class", "mb-3");
    
        inputGrp.innerHTML = '<label>Pipe ' + i + ' (mm)</label><div class="inputDiv"><input id="Diameter' + i + '" name="DIAMETERS|DIA' + i + '" value="' + val + '" min="200" max="900" step="0.01" data-toggle="tooltip" data-placement="auto" onblur="InputFocusLost(this)" onchange="validateInputField(this)" onkeydown="validateKeyStroke(this)" required></div>';
    
        document.getElementById("PipeDiaSection").appendChild(inputGrp);
    }
}

function removePipeDiaField(startIdx, endIdx) {

    let parent = document.getElementById("PipeDiaSection");
    let count = parent.childElementCount;

    for(let i = 1; i <= count; i++)
    {
        let child = document.getElementById("inputGrpDia" + i);
        parent.removeChild(child);
    }
}

function removePipeAngleField() {

    let parent = document.getElementById("PipeAngleSection");
    let count = parent.childElementCount;

    for(let i = 1; i <= count; i++)
    {
        let child = document.getElementById("inputGrpAngle" + i);
        parent.removeChild(child);
    }
}

function addPipeAngleField(pipeCount) {

    let val = 360 / parseInt(pipeCount);
    let min = 30;
    let max = 300;

    if(pipeCount == 2){
        min = 135;
        max = 225;
    }
    else if(pipeCount == 4){
        min = 90;
    }
        
    for(let i = 1; i < pipeCount; i++)
    {
        var inputGrp = document.createElement("div");
        inputGrp.setAttribute("id", "inputGrpAngle" + i );
        inputGrp.setAttribute("class", "mb-3");

        inputGrp.innerHTML = '<label>Between Pipe ' + i + '-' + (i + 1) + ' (deg)</label><div class="inputDiv"><input id="Angle' + i + '" name="ANGLES|ANGLE' + i + '" value="' + val + '" min=' + min + ' max=' + max + ' step="0.01" data-toggle="tooltip" data-placement="auto" onblur="InputFocusLost(this)" onchange="validateInputField(this)" onkeydown="validateKeyStroke(this)" required></div>';

        document.getElementById("PipeAngleSection").appendChild(inputGrp);
    }
}