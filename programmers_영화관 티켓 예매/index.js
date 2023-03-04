// "Login" 유효성 검사 구현하기
let isEmail = false;
let isPassword = false;
let passwordLen = 0;
let specialChecked = false;

const EMAIL_RULE =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-z]{2}$/i;
const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!~])[A-Za-z\d@!~]{8,20}$/;

// id 유효성 감지 함수
const emailState = $("#email");
emailState.addEventListener("input", (e) => handleEmailChange(e));

function handleEmailChange(e) {
  if (e.target.value === " ") inputState.value = "";
  else if (e.target.value === "") isEmail = false;
  else {
    let checkCo = e.target.value.slice(-2);
    if (EMAIL_RULE.test(e.target.value) && checkCo === "co") isEmail = true;
    else isEmail = false;
  }
}

// password 유효성 감지 함수
const passwordState = $("#password");
passwordState.addEventListener("input", (e) => handlePasswordChange(e));

function handlePasswordChange(e) {
  if (e.target.value === " ") inputState.value = "";
  isPassword = PASSWORD_RULE.test(e.target.value);
  passwordLen = e.target.value.length;
}

// alert 함수
const validBtn = $("#theaterLoginBtn");
validBtn.addEventListener("click", handleLogin);
function handleLogin(e) {
  if (!isEmail) alert("이메일 형식이 올바르지 않습니다.");
  else if (!isPassword) {
    if (7 < passwordLen && passwordLen < 21)
      alert("비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
    else alert(" 비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.");
  } else if (isPassword && isEmail) alert("로그인 성공!");
  else {
    alert("다시 시도해주세요");
  }
}

// "좌석 예매" 기능 구현하기
let adultNum = 0;
let childNum = 0;
let basicSeeat = [0, 0, 0, 0, 0, 0, 0, 0];
let mussgSeeat = [0, 0, 0, 0, 0, 0, 0, 0];
let specialSeeat = [0, 0, 0, 0, 0, 0, 0, 0];
const adultBtnParent = $("#adultBtn");
const youthBtnParent = $("#youthBtn");

//버튼 초기 상태
btnInit(0, 0);
function btnInit(adult, child) {
  let before_adultfirstchild = adultBtnParent.children[adultNum];
  let before_youthfirstchild = youthBtnParent.children[childNum];
  let adultfirstchild = adultBtnParent.children[adult];
  let youthfirstchild = youthBtnParent.children[child];
  before_adultfirstchild.classList.remove("toggle");
  before_youthfirstchild.classList.remove("toggle");
  adultfirstchild.classList.add("toggle");
  youthfirstchild.classList.add("toggle");
  adultNum = adult;
  childNum = child;
}

// 버튼 클릭 이벤트
for (let i = 1; i <= 8; i++) {
  adultBtnParent.children[i].addEventListener("click", () =>
    handleAdultBtnClick(i)
  );
  youthBtnParent.children[i].addEventListener("click", () =>
    handleYouthBtnClick(i)
  );
}
function handleAdultBtnClick(idx) {
  if (specialChecked && idx + childNum > 3) {
    alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
  } else {
    btnInit(idx, childNum);
    ableCheck();
  }
}
function handleYouthBtnClick(idx) {
  if (specialChecked && idx + adultNum > 3) {
    alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
  } else {
    btnInit(adultNum, idx);
    ableCheck();
  }
}

// 0 보다 클 경우 활성화
const theaterSeat = $("#theaterSeat");
function ableCheck() {
  if (adultNum + childNum > 0) {
    for (let i = 0; i < 39; i++) {
      theaterSeat.children[i].classList.remove("disabled");
      theaterSeat.children[i].id = `seat${i}`;
    }
  } else {
    for (let i = 0; i < 39; i++) {
      theaterSeat.children[i].classList.add("disabled");
    }
  }
}

// 장애인 체크박스
const checkHandicap = $("#checkHandicap");
checkHandicap.addEventListener("click", (e) => specialCheck(e));

function specialCheck() {
  if (adultNum + childNum > 3) {
    specialChecked = false;
    checkHandicap.checked = false;
    alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
  } else {
    specialChecked = checkHandicap.checked;
    checkHandicap.checked = specialChecked;
  }
}

// 좌석 선택 초기화
const reselect = $("#reselect");
reselect.addEventListener("click", () => {
  btnInit(0, 0);
  ableCheck();
});
