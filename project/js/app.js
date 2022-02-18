let input =document.getElementById("input")
let from = document.getElementById("from")
let to = document.getElementById("to")
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
let tr = document.createElement("tr");
let tfoot = document.getElementById("tfoot")
let modeIcon = document.getElementById("modeIcon")


function createOption(x,y,z){
    let o = document.createElement("option")
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z))
     o.appendChild(t);
     x.appendChild(o);
}

function toNum(x){
    return Number(x.replace(",",""));
}

function createTr(x){
    let tr = document.createElement("tr");
    let rowSpacer = document.getElementById("rowspacer");
    if(rowSpacer){
        rowSpacer.remove();
    }


    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);

        td.appendChild(text);
        tr.appendChild(td);
    })

    historyList.appendChild(tr);
}


function store(){
    localStorage.setItem("record",historyList.innerHTML)
}


for(x in data.rates){
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x]);
    // console.log(x,data.rates[x])
}


document.getElementById("calc").addEventListener("submit",function (e){
    
    e.preventDefault()
    //get start
    let x = input.value;
    let y = from.value;
    let z = to.value;

    // console.log(x,y,z);

    //process
    let first = x * y;
    let second = first/z;

    let formText = x + " "+ from.options[from.selectedIndex].innerText;
    let toText = to.options[to.selectedIndex].innerText;
    let resultO = second.toFixed(3);
    let date = new Date().toLocaleString();
    let arr = [date,formText,toText,resultO];
    createTr(arr);
    store()
    //set states
    result.innerHTML = second.toFixed(3);
    input.value="";
    input.focus();
    from.value="";
    to.value = "1";

});

(function (){
    if(localStorage.getItem("record")){
        historyList.innerHTML= localStorage.getItem("record")
    }

    else{
        historyList.innerHTML = `<tr id="rowspacer"><td colspan="4" style="text-align: center;">There is no record</td></tr>
        `;
    }
})()

function clearz(){
    localStorage.clear();
    historyList.remove();
    tfoot.innerHTML = `<tr id="notedata"><td colspan="4" style="text-align: center;">There is no record</td></tr>
    `;
    result.innerHTML ="0.00"

    
}

function changeMode(){
    document.body.classList.toggle("night-mode");
    modeIcon.classList.toggle("fa-sun")
}



