const paginationLoad = (pageNumber = 1, pageLimit = 5) => {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:8080/api/v1/products/pagination?_page=${pageNumber}&_limit=${pageLimit}`
  );

  req.addEventListener("load", () => {
    if (req.status === 200) {
      const res = JSON.parse(req.responseText);

      const products = res.list;
      const pagination = res.pagination;

      let content = "";
      let paginated = "";

      products.forEach((product) => {
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

      paginated += `
            <li class="page-item"><button class="page-link ${
              pagination.first ? "disabled" : ""
            }" onclick="paginationLoad(${
        pageNumber - 1
      }, ${pageLimit})">Previous</button></li>
        `;

      if (pagination.totalPages >= 3) {
        paginated += `
            <li class="page-item"><button class="page-link" onclick="paginationLoad(1, ${pageLimit})">1</button></li>
            <li class="page-item"><button class="page-link" onclick="paginationLoad(2, ${pageLimit})">2</button></li>
            <li class="page-item"><button class="page-link" onclick="paginationLoad(3, ${pageLimit})">3</button></li>
        `;
      } else {
        for (let i = 0; i < pagination.totalPages; i++) {
          paginated += `
            <li class="page-item"><button class="page-link" onclick="paginationLoad(${
              i + 1
            }, ${pageLimit})">${i + 1}</button></li>
            `;
        }
      }

      paginated += `
            <li class="page-item"><button class="page-link ${
              pagination.last ? "disabled" : ""
            }" onclick="paginationLoad(${
        pageNumber + 1
      }, ${pageLimit})">Next</button></li>
        `;

      if (document.getElementById("content") != null)
        document.getElementById("content").innerHTML = content;

      if (document.getElementById("paginated") != null)
        document.getElementById("paginated").innerHTML = paginated;
    } else {
      console.error("Bad request!");
    }
  });

  req.send();
};

window.addEventListener("load", paginationLoad(1, 8));

const loadView = (url) => {
  window.location.href = url;
};