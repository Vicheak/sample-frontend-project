const modalBody = document.getElementById("load-modal-body");
const confirmBtn = document.getElementById("confirmBtn");
const closeBtn = document.getElementById("btnClose");
let productUuid = null; 
let productCode = null;

const pageLoad = () => {
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/api/v1/products");

  req.addEventListener("load", () => {
    if (req.status === 200) {
      const res = JSON.parse(req.responseText);

      let content = "";

      res.forEach((product) => {
        content += `<tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.category.name}</td>
            <td>
              <button class="btn btn-success" onclick="loadView('detail.html?uuid=${product.uuid}')"><i class="fa-solid fa-eye"></i></button>
              <button class="btn btn-warning" onclick="loadView('update.html?uuid=${product.uuid}')"><i class="fa-solid fa-pen-to-square"></i></button>
              <button type="button" class="btn btn-danger" onclick="deleteResource('${product.code}', '${product.uuid}')" data-bs-toggle="modal" data-bs-target="#showModal">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
        </tr>`;
      });

      if(document.getElementById("table-body") != null)
        document.getElementById("table-body").innerHTML = content;
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

const deleteResource = (code, uuid) => {
  modalBody.innerHTML = `Are you sure to delete the product with code ${code}?`;
  productUuid = uuid;
  productCode = code;
};

confirmBtn.addEventListener("click", () => {
  const req = new XMLHttpRequest();
  req.open("DELETE", `http://localhost:8080/api/v1/products/${productUuid}`);

  req.addEventListener("load", function () {
    if (req.status === 200 || req.status === 404) {
      closeBtn.click();
      pageLoad();
    } else {
      console.error("Bad request");
    }
  });

  req.send();
});
