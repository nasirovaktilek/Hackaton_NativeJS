let createBtn = document.getElementById("createBtn");
let modal = document.getElementById("modal-window");
let closeBtn = document.getElementById("closeBtn");
let inpPhoto = document.getElementById("inpPhoto");
let inpName = document.getElementById("inpName");
let inpEmail = document.getElementById("inpEmail");
let inpKPI = document.getElementById("inpKPI");
let sectionPerson = document.getElementById("sectionPerson");
let addBtn = document.getElementById("addBtn");
let searchValue = "";
let currentPage = 1;
let countPage = 1;
let API = "http://localhost:8000/person";
let logo = document.getElementById("logo-image");

logo.addEventListener("click", () => {
  window.location.href = "https://makers.kg/";
});

createBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

addBtn.addEventListener("click", () => {
  if (
    inpPhoto.value.trim() === "" ||
    inpName.value.trim() === "" ||
    inpEmail.value.trim() === "" ||
    inpKPI.value.trim() === ""
  ) {
    alert("Заполните поле!");
    return;
  }
  let newPerson = {
    photo: inpPhoto.value,
    name: inpName.value,
    email: inpEmail.value,
    kpi: inpKPI.value,
  };
  inpPhoto.value = "";
  inpName.value = "";
  inpEmail.value = "";
  inpKPI.value = "";
  createPerson(newPerson);
  modal.style.display = "none";
  showInfo();
});

function createPerson(person) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(person),
  });
}

function showInfo() {
  fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=3`)
    .then((res) => res.json())
    .then((data) => {
      sectionPerson.innerHTML = "";
      data.forEach((item) => {
        sectionPerson.innerHTML += `<div class="card mt-3" style="width: 17rem;">
        <img src="${item.photo}" class="card-img-top" style="width:270px" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">E-mail: ${item.email}</p>
            <p class="card-text">KPI: ${item.kpi}</p>
            <button class="btn btn-outline-danger btnDelete" id="${item.id}">Удалить</button>
            <button class="btn btn-outline-wwarning btnEdit" id="${item.id}" data-bs-toggle="modal"
            data-bs-target="#exampleModal">Изменить</button>
          </div>
        </div>`;
      });
      sumPage();
    });
}
showInfo();

document.addEventListener("click", (event) => {
  let del_class = [...event.target.classList];
  if (del_class.includes("btnDelete")) {
    let del_id = event.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => showInfo());
  }
});

let inpSearch = document.getElementById("inpSearch");
inpSearch.addEventListener("input", (event) => {
  searchValue = event.target.value;
  showInfo();
});

let editInpPhoto = document.getElementById("editInpPhoto");
let editInpName = document.getElementById("editInpName");
let editInpEmail = document.getElementById("editInpEmail");
let editInpKPI = document.getElementById("editInpKpi");
let editBtnSave = document.getElementById("editBtnSave");

document.addEventListener("click", (event) => {
  let editArr = [...event.target.classList];
  if (editArr.includes("btnEdit")) {
    let id = event.target.id;
    fetch(`${API}/${id}`).then((res) => {
      res.json().then((data) => {
        editInpPhoto.value = data.photo;
        editInpName.value = data.name;
        editInpEmail.value = data.email;
        editInpKPI.value = data.kpi;
        editBtnSave.setAttribute("id", data.id);
      });
    });
  }
});

editBtnSave.addEventListener("click", () => {
  let editedPerson = {
    photo: editInpPhoto.value,
    name: editInpName.value,
    email: editInpEmail.value,
    kpi: editInpKPI.value,
  };
  editPerson(editedPerson, editBtnSave.id);
});

function editPerson(personEdit, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(personEdit),
  }).then(() => showInfo());
}

let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  showInfo();
});

btn1.addEventListener("click", () => {
  currentPage = 1;
  showInfo();
});

btn2.addEventListener("click", () => {
  currentPage = 2;
  showInfo();
});

btn3.addEventListener("click", () => {
  currentPage = 3;
  showInfo();
});

btn4.addEventListener("click", () => {
  currentPage = 4;
  showInfo();
});

btn5.addEventListener("click", () => {
  currentPage = 5;
  showInfo();
});

nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  showInfo();
});

function sumPage() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      countPage = Math.ceil(data.length / 3);
    });
}
