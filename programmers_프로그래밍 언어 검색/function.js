const $ = (query) => document.querySelector(query);
const $$ = (element) => document.createElement(element);
const beforeList = [];
let searchList = [];
let highlight = 0;
const Base_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

// 데이터 불러오는 함수
function getData(keyword) {
  if (keyword !== "") {
    fetch(`${Base_URL}/languages?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          searchList = data;
          handleRander(data, highlight);
        } else {
          searchList = [];
          handleRander(searchList, 0);
        }
      })
      .catch((error) => console.log(error));
  }
}

// input 변화 감지 및 함수
const inputState = $(".SearchInput__input");
inputState.addEventListener("input", (e) => handleInputChange(e));
function handleInputChange(e) {
  if (e.target.value === " ") inputState.value = "";
  else if (e.target.value === "") {
    highlight = 0;
    SuggestionUl.remove();
    SuggestionDiv.className = "";
  } else getData(e.target.value);
}

// 검색 리스트 렌더링 함수
const SuggestionDiv = $(".Suggestion");
SuggestionDiv.className = "";

let SuggestionUl = $$("ul");
function handleRander(data, highlight) {
  if (data.length > 0) {
    SuggestionDiv.className = "Suggestion";
    SuggestionUl.remove();
    SuggestionUl = $$("ul");
    let cnt = 0;
    for (let i of data) {
      const Suggestionli = $$("li");
      if (highlight === cnt) {
        Suggestionli.className = "Suggestion__item--selected";
      } else {
        Suggestionli.className = "";
      }

      var RegExpStr = new RegExp(inputState.value, "gi");
      let tmpKeyword = i;
      let replaced_str = tmpKeyword.replace(
        RegExpStr,
        `<span class="Suggestion__item--matched">${inputState.value}</span>`
      );

      Suggestionli.innerHTML = replaced_str;
      Suggestionli.addEventListener("click", () => accKeyword(i));
      SuggestionUl.appendChild(Suggestionli);
      cnt++;
    }
    SuggestionDiv.appendChild(SuggestionUl);
  } else {
    SuggestionUl.remove();
    SuggestionDiv.className = "";
  }
}

// 엔터키 및 클릭 감지 함수
function runScript(e) {
  let currentSelected = $(".Suggestion__item--selected");
  if (currentSelected !== null) currentSelected = currentSelected.innerText;
  if (currentSelected !== null && e.keyCode == 13) {
    accKeyword(currentSelected);
    return false; // 추가적인 이벤트 실행을 방지하기 위해 false 리턴
  } else if (currentSelected === null && e.keyCode == 13) {
    e.preventDefault();
    inputState.value = "";
  } else {
    return true;
  }
}

// 최근 검색어에 추가 및 렌더 함수
let accUl = $(".accUl");
function accKeyword(keyword) {
  alert(keyword);
  if (beforeList.length >= 5) {
    beforeList.shift();
    beforeList.push(keyword);

    let firstLi = $(".accUl li");
    accUl.removeChild(firstLi);

    const accli = $$("li");
    accli.innerText = keyword;
    accUl.appendChild(accli);
  } else if (0 < beforeList.length < 5) {
    beforeList.push(keyword);

    const accli = $$("li");
    accli.innerText = keyword;
    accUl.appendChild(accli);
  }
}

// 위 아래키 감지 함수

window.onkeydown = (e) => {
  if (searchList.length > 0 && e.keyCode === 38 && highlight > 0) {
    highlight--;
    handleRander(searchList, highlight);
  } else if (
    searchList.length > 0 &&
    e.keyCode === 40 &&
    highlight < searchList.length - 1
  ) {
    highlight++;
    handleRander(searchList, highlight);
  } else if (
    searchList.length > 0 &&
    e.keyCode === 40 &&
    highlight === searchList.length - 1
  ) {
    highlight = 0;
    handleRander(searchList, highlight);
  } else if (searchList.length > 0 && e.keyCode === 38 && highlight <= 0) {
    highlight = searchList.length - 1;
    handleRander(searchList, highlight);
  }
};

getData();
