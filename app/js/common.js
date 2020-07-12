document.addEventListener('DOMContentLoaded', function(){
	// Переменные
	const modalAdd = document.querySelector('.modal__add')
	const addAd = document.querySelector('.add__ad')
	const modalBtnSubmit = document.querySelector('.modal__btn-submit')
	const modalSubmit = document.querySelector('.modal__submit')

	// События
	// Открытие модального окна
	addAd.addEventListener('click', () => {
		modalAdd.classList.remove('hide');
		// Блокировака кноки отправить в модальном окне
		modalBtnSubmit.disabled = true;
	});
	// Закрытие модального окна с помощью делегирования
	modalAdd.addEventListener('click', event => {
		const target = event.target;
		if (target.classList.contains('modal__close') || 
			target === modalAdd
			) {
			modalAdd.classList.add('hide')
			// Очищение формы при закрытии и при новом открытии
			modalSubmit.reset();
		}
	});
});
