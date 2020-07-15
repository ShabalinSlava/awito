document.addEventListener('DOMContentLoaded', function(){
	const dataBase = JSON.parse(localStorage.getItem('awito')) || [];
	let counter = dataBase.length;

	// Переменные
	const modalAdd = document.querySelector('.modal__add')
	const addAd = document.querySelector('.add__ad')
	const modalBtnSubmit = document.querySelector('.modal__btn-submit')
	const modalSubmit = document.querySelector('.modal__submit')
	const catalog = document.querySelector('.catalog')
	const modalItem = document.querySelector('.modal__item')
	const modalBtnWarning = document.querySelector('.modal__btn-warning')
	const modalFileInput = document.querySelector('.modal__file-input')
	const modalFileBtn = document.querySelector('.modal__file-btn')
	const modalImageAdd= document.querySelector('.modal__image-add')
	const textFileBtn = modalFileBtn.textContent;
	const srcModalImage = modalImageAdd.src;
	const modalImageItem = document.querySelector('.modal__image-item')
	const modalHeaderItem = document.querySelector('.modal__header-item')
	const modalStatusItem = document.querySelector('.modal__status-item')
	const modalDescItem = document.querySelector('.modal__description-item')
	const modalCostItem = document.querySelector('.modal__cost-item')
	const searchInput = document.querySelector('.search__input')
	const menuContainer = document.querySelector('.menu__container')

	// Получение элементов формы
	const  elementsModalSubmit = [...modalSubmit.elements]
	.filter(elem => {
		return elem.tagName !== 'BUTTON' && elem.type !== 'submit'
	});

	const infoPhoto = {};

	const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase))

	// Функция проверки валидации
	const checkForm = () => {
		const validForm = elementsModalSubmit.every(elem => elem.value)
		modalBtnSubmit.disabled = !validForm; // Разблокировка кноки
		modalBtnWarning.style.display = validForm ? 'none' : ''
	}

	// Функция закрытия модальных окон
	const closeModal = event => {
		const target = event.target;
		if (target.closest('.modal__close') || 
		target.classList.contains('modal') || 
		event.code === 'Escape') {
			modalAdd.classList.add('hide')
			modalItem.classList.add('hide')
			document.removeEventListener('keydown', closeModal);
			modalSubmit.reset(); 
			modalImageAdd.src = srcModalImage;
			modalFileBtn.textContent = textFileBtn;
			checkForm();
		}
	};

	// Вывод карточек
	const renderCard = (DB = dataBase) => {
		catalog.textContent = '';
		DB.forEach((item) => {
			catalog.insertAdjacentHTML('beforeend', `
			<li class="card" data-id="${item.id}">
				<img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
				<div class="card__description">
					<h3 class="card__header">${item.nameItem}</h3>
					<div class="card__price">${item.costItem} ₽</div>
				</div>
			</li>
			`)
		})
	}

	// Поиск
	searchInput.addEventListener('input', () => {
		const valueSearch = searchInput.value.trim().toLowerCase()
		if (valueSearch.length > 2) {
			const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch) ||
			item.descriptionItem.toLowerCase().includes(valueSearch))
			renderCard(result)
		}
	});

	// Обработчик на кнопку добавления фото
	modalFileInput.addEventListener('change', event => {
		const target = event.target;
		const reader = new FileReader();
		const file = target.files[0];
		infoPhoto.filename = file.name; 
		infoPhoto.size = file.size;
		reader.readAsBinaryString(file);
		reader.addEventListener('load', event => {
			if (infoPhoto.size < 200000) {
				modalFileBtn.textContent = infoPhoto.filename
				infoPhoto.base64 = btoa(event.target.result);
				modalImageAdd.src = `data:image/jpeg;base64, ${infoPhoto.base64}`
			} else {
				modalFileBtn.textContent = 'Размер файла не должен превышать 200кб'
				modalFileInput.value = ''
				checkForm()
			}
			
		})
	});

	// Проверка формы на заполненные поля
	modalSubmit.addEventListener('input', checkForm);

	// Событие нажатия на кноку отправить
	modalSubmit.addEventListener('submit', event => {
		event.preventDefault();
		const  itemObj = {}
		for (const elem of elementsModalSubmit) {
			itemObj[elem.name] = elem.value;
		}
		itemObj.id = counter++
		itemObj.image = infoPhoto.base64;
		dataBase.push(itemObj) // Добавление в базу
		closeModal({target: modalAdd});
		saveDB()
		renderCard()
	});

	// События
	// Открытие модального окна
	addAd.addEventListener('click', () => {
		modalAdd.classList.remove('hide');
		modalBtnSubmit.disabled = true; // Блокировака кноки отправить в модальном окне
		document.addEventListener('keydown', closeModal) 
	});

	// Открываем карточку с товарами
	catalog.addEventListener('click', event => {
		const target = event.target;
		const card = target.closest('.card')
		if (card) {
			const item = dataBase.find(obj => obj.id === +card.dataset.id);
			modalImageItem.src = `data:image/jpeg;base64,${item.image}`
			modalHeaderItem.textContent = item.nameItem
			modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/У';
			modalDescItem.textContent = item.descriptionItem
			modalCostItem.textContent = item.costItem
			modalItem.classList.remove('hide')
			document.addEventListener('keydown', closeModal) 
			}	
		});

		menuContainer.addEventListener('click', event => {
			const target = event.target
			if (target.tagName === 'A') {
				const result = dataBase.filter(item => item.category === target.dataset.category);
				renderCard(result)
			}
		})
	
	modalAdd.addEventListener('click', closeModal); // Закрытие модального окна через функции closeModal
	modalItem.addEventListener('click', closeModal); // Закрытие модального окна через функции closeModal

	renderCard();

});
