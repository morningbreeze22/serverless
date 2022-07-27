const button = document.getElementById("button1");

button.addEventListener("click",async function(event){
    const cat_name1 = document.getElementById("name1").value;
    const cat_name2 = document.getElementById("name2").value;
    const cat_name3 = document.getElementById("name3").value;
    const cat_name4 = document.getElementById("name4").value;
    

    const azure_url = "https://serverlessjim.azurewebsites.net/api/twocatz?code=hpLFWr3uhM48YcxSsyPEIvlFEad1zZP_S19SXXsOmQmBAzFuc2NOqA==";

    const fetch_url = `${azure_url}&name1=${cat_name1}&name2=${cat_name2}&name3=${cat_name3}&name4=${cat_name4}`;

    const resp = await fetch(fetch_url,{
        method : "GET"
    });

    const data = await resp.json();

    console.log(data);

    document.getElementById("image1").src = "data:image/png;base64,"+data.cat1;
    document.getElementById("image2").src = "data:image/png;base64,"+data.cat2;
    document.getElementById("image3").src = "data:image/png;base64,"+data.cat3;
    document.getElementById("image4").src = "data:image/png;base64,"+data.cat4;
});