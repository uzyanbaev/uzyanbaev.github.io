const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.experience__scale-counter'),
	lines = document.querySelectorAll('.experience__scale-line span');
counters.forEach( (item, i) => {
	lines[i].style.width = item.innerHTML;
});


function showTab(tabIndex) {
	var contents = document.querySelectorAll('.content');
	for (var i = 0; i < contents.length; i++) {
		contents[i].style.display = 'none';
	}

	var tabs = document.querySelectorAll('.tab');
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove('active');
	}

	document.getElementById('content' + tabIndex).style.display = 'block';
	document.getElementById('tab' + tabIndex).classList.add('active');
}

function hideTab(tabIndex) {
	document.getElementById('content' + tabIndex).style.display = 'none';
	document.getElementById('tab' + tabIndex).classList.remove('active');
}