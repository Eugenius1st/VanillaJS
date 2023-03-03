const $ = (query) => {
  return document.getElementById(query);
};

const $$ = (query) => {
  return document.createElement(query);
};

let table = $("tableId");
let tBody = $$("tbody");
let appDiv = document.querySelector(".App");
let pageBtn = $$("div");
pageBtn.className = "area";
const Data = [];
let beforeIndex = 1;
let initalIndex = 1;
let size = 5;

// 데이터 불러오는 함수
function getData() {
  fetch("./src/data.json")
    .then((response) => response.json())
    .then((data) => {
      Data.push(...data);
      showData(initalIndex);
    })
    .then(() => {
      initBtn(); // 버튼 초기화
      btnStyle(1);
    })
    .catch((error) => console.log(error));
}

// 데이터 보여주는 함수
function showData(index) {
  tBody = $$("tbody");
  if (Data.length !== 0) {
    for (var i = (index - 1) * size; i < (index - 1) * size + size; i++) {
      const tr = $$("tr");
      const tmpData = Data[i];
      for (j in Data[i]) {
        const td = $$("td");
        td.innerHTML = tmpData[j];
        if ((i % size) % 2 === 1) {
          td.style.backgroundColor = "#d3d3d3";
        }
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    }
    table.appendChild(tBody);
  }
}

// 데이터 초기화
function reset() {
  tBody.remove();
}

// 버튼 초기화
function initBtn() {
  pageBtn = $$("div");
  pageBtn.className = "area";
  pageBtn.id = "pagination";

  let btnLen = Math.floor(Data.length / size);
  let btnRemain = 0;
  if (Data.length % size >= 1) btnRemain = 1;
  const beforeBtn = $$("button");
  beforeBtn.addEventListener("click", () => handleClick(1));
  beforeBtn.className = "arrow";
  beforeBtn.innerHTML = "<<";
  pageBtn.appendChild(beforeBtn);
  for (let i = 0; i < btnLen + btnRemain; i++) {
    const btn = $$("button");
    btn.addEventListener("click", () => handleClick(i + 1));
    btn.id = `page${i + 1}`;
    btn.innerHTML = i + 1;
    pageBtn.appendChild(btn);
  }
  const afterBtn = $$("button");
  afterBtn.addEventListener("click", () => handleClick(btnLen + btnRemain));
  afterBtn.className = "arrow";
  afterBtn.innerHTML = ">>";
  // div 에 추가 한 뒤에 app에 추가
  pageBtn.appendChild(afterBtn);
  appDiv.appendChild(pageBtn);
}

// 버튼 스타일 제어
function btnStyle(index) {
  const currentId = $(`page${index}`);
  const beforeId = $(`page${beforeIndex}`);
  beforeIndex = index;
  beforeId.style.color = "black";
  currentId.style.color = "red";
}

// 페이지네이션 제어
function handleClick(index) {
  reset();
  btnStyle(index);
  showData(index);
}

// 드롭다운 이벤트 발생 감시
const dropdownEl = document.querySelector("#selector");
dropdownEl.addEventListener("change", handleChange);

// 드롭다운 제어
function handleChange(event) {
  const value = dropdownEl.value; // 값 가져오기
  size = Number(value);
  reset();
  pageBtn.remove();
  showData(beforeIndex);
  initBtn();
  btnStyle(1);
}

function init() {
  getData();
}

init();
