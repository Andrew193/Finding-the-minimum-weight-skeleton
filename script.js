const result = document.querySelector('#result'),
tempMtr = document.querySelector('#mtr');
function ribMaker()
{
    this.value = 0;
    this.x = 0;
    this.y = 0;
}

document.querySelector('#button1').onclick =()=> {
    size = Number(document.querySelector('#vertex').value);
    tempMtr.innerHTML = " ";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            tempMtr.innerHTML += "<input class='mtrItem'></input>";
        }
        tempMtr.innerHTML += "<br>";
    }
}


document.querySelector('#button2').onclick =()=>{
    let inputData = document.querySelectorAll(".mtrItem");
    if(inputСheck(inputData)){ alert("Error" ); }
    else{
        let matrix = new Array(+size);
        let ribCount = 0;
        for (let i = 0; i < size; i++) {
            matrix[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                matrix[i][j] = inputData[i*size+j].value;
                if(matrix[i][j]>0)
                ribCount++;   
            }
        }

        let ribs = new Array();
        for (let i = 0; i < Number(ribCount/2); i++) { ribs[i] = new ribMaker; }

        let k = 1;
        let g=0;
        for (let i = 0; i < size-1; i++) {
            for (let j = k; j < size; j++) {
                if(inputData[i*size+j].value>0)
                 {
                     ribs[g].value = inputData[i*size+j].value;
                     ribs[g].x = i;
                     ribs[g].y = j;
                     g++;
                 }
            }
            k++
        }

        ribs.sort((a,b)=>a.value-b.value);

        let ost = new Array(size-1);
        let marks = new Array(size);

        for (let i = 0; i < size; i++) { marks[i] = 0;}
        let counter = 1;

        for (let i = 0, j = 0; i < ribs.length && j<ost.length; i++) {
            if(marks[ribs[i].x] != marks[ribs[i].y] || !marks[ribs[i].x])
            {
                marks =  Mark(marks,ribs,i,counter);
                ost[j]=ribs[i];
                j++;
                counter++;
            }   
        }
        showResult(ost);
    }
}

function Mark(marks,ribs,i,counter)
{
    let temp,temp2 = -1;
    if(marks[ribs[i].x] != 0)
    {
        temp = marks[ribs[i].x];
        if(marks[ribs[i].y] != 0)
            temp2 = marks[ribs[i].y];

        for (let j = 0; j < marks.length; j++) {
            if(marks[j] == temp||marks[j] == temp2)
                marks[j] = counter;
        }
        marks[ribs[i].y] = counter;

        return marks;
    }
    
    if(marks[ribs[i].y] != 0)
    {
        temp = marks[ribs[i].y]

        for (let j = 0; j < marks.length; j++) {
            if(marks[j] == temp)
                marks[j] = counter;
        }
        marks[ribs[i].x] = counter;
        return marks;
    }
  
        marks[ribs[i].x] = counter;
        marks[ribs[i].y] = counter;
        return marks;
}

function inputСheck(toDo)
{
    for(let i = 0;i<Math.pow(size,2);i++)
        if(isNaN(toDo[i].value))
          return true

    return false
}



function showResult(ostov)
{
    result.innerHTML = " ";
    let Sum = 0;    
    ostov.forEach(element => { Sum += +element.value; });
    result.innerHTML += `Сумма = ${Sum} <br>`;
    result.innerHTML += "Остов мин веса образуются вершинами:  <br>";
    for (let i = 0; i < size-1; i++) { result.innerHTML += `V${ostov[i].x+1} и V${ostov[i].y+1} <br>`; }
}