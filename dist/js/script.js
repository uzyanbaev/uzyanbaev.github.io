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
            document.body.className = id;
            document.documentElement.lang = id;

            document.title = data['title'][id];
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = data['description'][id];
            }

            for (let key in data) {
                let element = document.querySelector(`#${key}`);
                if (element) {
                    element.innerHTML = data[key][id];
                }
            }
        })
        .catch(error => console.error('Error:', error));
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
    updateMetaTags(pageId);

    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 300);
}

document.addEventListener("DOMContentLoaded", function() {
    openPage('main', true);
});


function updateMetaTags(pageId) {
    var title, description;
    var language = document.documentElement.lang || "en";

    switch (pageId) {
        case 'main':
            title = language === "ru" ? "Radmir Uzyanbaev | Главная" : "Radmir Uzyanbaev | Home";
            description = language === "ru" ? "Добро пожаловать на мою главную страницу! Здесь собрана информация обо мне, Радмире Узянбаеве. Мои социальные сети и адрес электронной почты — прямо здесь, если что-то понадобится." : "Welcome to my homepage! Information about me, Radmir Uzyanbaev, is collected here. My social media and email address are right here if you need anything.";
            break;
        case 'experience':
            title = language === "ru" ? "Radmir Uzyanbaev | Опыт" : "Radmir Uzyanbaev | Experience";
            description = language === "ru" ? "В разделе Опыт я делюсь информацией об образовании. Здесь вы найдете данные о моих учебных заведениях, пройденных курсах, а также подробности о том, какие навыки я развил в процессе обучения." : "In the Experience section, I share information about education. Here you will find information about my educational institutions, the courses I have completed, as well as details about what skills I have developed in the learning process.";
            break;
        case 'portfolio':
            title = language === "ru" ? "Radmir Uzyanbaev | Проекты" : "Radmir Uzyanbaev | Projects";
            description = language === "ru" ? "В разделе Проекты я демонстрирую свои работы. Здесь вы сможете ознакомиться с каждым проектом, найти ссылки на его просмотр, исходный код, а также увидеть, какие языки программирования были использованы в создании каждого проекта. Приглашаю вас рассмотреть мои работы ближе!" : "In the Projects section, I demonstrate my work. Here you can familiarize yourself with each project, find links to view it, the source code, and also see which programming languages were used in the creation of each project. I invite you to take a closer look at my work!";
            break;
        case 'blog':
            title = language === "ru" ? "Radmir Uzyanbaev | Блог" : "Radmir Uzyanbaev | Blog";
            description = language === "ru" ? "В разделе Блог делюсь своими мыслями и опытом. Читайте, если интересно." : "In the Blog section, I share my thoughts and experiences. Read it if you're interested.";
            break;

        default:
            title = language === "ru" ? "Radmir Uzyanbaev: Портфолио Радмира Узянбаева" : "Radmir Uzyanbaev: Portfolio Radmir Uzyanbaev";
            description = language === "ru" ? "Добро пожаловать на портфолио Радмира Узянбаева! На этом сайте вы сможете ознакомиться с полной информацией о Радмире, включая его образование, навыки и участие в разнообразных проектах." : "Welcome to the portfolio of Radmir Uzyanbaev! On this site you can find full information about Radmir, including his education, skills and participation in various projects.";
            break;
    }

    document.title = title;
    
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = description;
    } else {
        var meta = document.createElement('meta');
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
    }
}