const burgerBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav__list')
const navItem = document.querySelectorAll('.nav__item')

const showNav = () => {
	burgerBtn.classList.toggle('is-active')
	nav.classList.toggle('show-nav')
	navItem.forEach(el => {
		el.classList.toggle('show-nav')
	})
}

burgerBtn.addEventListener('click', showNav)
