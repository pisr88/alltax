const burgerBtn = document.querySelector('.hamburger')
const nav = document.querySelector('.nav__list')
const navItem = document.querySelectorAll('.nav__item')
const navLink = document.querySelectorAll('.nav__item-link')
const footerYear = document.querySelector('.footer__year')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const errorText = document.querySelector('.error-text')

let map

const showNav = () => {
	burgerBtn.classList.toggle('is-active')
	nav.classList.toggle('show-nav')
	navItem.forEach(el => {
		el.classList.toggle('show-nav')
	})

	if (nav.classList.contains('active')) {
		navItem.forEach(el => {
			el.classList.toggle('hide-nav')
		})
		nav.classList.toggle('hide-nav')
	}
	nav.classList.add('active')
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
		this.textPosition = ['Prezes', 'Główna Księgowa', 'Główna Księgowa']

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
			this.name.textContent = this.textSlide[imageArr.length - 1]
			this.position.textContent = this.textPosition[imageArr.length - 1]

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
if (document.querySelector('[data-slider]')) {
	slider.createSlider()
  
navLink.forEach(el => {
    el.addEventListener('click', showNav)
})
}

//FOOTER

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
	console.log('wczytaj sie')
}

handleCurrentYear()

// Pricelist
// Pricelist - API form CMS

async function getOffers() {
	await fetch('https://api-eu-central-1.graphcms.com/v2/cl1qea3851j6901z76wz6foyx/master', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			query: `
                    query {
                    offers {
                        name
                        scope
                        conditions
						price
                    }
                    }
                `,
		}),
	})
		.then(res => {
			if (!res.ok) return Promise.reject(response)
			return res.json()
		})
		.then(res => {
			arr = res.data.offers
			let htmlBox = ''
			arr.forEach(el => {
				let newScope = el.scope.split('\n')
				let newConditions = el.conditions.split('\n')
				newScope = newScope.map(el => `<li class="pricelist__item-list-item">${el}</li>`)
				newConditions = newConditions.map(el => `<li class="pricelist__item-list-item">${el}</li>`)
				let htmlEl = `<div class="pricelist__item-body">
				<h3 class="pricelist__item-title">${el.name}</h3>
				<p class="pricelist__item-price">${el.price}</p>
				<p class="pricelist__item-scope">Zakres</p>
				<ul class="pricelist__item-list">${newScope.join().replaceAll(',', '')}</ul> 
				<p class="pricelist__item-conditions">Warunki</p>
					<ul class="pricelist__item-list">${newConditions.join().replaceAll(',', '')}</ul>
				</div>`
				htmlBox += htmlEl
			})
			let container = document.querySelector('.pricelist__list')
			container.innerHTML = htmlBox
		})
}
if (document.querySelector('[data-pricelist]')) {
	getOffers()
}

//CONTACT

const showError = (input, msg) =>{

  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector('.error-text')

  formBox.classList.add('error')
  errorMsg.textContent = msg

}

const clearError = input =>{

  const formBox = input.parentElement;
  formBox.classList.remove('error')

}

const checkForm = input =>{

  input.forEach(el =>{
    if(el.value === ''){
      showError(el)
    }else{
      clearError(el)
    }
  })

}

const checkLength = (input,min) =>{

  if(input.value.length < min){
    showError(input,'Podaj dłuższe imię')
  }
}

const checkEmail = email => {
 
  const re  =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if(re.test(email.value)){
    clearError(email)
  }else{
    showError(email,'E-mail jest niepoprawny')
  }
}

const checkErrors = () => {

  const allInputs = document.querySelectorAll('.contact__box');
  let errorCount = 0;

  allInputs.forEach(el => {
    if(el.classList.contains('error')){
      errorCount++;
    }
  })

}

if(document.querySelector(['.contact__form'])){
sendBtn.addEventListener('click', e =>{
  
    
    e.preventDefault()
    checkForm([username,email])
    checkLength(username,3)
    checkEmail(email)
    checkErrors()

  })
}


  




//MAP

async function initMap() {
	const myLatLng = { 
		lat: 50.242978496574814,
		lng: 18.842479792595157,
	}

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 15,
		zoomControl: true,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: true,
		rotateControl: true,
		fullscreenControl: true,
	})

	const marker = new google.maps.Marker({
		position: myLatLng,
		map,
		animation: google.maps.Animation.DROP,
		title: 'AllTax',
	})

	marker.addListener('click', () => {
		infowindow.open(map, marker)
	})
	const contentString =
		'<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h2 id="firstHeading" class="firstHeading">Alltax</h2>' +
		'<div id="bodyContent">' +
		'<p>ul. Kłodnicka 97/301</p>' +
		'<p>41-706 Ruda Śląska<br>Polska</p>' +
		'<a href=https://www.google.com/maps/place/Biuro+Rachunkowe+Alltax/@50.2426541,18.8426967,18.12z/data=!4m5!3m4!1s0x0:0x3dbd92a7198b7ace!8m2!3d50.2426217!4d18.8427802>Zobacz w Mapach Google</a> ' +
		'</div>' +
		'</div>'
	const infowindow = new google.maps.InfoWindow({
		content: contentString,
	})
}


if (document.querySelector('[data-contact]')){
	const footerContact = document.querySelector('.footer__contact')
	footerContact.style.display = 'none'
}