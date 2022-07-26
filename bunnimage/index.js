const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    if(!username){
        alert("No name error.");
    }
    else{
        var re = /(|\.jpeg|\.png)$/i;
        if (!re.exec(username)) {
            alert("File extension not supported!");
        }
        else{
        const output = document.getElementById("output");
        output.textContent = "Thanks!";
        }
    }



 });