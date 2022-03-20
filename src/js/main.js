const burgerBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const navItem = document.querySelectorAll('.nav-item')

const showNav = () => {
	burgerBtn.classList.toggle('is-active')
	nav.classList.toggle('show-nav')
	navItem.forEach(el => {
		console.log(el)
		el.classList.toggle('show-nav')
	})
}

burgerBtn.addEventListener('click', showNav)
