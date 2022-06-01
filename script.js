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
        document.getElementById("container").innerHTML = apiHTML
        
    })

function getApiHTML(obj){
    return `
    <div class="api">
    <div class="api-name"><a class="api-link" href="${obj.Link}">${obj.API} (${obj.Category})</a></div>
    <div class="api-description">${obj.Description}</div>
    <div class="api-auth">Auth: ${obj.Auth}</div>
    <div class="api-https">HTTPS: ${obj.HTTPS}</div>
    </div>
    `
}