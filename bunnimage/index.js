const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    if(!username){
        alert("No name error.");
        return;
    }
    else{
        const output = document.getElementById("output");
        const imageInput = document.getElementById("image");
        //const payload = new FormData(bunnForm);
        const payload = new FormData();
        payload.append('file', imageInput.files[0]);
 
        const endpoint = "https://serverlessjim.azurewebsites.net/api/bunnimage-upload?code=gV8xsRgZAHIv5CJ0u04qaQUV9OpZTh-aUlfQ_eLgrzWoAzFusQ0FKQ==";
        const options ={
            "method":"POST",
            "body": payload,
            headers:{
                "codename": username,
            }
        }
        try{
            const resp = await fetch(endpoint,options);
            const data = await resp.text();
            console.log(data);
            output.textContent = data;
        }catch(e){
            console.log(e);
        }
        
    }
   
 });