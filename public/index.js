const letterInputs = document.querySelectorAll("input.letter");
const guessText = document.querySelector(".guess");
const guessInput = document.getElementById("guess");

let word = "";



letterInputs.forEach(input => input.addEventListener("keyup", (e)=> {
    console.log(e.key);

    if(e.key == "Enter") {
        // Submit form?
    }
    else if(e.key === "Backspace") {
        word = word.slice(0, -1);
        guessText.textContent = word;

        if (input.previousElementSibling) {
            input.previousElementSibling.focus();
            input.previousElementSibling.value = "";
        }
    }
    else {
        word += input.value;
        guessText.textContent = word;
        guessInput.value = word;
        
        e.target.value && input.nextElementSibling.focus();

    }
}));