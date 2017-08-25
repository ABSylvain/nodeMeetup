let title = document.querySelector("#title");
let content = document.querySelector('#content');
let btn = document.querySelector('#btn');
let art = document.querySelector('#art');

btn.addEventListener("click", function(e) {
    let jsonData = JSON.stringify({ title: title.value, content: content.value });
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
    name.value = "";
    content.value = "";
    document.querySelector("#formcont").style.display = "none";

});

function aff(obj) {
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let btn = document.createElement('button');
    let div = document.createElement('div');
    let hr = document.createElement('hr');

    article.className = "container margb";
    div.className = "row";
    h2.className = "col-11";
    btn.className = "col-1 btn btn-outline-danger btn-sm";
    hr.className = "col-4 text-center";

    h2.textContent = obj.name;
    p.textContent = obj.content;
    btn.textContent = "X";

    btn.addEventListener("click", function() {
        article.remove();
    })

    div.appendChild(h2);
    div.appendChild(btn);
    article.appendChild(div);
    article.appendChild(hr);
    article.appendChild(p);
    art.appendChild(article);
}

document.querySelector("#newevent").addEventListener("click", function(e) {
    e.preventDefault();
    let form = document.querySelector("#eventForm");
    document.querySelector("#formcont").style.display = "flex";
    let overForm = false;
    form.addEventListener("mouseover", function() {
        overForm = true;
    });

    form.addEventListener("mousemove", function() {
        overForm = true;
    });

    form.addEventListener("mouseout", function() {
        overForm = false;
    });
    document.querySelector("#formcont").addEventListener("click", function() {
        if (overForm === false) {
            document.querySelector("#formcont").style.display = "none";
            name.value = "";
            content.value = "";
        }
    });
});