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

document.addEventListener('DOMContentLoaded', function () {
	const modalTriggers = document.querySelectorAll('.modal-trigger');
	const modals = document.querySelectorAll('.modal');
	const overlay = document.querySelector('.modal__overlay');
  
	modalTriggers.forEach(trigger => {
	  trigger.addEventListener('click', () => {
		const targetModal = document.getElementById(trigger.dataset.modalTarget);
		openModal(targetModal);
	  });
	});
  
	modals.forEach(modal => {
	  modal.addEventListener('click', (e) => {
		if (e.target === overlay || e.target.dataset.modalClose) {
		  closeModal(modal);
		}
	  });
	});
  
	function openModal(modal) {
	  modal.style.display = 'flex';
	}
  
	function closeModal(modal) {
	  modal.querySelector('.modal__content').classList.add('fade-out');
	  setTimeout(() => {
		modal.style.display = 'none';
		modal.querySelector('.modal__content').classList.remove('fade-out');
	  }, 300);
	}
});

function copyEmail() {
    var email = document.querySelector('.promo__email-text a').textContent;
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
                    element.textContent = data[key][id];
                }
            }

            document.body.className = id;
        })
        .catch(error => console.error('Error:', error));
}

function resetLanguage() {
    location.reload();
}