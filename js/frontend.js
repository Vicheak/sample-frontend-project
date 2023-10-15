const pageLoad = () => {
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/api/v1/products");

  req.addEventListener("load", () => {
    if (req.status === 200) {
      const res = JSON.parse(req.responseText);

      let content = "";

      res.forEach((product) => {
        content += `<div class="col mb-5">
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                <!-- Product image-->
                <img class="card-img-top" src="http://localhost:8080/image/${product.image}" alt="${product.image}" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product code-->
                        <h5 class="fw-bolder">${product.code}</h5>
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.name}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$20.00</span>
                        $18.00
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><button class="btn btn-outline-dark mt-auto" onclick="loadView('viewdetail.html?uuid=${product.uuid}')">Add to cart</button></div>
                </div>
            </div>
        </div>`;
      });

      if (document.getElementById("content") != null)
        document.getElementById("content").innerHTML = content;
    } else {
      console.error("Bad request!");
    }
  });

  req.send();
};

window.addEventListener("load", pageLoad);

const loadView = (url) => {
  window.location.href = url;
};