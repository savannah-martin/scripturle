const letterInputs = document.querySelectorAll("input.letter");
const wordElement = document.querySelector(".word");
let word = "";



letterInputs.forEach(input => input.addEventListener("keyup", (e)=> {
    console.log(e.key);

    if(e.key == "Enter") {
        // Submit form?
    }
    else if(e.key === "Backspace") {
        word = word.slice(0, -1);
        wordElement.textContent = word;

        if (input.previousElementSibling) {
            input.previousElementSibling.focus();
            input.previousElementSibling.value = "";
        }
    }
    else {
        word += input.value;
        wordElement.textContent = word;
        
        e.target.value && input.nextElementSibling.focus();

    }
}));