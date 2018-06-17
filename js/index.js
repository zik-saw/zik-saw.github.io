//сложение случайных чисел
var x  = [6, 7, 8, 9],
    y = [],
    randX = Math.floor(Math.random() * x.length),
    randY,
    startX = 45,
    difference = 39,
    parent = document.querySelector('#parent');



for(var i = 11 - x[randX]; i <= 14 - x[randX]; i++)
{
    y.push(i);
}

randY = Math.floor(Math.random() * y.length);
parent.innerHTML = '<h1 align="center"><span class="firstNumber">' + x[randX] + '</span>' + ' + ' + '<span class="secondNumber">' + y[randY] + '</span>' + ' = ' +'<span class="resultNumber">'+'?'+'</span>'+'</h1>' ;


// Рисование канвы
function drawArc(count){
    var canvas = document.getElementById("myCanvas"),
        context = canvas.getContext("2d"), //генерирует контекст рисования, который будет связан с указанным холстом
        finishX = startX +  difference*( count == "first" ? x[randX] : y[randY] ),
        yAxis = 160,
        yOffset = ( count == "first" ? 90 : 50),
        xOffset =  ( count == "first" ? 70 : 20);

    context.moveTo(startX, yAxis);
    context.bezierCurveTo(startX + xOffset, yAxis - yOffset, finishX - xOffset, yAxis - yOffset, finishX, yAxis);

    context.lineWidth = 1;
    context.strokeStyle = "red";
    context.stroke();

    //стрелка
    context.moveTo(finishX, yAxis);
    context.lineTo(finishX - 10, yAxis );
    context.stroke();
    context.moveTo(finishX, yAxis);
    context.lineTo(finishX , yAxis - 10);
    context.stroke();


    addInput(finishX , (  count == "first" ?  yAxis - 15 : yAxis + 15) , ( count == "first" ? "firstNumber" : "secondNumber" ) );
    startX = finishX;


};


function createInput(span)
{
    var input;
    input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('data-number' , 'result');
    input.maxLength = '2';
    input.classList.add('result');
    input.onkeyup = changeInput;
    span.parentNode.replaceChild(input , span );
}

function createSpan(input)
{
    var span = document.createElement('span');
    span.style.left =  input.style.left;
    span.style.top = input.style.top;
    span.innerText = input.value;
    input.parentNode.replaceChild(span, input);
}

function handlerResult(input)
{
   var span;
   if(parseInt(input.value) != parseInt(x[randX]) + parseInt(y[randY]) )
   {
        input.classList.add('error');
   }
   else
   {
       createSpan(input);
       input.remove();
   }
}

function handlerTerm(input , rightNumberBlock, typeNumber)
{
    var span;

    if( parseInt(input.value) !=  parseInt(rightNumberBlock.textContent) )
    {
        rightNumberBlock.classList.add('error');
        input.classList.add('error');
    }
    else
    {
        rightNumberBlock.classList.remove('error');

        createSpan(input);
        input.remove();

        if(typeNumber == "firstNumber")
            drawArc('second');
        else
        {
            span = document.querySelector('span.resultNumber');
            createInput(span);

        }
    }
}

function changeInput(){
    var typeNumber = this.getAttribute('data-number'),
        rightNumberBlock = document.querySelector('span.'+typeNumber);

    switch(typeNumber)
    {
        case "result" :

            handlerResult(this);
            break;
        default :
            handlerTerm(this, rightNumberBlock , typeNumber);
            break;
    }

}

function addInput(x , y , typeNumber)
{
    var input  = document.createElement('input');
    input.type = 'text';
    input.setAttribute('data-number' , typeNumber);
    input.maxLength = '1';
    input.style.position = 'fixed';

    input.style.left =( (x - startX) / 2 + startX) + 'px';
    input.style.top = y + 'px';
    input.onkeyup = changeInput;
    document.body.appendChild(input);

}

function drawImg() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var img = new Image();
    context.moveTo(200, 150);

    img.onload = function() {
        context.drawImage(img, 10, 150);
        drawArc('first');

    };

    img.src = "img/sprite.png";

}


window.onload = function (){
    drawImg();
}