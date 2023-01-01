const http = new XMLHttpRequest()

http.open('GET', 'http://localhost:3000/produtos')
http.send()
http.onload = () => {
    const data = http.response
    console.log(data)
}