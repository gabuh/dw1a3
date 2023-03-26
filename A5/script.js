

const questions = document.getElementsByClassName('question');
const answers = document.getElementsByClassName('answer');

for (let index = 0; index < questions.length; index++) {
    questions.item(index).addEventListener("mouseover", function(){
        answers.item(index).classList.add('active');
    });
    questions.item(index).addEventListener("mouseout", function(){
        answers.item(index).classList.remove('active');
    });
    
}