apiHTML = ""

async function getApis(){
    const response = await fetch(`https://api.publicapis.org/entries`)
    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }
    let data = await response.json()
    console.log(data)
    return data
}

getApis().then(apis =>
    {
        apiHTML = apis.entries.map(getApiHTML).join('')
        document.getElementById("grid-container").innerHTML = apiHTML
        
    })

function getApiHTML(obj){
    return `
    <div class="api" id="api">
    <div class="api-name" id="api-name"><a class="api-link" href="${obj.Link}">${obj.API} (${obj.Category})</a></div>
    <div class="api-description" id="api-description">${obj.Description}</div>
    <div class="api-auth" id="api-auth">Auth: ${obj.Auth}</div>
    <div class="api-https" id="api-https">HTTPS: ${obj.HTTPS}</div>
    </div>
    `
}

// event listener on input field
document.getElementById("searchInput").addEventListener("keyup", function(){

    // grabs the event off the eventlistner - function() returns event - function(event)
    let searchQuery = event.target.value.toLowerCase();
    console.log("searchQuery", searchQuery);

    let allAPIsDOM = document.getElementsByClassName("api")
    
    for(let i=0; i<allAPIsDOM.length; i++){
        const currentAPI = allAPIsDOM[i].textContent.toLowerCase();
        console.log(currentAPI)
        if(currentAPI.includes(searchQuery)){
            console.log("Match!")
            allAPIsDOM[i].style.display ="grid"
        }
        else{
            console.log("No match")
            allAPIsDOM[i].style.display ="none"
        }
    }
})
