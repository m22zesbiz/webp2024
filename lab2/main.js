window.addEventListener('DOMContentLoaded', () => {
    var container = document.querySelector('#container'); 
    var num1 = Math.floor(Math.random() * 3);
    for (var i = 0; i < num1; i++) {
        char = Math.floor(Math.random() * 26) + 97;
        container.innerHTML += String.fromCharCode(char);
    }

    window.addEventListener('keyup', (e) => {
        if (e.key == container.innerHTML.substring(0, 1)){
            container.innerHTML = container.innerHTML.substring(1, container.innerHTML.length); 
        }
        var num2 = Math.floor(Math.random() * 3) + 1;
        for (var i = 0; i < num2; i++) {
            char = Math.floor(Math.random() * 26) + 97;
            container.innerHTML += String.fromCharCode(char);
        }
    })
})
