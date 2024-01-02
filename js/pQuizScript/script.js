const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart"); 
const quiz_box = document.querySelector(".quiz_box"); 
const opt_list =document.querySelector(".opt_list");
const timeCount=quiz_box.querySelector(".timer .timer_sec");
const timeLine=quiz_box.querySelector("header .time_line");
const timeoff =quiz_box.querySelector("header .tym_text");

//if strt button clicked
start_btn.onclick =()=>{
    info_box.classList.add("activeInfo");
}
//if exit button clicked
exit_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");
}
//if continue button clicked
continue_btn.onclick =()=>{
    quiz_box.classList.add("activeQuiz");
    info_box.classList.remove("activeInfo");
    
    showQuestions(0);
    quecounter(1);
    starttimer(15);
    starttimerline(0);
}


let que_count=0;
let que_numb=1;
let counter;
let counterLine;
let timevalue=15;
let widthval=0;
let userscore=0;

const next_btn = quiz_box.querySelector(".next");
const result_box=document.querySelector(".result_box");
const restart_quiz=result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");

restart_quiz.onclick =() =>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");

    let que_count=0;
    let que_numb=1;
    let timevalue=15;
    let widthval=0;
    //let userscore=0;

    showQuestions(que_count);
    quecounter(que_numb);

    clearInterval(counter);
    starttimer(timevalue);

    clearInterval(counterLine);
    starttimerline(widthval);

    next_btn.style.display="none";
    timeoff.textContent="Time Left";
}

quit_quiz.onclick =() =>{
    window.location.reload();
}

// if nxt clicked 
next_btn.onclick =()=>{
    if(que_count < questions.length-1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        quecounter(que_numb);

        clearInterval(counter);
        starttimer(timevalue);

        clearInterval(counterLine);
        starttimerline(widthval);

        next_btn.style.display="none";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed !!");
        showresultBox();

    }
}

//getting question from question.js
function showQuestions(index){
    const que_text =document.querySelector(".que-1");
    
    let que_tag='<span>'+questions[index].numb+ " . " + questions[index].questions + '</span>';
    let opt_tag='<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                        + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                        + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                        + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML=que_tag;
    opt_list.innerHTML=opt_tag;
    const option=opt_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++){
       option[i].setAttribute("onclick","optionselected(this)");
    }
}

let tickicon='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon='<div class="icon cross"><i class="fas fa-times"></i></div>';
//-------------------------------------------------------------------------------------------

function optionselected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userans = answer.textContent;
    let correctans=questions[que_count].answer;
    let alloption=opt_list.children.length;
    
    if(userans==correctans){
        userscore+=1;
        console.log(userscore);

        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend",tickicon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend",crossicon);
        //automatic answer show
        for(let i=0;i<alloption;i++){
           if(opt_list.children[i].textContent == correctans){
                opt_list.children[i].setAttribute("class","option correct ");
                opt_list.children[i].insertAdjacentHTML("beforeend",tickicon);
            }
        }
    }
    
    for(let i=0;i<alloption;i++){
        opt_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

function showresultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText=result_box.querySelector(".score_test");
    if(userscore>5){
        let scoreTag ='<span>CONGRATS!! You got [<p> ' + userscore +' </p>] out of [<p> '+ questions.length +' </p>]</span>';
        scoreText.innerHTML=scoreTag;
    }

    else if(userscore>3){
        let scoreTag ='<span>NICE TRY!! You got [<p> '+ userscore +' </p>] out of [<p> '+ questions.length +' </p>]</span>';
        scoreText.innerHTML=scoreTag;
    }

    else{
        let scoreTag ='<span>SORRY!! You got only [<p> '+ userscore +' </p>] out of [<p> '+ questions.length +' </p>]</span>';
        scoreText.innerHTML=scoreTag;
    }
    
}
function starttimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<9){
            let addzero=timeCount.textContent;
            timeCount.textContent ="0"+addzero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent="00";
            timeoff.textContent="Time Off";

            let correctans=questions[que_count].answer;
            let alloption=opt_list.children.length;

            for(let i=0;i<alloption;i++){
                if(opt_list.children[i].textContent == correctans){
                     opt_list.children[i].setAttribute("class","option correct ");
                     opt_list.children[i].insertAdjacentHTML("beforeend",tickicon);
                }
            }
            for(let i=0;i<alloption;i++){
                opt_list.children[i].classList.add("disabled");
            }
            next_btn.style.display="block";
        }
    }
}

function starttimerline(time){
    counterLine = setInterval(timer,29);
    function timer(){
        time+=1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


function quecounter(index){
const bottom_que_counter =quiz_box.querySelector(".total-question");
let totalquescountTag='<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
bottom_que_counter.innerHTML=totalquescountTag;
}