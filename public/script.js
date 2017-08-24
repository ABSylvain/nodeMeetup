let name = document.querySelector("#name");
let content = document.querySelector('#content');
let btn = document.querySelector('#btn');
let art = document.querySelector('#art');

btn.addEventListener("click", function(e) {
    let jsonData = JSON.stringify({ name: name.value, content: content.value });
    e.preventDefault();
    fetch("/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData
    }).then(function(response) {
        return response.json();
    }).then(function(obj) {
        aff(obj);
    }).catch(function(error) {
        console.error(error);
    });
});

function aff(obj) {
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let btn = document.createElement('button');

    h2.textContent = obj.name;
    p.textContent = obj.content;
    btn.textContent = "Delete";

    h2.appendChild(article);
    p.appendChild(article);
    btn.appendChild(article);
    article.appendChild(art);
}