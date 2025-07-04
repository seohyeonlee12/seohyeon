// 사용자 목록과 할 일 목록
let users = [{id:'abc'}];
let todoList = [];

// 아이디 중복 확인
function checkDuplicateId() {
  const idInput = document.getElementById("signup-id").value.trim();
  if (idInput === "") {
    alert("아이디를 입력하세요.");
    return;
  }

  const isDuplicate = users.some(user => user.id === idInput);

  if (isDuplicate) {
    alert("이미 사용 중인 아이디입니다.");
  } else {
    alert("사용 가능한 아이디입니다.");
  }
}

// 비밀번호 규칙 검사: 8자 이상 & 숫자 포함
function validatePassword(pw) {
  const pwRule = /^(?=.*[0-9]).{8,}$/;
  return pwRule.test(pw);
}

// 비밀번호 규칙만 따로 검사
function checkPasswordRule() {
  const pwInput = document.getElementById("signup-pw").value.trim();

  if (pwInput === "") {
    alert("비밀번호를 입력하세요.");
    return;
  }

  if (validatePassword(pwInput)) {
    alert("비밀번호 사용 가능");
  } else {
    alert("비밀번호는 8자 이상이며 숫자를 포함해야 합니다.");
  }
}

// 회원가입
function registerUser() {
  const idInput = document.getElementById("signup-id").value.trim();
  const pwInput = document.getElementById("signup-pw").value.trim();

  if (idInput === "" || pwInput === "") {
    alert("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }

  if (users.some(user => user.id === idInput)) {
    alert("이미 사용 중인 아이디입니다.");
    return;
  }

  if (!validatePassword(pwInput)) {
    alert("비밀번호는 8자 이상이며 숫자를 포함해야 합니다.");
    return;
  }

  users.push({ id: idInput, password: pwInput });
  alert("회원가입이 완료되었습니다!");

  // 화면 전환
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("todo-section").style.display = "block";
}

// 할 일 추가
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("할 일을 입력하세요.");
    return;
  }

  todoList.push({ text: todoText, completed: false });
  todoInput.value = "";
  renderTodoList();
}

// 할 일 삭제
function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

// 체크박스 상태 토글
function toggleTodo(index) {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
}

// 할 일 목록 출력
function renderTodoList() {
  const listEl = document.getElementById("todo-list");
  listEl.innerHTML = "";

  todoList.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleTodo(index);

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) {
      span.style.textDecoration = "line-through";
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    listEl.appendChild(li);
  });
}

// 로그아웃
function logout() {
  // To Do List 초기화
  todoList = [];
  renderTodoList();

  // 입력 필드 초기화
  document.getElementById("signup-id").value = "";
  document.getElementById("signup-pw").value = "";
  document.getElementById("todo-input").value = "";

  // 화면 전환
  document.getElementById("signup-section").style.display = "block";
  document.getElementById("todo-section").style.display = "none";
}
