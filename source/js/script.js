var navMain = document.querySelector('.main-nav');
var navButtonOpen = document.querySelector('.page-header__button_open');
var navButtonClose = document.querySelector('.page-header__button_close');
var reviewButton = document.querySelector(".review-form__button");
var reviewForm = document.querySelector(".review-form");
var errorForm = document.querySelector(".modal-form_error");
var doneForm = document.querySelector(".modal-form_done");
var closeErrorForm = errorForm.querySelector(".modal-form__button");
var closeDoneForm = doneForm.querySelector(".modal-form__button");
var requiredList = document.querySelectorAll("[required]");
var closeButtonLink;
var requiredItem; 
var userName;
var userSurname;
var userTel;
var userEmail;
var messageContent;
var isStorageSupport = true;
var storageuserName = "";
var storageuserSurname = "";
var storageuserTel = "";
var storageuserEmail = "";
var storagemessageContent = "";
var valName;
var valSurname;
var valTel;
var valEmail;

// открытие/закрытие меню
navMain.classList.remove('main-nav_nojs');

navButtonOpen.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav_closed')) {
    navMain.classList.remove('main-nav_closed');
    navMain.classList.add('main-nav_opened');
  } else {
    navMain.classList.add('main-nav_closed');
    navMain.classList.remove('main-nav_opened');
  }
});

navButtonClose.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav_closed')) {
    navMain.classList.remove('main-nav_closed');
    navMain.classList.add('main-nav_opened');
  } else {
    navMain.classList.add('main-nav_closed');
    navMain.classList.remove('main-nav_opened');
  }
});

//проверка работы хранилища  
try {
  storageuserName = localStorage.getItem("userName");
  storageuserSurname = localStorage.getItem("userSurname");
  storageuserTel = localStorage.getItem("userTel");
  storageuserEmail = localStorage.getItem("userEmail");
  storagemessageContent = localStorage.getItem("messageContent");
} catch (err) {
  isStorageSupport = false;
}

//форма отправки отзыва
if (reviewButton) {
  userName = reviewForm.querySelector("[id=name]");
  userSurname = reviewForm.querySelector("[id=surname]");
  userTel = reviewForm.querySelector("[id=tel]");
  userEmail = reviewForm.querySelector("[id=email]");
  messageContent = reviewForm.querySelector("[id=content]");
  
  //проверка полей формы отправки отзыва
  reviewForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    userName.classList.remove("review-form__input_error");
    userSurname.classList.remove("review-form__input_error");
    userTel.classList.remove("review-form__input_error");
    userEmail.classList.remove("review-form__input_error");
    valName = checkName(userName.value);
    valSurname = checkName(userSurname.value);
    valTel = checkTel(userTel.value);
    valEmail = checkEmail(userEmail.value);
    if (!valName || !valSurname || !valTel || !valEmail || messageContent.value == "") {
      console.log("Заполните ваше имя, фамилию, телефон, обратный электронный адрес и текст отзыва");
      errorForm.classList.remove("modal-show");
      errorForm.offsetWidth = reviewForm.offsetWidth;
      errorForm.classList.add("modal-show");
      if (!valName) {
        userName.classList.add("review-form__input_error");
      }
      if (!valSurname) {
        userSurname.classList.add("review-form__input_error");
      }
      if (!valTel) {
        userTel.classList.add("review-form__input_error");
      }
      if (!valEmail) {
        userEmail.classList.add("review-form__input_error");
      }
      if (messageContent.value == "") {
        messageContent.classList.add("review-form__input_error");
      } 
    } else {
        if (isStorageSupport) {
          localStorage.setItem("userName", userName.value);
          localStorage.setItem("userSurname", userSurname.value);
          localStorage.setItem("userTel", userTel.value);
          localStorage.setItem("userEmail", userEmail.value);
          localStorage.setItem("messageContent", messageContent.value);
        }
        doneForm.classList.remove("modal-show");
        doneForm.offsetWidth = reviewForm.offsetWidth;
        doneForm.classList.add("modal-show");
      }
  });
}

// снятие ошибки при фокусе
userName.onfocus = function() {
  userName.classList.remove("review-form__input_error");
};

userSurname.onfocus = function() {
  userSurname.classList.remove("review-form__input_error");
};

userTel.onfocus = function() {
  userTel.classList.remove("review-form__input_error");
};

userEmail.onfocus = function() {
  userEmail.classList.remove("review-form__input_error");
};

messageContent.onfocus = function() {
  messageContent.classList.remove("review-form__input_error");
};

//закрытие модальных окон по кнопке
closeErrorForm.addEventListener("click", function (evt) {
  if (errorForm.classList.contains("modal-show")) {
    errorForm.classList.remove("modal-show");
    setFocus();
  }
});

closeDoneForm.addEventListener("click", function (evt) {
  if (doneForm.classList.contains("modal-show")) {
    doneForm.classList.remove("modal-show");
  }
});

//закрытие модальных окон по esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (errorForm) {
      if (errorForm.classList.contains("modal-show")) {
        errorForm.classList.remove("modal-show");
        setFocus();
      }
    }
    if (doneForm) {
      if (doneForm.classList.contains("modal-show")) {
        doneForm.classList.remove("modal-show");
      }
    }
  }
});

for (var i = 0; i < requiredList.length; i++) {
  requiredItem = requiredList[i];
  requiredItem.removeAttribute("required");
}

function setFocus() {
  if (!valName) {
    userName.focus();
  } else {
      if (!valSurname) {
        userSurname.focus();
      } else {
          if (!valTel) {
            userTel.focus();
          } else {
              if (!valEmail) {
                userEmail.focus();
              } else {
                  if (messageContent.value == "") {
                    messageContent.focus();
                  }
                }
            }
        }
    }
}

function checkEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(reg.test(email) == false) {
    console.log("Введите корректный e-mail");
    return false;
  }
  return true; 
}

function checkName(text) {
  var letters = /^[A-Za-zА-Яа-я]+$/;
  if(text.match(letters)) {
    return true;
  } else {
      return false;
    }
}

function checkTel(text) {
  var letters = /^[0-9]+$/;
  if(text.match(letters)) {
    return true;
  } else {
      return false;
    }
}