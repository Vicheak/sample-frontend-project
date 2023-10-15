const pageLoad = () => {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/api/v1/categories/origin');
    
    req.addEventListener('load', () => {
        if (req.status === 200) {
            const res = JSON.parse(req.responseText);

            let content = "<option selected>Open this select menu</option>";
    
            res.forEach(category => {
                content += `<option value="${category.id}">${category.name}</option>`;
            });
    
            document.getElementById("category").innerHTML = content;
        } else {
            console.error('Bad request!');
        }
    });
    
    req.send();
}

window.addEventListener('load', pageLoad);

const save = () => {
    const newProduct = {
        name: document.getElementById("name").value, 
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        categoryId: document.getElementById("category").value
    };

    const req = new XMLHttpRequest();
    req.open('POST', "http://localhost:8080/api/v1/products");

    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function () {
        if (req.status === 201 || req.status === 400) {
            const res = JSON.parse(req.responseText);

            if("message" in res){
                document.getElementById("message").innerHTML = res.message;
            }else{
                document.getElementById("message").innerHTML = "Please choose product category!";
            }
        } else {
            console.error("Bad request");
        }

        if (req.status === 201){
            document.getElementById("name").value = "";
            document.getElementById("description").value = ""; 
            document.getElementById("image").value = "";
        }
    });

    req.send(JSON.stringify(newProduct));
}

const update = () => {
    const updatedProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        categoryId: document.getElementById("category").value
    };

    const req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:8080/api/v1/products/${uuid}`);

    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function () {
        if (req.status === 200 || req.status === 400 || req.status === 404) {
            const res = JSON.parse(req.responseText);

            if("message" in res){
                document.getElementById("message").innerHTML = res.message;
            }else{
                document.getElementById("message").innerHTML = "Please choose product category!";
            }
        } else {
            console.error("Bad request");
        }
    });

    req.send(JSON.stringify(updatedProduct));
}