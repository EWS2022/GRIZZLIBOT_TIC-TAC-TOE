let allCase = document.querySelectorAll('.case');//🧑‍💻
for (let i = 0; i < allCase.length; i++) {
    allCase[i].onclick = function () {
        allCase[i].innerText ='🧑‍💻';
    }
}
