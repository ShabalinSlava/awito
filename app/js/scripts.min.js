document.addEventListener('DOMContentLoaded', function(){
	// Переменные
	const modalAdd = document.querySelector('.modal__add')
	const addAd = document.querySelector('.add__ad')
	const modalBtnSubmit = document.querySelector('.modal__btn-submit')
	const modalSubmit = document.querySelector('.modal__submit')
	const catalog = document.querySelector('.catalog')
	const modalItem = document.querySelector('.modal__item')

	// Функция закрытия модальных окон
	const closeModal = function(event) {
		const target = event.target;
		if (target.classList.contains('modal__close') || target === this) {
			this.classList.add('hide')
			if (this === modalAdd) {
				modalSubmit.reset(); // Очищение формы при закрытии и при новом открытии	
			}	
		}
	};

	// Функция закрытия модального окна через ESC
	const closeModalEsc = function(event) {
		if (event.code === 'Escape') {
			modalAdd.classList.add('hide');
			modalItem.classList.add('hide');
			document.removeEventListener('keydown', closeModalEsc) // Событие удаляется когда закрываются модальные окна
		}
	}

	// События
	// Открытие модального окна
	addAd.addEventListener('click', () => {
		modalAdd.classList.remove('hide');
		modalBtnSubmit.disabled = true; // Блокировака кноки отправить в модальном окне
		document.addEventListener('keydown', closeModalEsc) // Событие закрытия модальных окон через ESC
	});
	
	modalAdd.addEventListener('click', closeModal); // Закрытие модального окна через функции closeModal
	modalItem.addEventListener('click', closeModal); // Закрытие модального окна через функции closeModal
	// Открываем карточку с товарами
	catalog.addEventListener('click', event => {
		const target = event.target;
		if (target.closest('.card')) {
			modalItem.classList.remove('hide')
			document.addEventListener('keydown', closeModalEsc) // Событие закрытия модальных окон через ESC
		}	
	});
});
