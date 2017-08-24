let name = document.querySelector("#name").value;
let content = document.querySelector('#content').value;
let btn = document.querySelector('#btn');
let jsonData = JSON.stringify({ name: name, content: content });
console.log(jsonData);

function doFetch(url) {
    fetch(url, {
        body: jsonData,
        headers: { "Content-Type": "application/json" }
    }).then(function(response) {
        return response.text();
    }).then(function(obj) {
        console.log(obj);
    }).catch(function(error) {
        console.error(error);
    });
};

btn.addEventListener("click", function(e) {
    e.preventDefault();
    doFetch("/event")
});