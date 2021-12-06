function download(archivo, fileName){
    let url = window.URL.createObjectURL(archivo)
    let fileLink = document.createElement('a')
    fileLink.href = url
    fileLink.setAttribute('download', fileName)
    document.body.appendChild(fileLink);
    fileLink.click()
    fileLink.remove()
}

module.exports = {
    download
}