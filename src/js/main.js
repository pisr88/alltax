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

//SLIDER
const imageArr = ['./dist/img/user1.jpg', './dist/img/user2.jpg', './dist/img/user3.jpg']
class Slider {
	constructor(images) {
		this.images = images
		this.slider = null
		this.btnPrev = null
		this.btnNext = null
		this.img = null
		this.name = null
		this.position = null
		this.actualImg = 0
		this.textSlide = ['Jank Kowalski', 'Anna Nowak', 'Anna Ptak']
		this.textPosition = ['Prezes', 'Członek Zarządu', 'Członek Zarządu']

		this.UIelements = {
			btnPrev: '[data-btn-prev]',
			btnNext: '[data-btn-next]',
			slider: '[data-slider]',
		}
	}

	createSlider() {
		this.slider = document.querySelector(this.UIelements.slider)
		this.btnPrev = document.querySelector(this.UIelements.btnPrev)
		this.btnNext = document.querySelector(this.UIelements.btnNext)

		this.img = document.createElement('img')
		this.img.setAttribute('src', this.images[this.actualImg])
		this.img.classList.add('slider__img')
		this.slider.append(this.img)

		this.name = document.createElement('p')
		this.name.textContent = this.textSlide[this.actualImg]
		this.name.classList.add('slider__name')

		this.slider.append(this.name)

		this.position = document.createElement('p')
		this.position.textContent = this.textPosition[this.actualImg]
		this.position.classList.add('slider__position')
		this.slider.append(this.position)

		this.addLisener()
	}

	changeSlider(index) {
		if (index < 0) {
			this.img.setAttribute('src', this.images[imageArr.length - 1])
			this.img.setAttribute('alt', this.textSlide[imageArr.length - 1])
			this.name.textContent = this.textSlide[this.actualImg]
			this.position.textContent = this.textPosition[this.actualImg]

			this.actualImg = imageArr.length - 1
		}
		if (index > imageArr.length - 1) {
			this.img.setAttribute('src', this.images[0])
			this.img.setAttribute('alt', this.textSlide[0])
			this.name.textContent = this.textSlide[0]
			this.position.textContent = this.textPosition[0]

			this.actualImg = 0
		}
		if (index >= 0 && index < imageArr.length) {
			this.img.setAttribute('src', this.images[index])
			this.img.setAttribute('alt', this.textSlide[index])
			this.name.textContent = this.textSlide[index]
			this.position.textContent = this.textPosition[index]

			this.actualImg = index
		}
	}

	addLisener() {
		this.btnPrev.addEventListener('click', () => {
			this.img.animate([{ opacity: 0 }], { duration: 300, fill: 'forwards' })
			setTimeout(() => {
				this.changeSlider(this.actualImg - 1)
			}, 300)
			this.img.animate([{ opacity: 1 }], { delay: 300, duration: 1000, fill: 'forwards' })
		})
		this.btnNext.addEventListener('click', () => {
			this.img.animate([{ opacity: 0 }], { duration: 300, fill: 'forwards' })
			setTimeout(() => {
				this.changeSlider(this.actualImg + 1)
			}, 300)
			this.img.animate([{ opacity: 1 }], { delay: 300, duration: 1000, fill: 'forwards' })
		})
	}
}

const slider = new Slider(imageArr)
slider.createSlider()
