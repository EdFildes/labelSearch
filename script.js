let form = document.getElementById("labelForm");
let data
const discURL = 'https://api.discogs.com'
const discToken = 'sklbvSDBPwQgtJNPMXkMnwnZwyFaSQZMdocUgOCc'
let album
const body = document.querySelector('body');
const para = document.createElement('p')
const image = document.createElement('img')

function getFormData(e){
    
    para.innerHTML = "searching for label..."
    body.appendChild(para)
    e.preventDefault()
    data = document.getElementById("data").value
    
    data.replace(" ", "+")
    console.log(data)
    getLabel(data)

    return false
}

form.addEventListener('submit', getFormData)



async function getLabel(label){
    try{let response = await fetch(`${discURL}/database/search?label=${label}&token=${discToken}`, {
    METHOD: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TestApplication1.0'
    }
    })
    let json = await response.json()
    let pages = json.pagination.pages
    let randPage = Math.floor(pages * Math.random())
    let newResponse = await fetch(`${discURL}/database/search?label=${label}&page=${randPage}&token=${discToken}`, {
    METHOD: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TestApplication1.0'
    }
    })
    json = await newResponse.json()
    let size = json.results.length
    let randVal = Math.floor(size * Math.random())
    album = json.results[randVal]
    image.src = album.cover_image
    body.appendChild(image)

    title = album.title
    para.innerHTML = title
    }
    catch(error){
        para.innerHTML = 'No label found by that name'
    }
}