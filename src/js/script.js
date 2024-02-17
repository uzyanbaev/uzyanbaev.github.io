const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuLinks = document.querySelectorAll('.menu__link a, .menu__link button');

hamburger.addEventListener('click', toggleMenu);
closeElem.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

function toggleMenu() {
  menu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

function copyEmail() {
    var email = document.querySelector('.main__email-text a').textContent;
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = email;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    var copyMessage = document.getElementById("copy-message");
    copyMessage.textContent = "email copied";
    setTimeout(function() { copyMessage.textContent = ""; }, 1500);
}

function changeLanguage(id) {
    fetch('../data/translation.json')
        .then(response => response.json())
        .then(data => {
            for (let key in data) {
                let element = document.querySelector(`#${key}`);
                if (element) {
                    element.innerHTML = data[key][id];
                }
            }

            document.body.className = id;
            document.documentElement.lang = id;
        })
        .catch(error => console.error('Error:', error));
}

function resetLanguage() {
    location.reload();
}

function openPage(pageId, initial = false) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("page");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(pageId).classList.add("active");
    if (initial) {
        for (i = 0; i < tablinks.length; i++) {
            if (tablinks[i].getAttribute('onclick').includes("'" + pageId + "'")) {
                tablinks[i].classList.add("active");
                break;
            }
        }
    }

    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 300);
}

document.addEventListener("DOMContentLoaded", function() {
    openPage('main', true);
});