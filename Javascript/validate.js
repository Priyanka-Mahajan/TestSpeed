// 'left arrow', 'up arrow', 'right arrow', 'down arrow',
const arrowsKeyCodes = [37, 38, 39, 40];

const integerKeyCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
// 'numpad 0', 'numpad 1',  'numpad 2', 'numpad 3', 'numpad 4', 'numpad 5', 'numpad 6', 'numpad 7', 'numpad 8', 'numpad 9'
const numPadNumberKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

// Decimal, Period
const decimalKeyCode = [110, 190];

// BackSpace, Tab, Enter, Shift, Alt
const inputKeyCode = [8, 9, 13, 16, 18];

var errorFlag = false;

function validateKeyStroke(input){

    $(input).tooltip('dispose');

    if (!integerKeyCode.includes(event.keyCode) && !arrowsKeyCodes.includes(event.keyCode) &&
        !numPadNumberKeyCodes.includes(event.keyCode) && !inputKeyCode.includes(event.keyCode)){

            if(input.id == "PipeCount"){
                $(input).tooltip({ 'title': 'Please enter only numeric values'}).tooltip('show');
                errorFlag = true;
                event.preventDefault();
                return;
            }
            else{
                if(!decimalKeyCode.includes(event.keyCode)){
                    $(input).tooltip({ 'title': 'Please enter only numeric values'}).tooltip('show');
                    errorFlag = true;
                    event.preventDefault();
                    return;
                }
            }
    }
}

function validateInputField(input) {

    $(input).tooltip('dispose');
    errorFlag = false;

    const inputVal = parseFloat(input.value);
    const minVal = parseFloat(input.min);
    const maxVal = parseFloat(input.max);
    const inputID = input.id;
    
    const decimalPattern = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;

    // Null value check
    if(input.value == "" || input.value == null){
        $(input).tooltip({ 'title': 'The field cannot be empty'}).tooltip('show');
        errorFlag = true;
    }
    else if(!decimalPattern.test(input.value)){     //Decimal format check
        $(input).tooltip({ 'title': 'Please enter a valid decimal number with max 2 decimal places'}).tooltip('show');
        errorFlag = true;
    }
    else if(inputVal < minVal){     //Min Bound check
        $(input).tooltip({ 'title': 'The value you have typed in is too low. Minimum allowed input is ' + $(input).attr('min') + ', maximum ' + $(input).attr('max') + '.'}).tooltip('show');
        errorFlag = true;
    }
    else if(inputVal > maxVal){     //Max Bound Check
        $(input).tooltip({ 'title': 'The value you have typed in is too high. Maximum allowed input is ' + $(input).attr('max') + ', minimum ' + $(input).attr('min') + '.'}).tooltip('show');
        errorFlag = true;
    }
    else if(inputID.includes("WellDia")){    // Outer Diameter should be more than inner diameter

        outerWell = document.getElementById("OuterWellDia").value;
        innerWell = document.getElementById("InnerWellDia").value

        if(parseFloat(outerWell) < parseFloat(innerWell)){
            $(input).tooltip({ 'title': 'Outer well diameter cannot be less than Inner well diameter.'}).tooltip('show');
            errorFlag = true;
        }
    }
    else if(inputID.includes("Angle")){  // Sum of all angles should be less than 330

        let angles = document.getElementById("PipeAngleSection");

        let sum = 0;
        for(let i = 1; i <= angles.childElementCount; i++)
        {
            let child = document.getElementById("Angle" + i);
            sum += parseFloat(child.value);
        }

        let sumMax = (document.getElementById('PipeCount').value == 3) ? 300 : 330;

        if(sum >= sumMax){
            $(input).tooltip({ 'title': 'Sum of all the pipe angles should be less than ' + sumMax + ' degrees.'}).tooltip('show');
            errorFlag = true;
        }
    }
    else if(inputID.includes("Diameter")){   // Diameter should be less than Mould Height

        let mouldHeight = document.getElementById("MouldHeight").value;

        if(inputVal > parseFloat(mouldHeight)){
            $(input).tooltip({ 'title': 'Diameter cannot be more than Mould Height.'}).tooltip('show');
            errorFlag = true;
        }
    }
    else if(inputID.includes("MouldHeight")){    // Mould Height should be more than the diameters

        let diameters = document.getElementById("PipeDiaSection");

        for(let i = 1; i <= diameters.childElementCount; i++)
        {
            let dia = document.getElementById("Diameter" + i).value;

            if(parseFloat(dia) > inputVal){
                $(input).tooltip({ 'title': 'Mould Height cannot be less than the diameters'}).tooltip('show');
                errorFlag = true;
            }
        }
    } 

    if(!errorFlag){

        updateSpinnerFlag(true);

        //Generate inpput fields when number of pipes changes
        if(inputID == "PipeCount"){
            generatePipes();
        }

        resizeInput(input);

        var param = { "name": input.name, "value": input.value };
        setTimeout(function(){ unityInstance.SendMessage('ControlMaster', 'SendParameters', JSON.stringify(param)); updateSpinnerFlag(false); }, 1);
    }
}

function InputFocusLost(input){

    if(errorFlag || input.value == "" || input.value == null){
        errorFlag = false;
        setTimeout(() =>{ input.focus(); validateInputField(input); } , 1);
    }
}