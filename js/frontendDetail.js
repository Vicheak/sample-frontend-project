const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");

const pageDetailLoad = () => {
  const req = new XMLHttpRequest();

  req.open("GET", `http://localhost:8080/api/v1/products/${uuid}`);

  req.addEventListener("load", () => {
    if (req.status === 200) {
      const res = JSON.parse(req.responseText);

      let content = "";

      content += `
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="http://localhost:8080/image/${res.image}" alt="${res.image}" /></div>
            <div class="col-md-6">
                <div class="small mb-1">CODE : ${res.code}</div>
                <h1 class="display-5 fw-bolder">${res.name}</h1>
                <div class="fs-5 mb-5">
                    <span class="text-decoration-line-through">$45.00</span>
                    <span>$40.00</span>
                </div>
                <p class="lead">${res.description}</p>
                <p class="lead">${res.category.name}</p>
                <p class="lead">${res.category.description}</p>
                <div class="d-flex">
                    <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                    <button class="btn btn-outline-dark flex-shrink-0" type="button">
                        <i class="bi-cart-fill me-1"></i>
                        Add to cart
                </div>
                <div class="d-flex mt-3">
                    <a class="btn btn-outline-danger flex-shrink-0" href="home.html">Back</a>
                </div>
            </div>
        </div>
    `;

      if (document.getElementById("content") != null)
        document.getElementById("content").innerHTML = content;
    } else {
      console.error("Bad request!");
    }
  });

  req.send();
};

window.addEventListener("load", pageDetailLoad);
