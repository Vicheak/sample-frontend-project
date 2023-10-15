const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");

const pageDetailLoad = () => {
  const req = new XMLHttpRequest();
  const req1 = new XMLHttpRequest(); 

  req.open("GET", `http://localhost:8080/api/v1/products/${uuid}`);

  req.addEventListener("load", () => {
    if (req.status === 200) {
      const res = JSON.parse(req.responseText);
      
      req1.open("GET", `http://localhost:8080/image/${res.image}`);

      req1.send(); 

      let content = "";

      content += `
        <div class="card">
            <div class="card-body">
                <p class="card-text">Product UUID : ${res.uuid}</p>
                <h5 class="card-title">Product Code : ${res.code}</h5>
                <h5 class="card-subtitle mb-4 text-danger">Product Name : ${res.name}</h5>
                <p class="card-text">Product Description : ${res.description}</p>
                <p class="card-text">Product Image :</p>
                <img src="http://localhost:8080/image/${res.image}" alt="${res.image}" width="300px" height="auto" />
                <p class="card-text">Category Name : ${res.category.name}</p>
                <p class="card-text">Category Description : ${res.category.description}</p>
            </div>
        </div>
    `;

      if (document.getElementById("content") != null)
        document.getElementById("content").innerHTML = content;

      if (document.getElementById("name") != null)
        document.getElementById("name").value = res.name;

      if (document.getElementById("description") != null)
        document.getElementById("description").value = res.description;

      if (document.getElementById("image") != null)
        document.getElementById("image").value = res.image;
    } else {
      console.error("Bad request!");
    }
  });

  req.send();
};

window.addEventListener("load", pageDetailLoad);
