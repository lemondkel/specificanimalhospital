$(document).ready(function () {
	setAnimalTab(); // 동물 선택 탭을 설정합니다.

	$('.hospital-item').on('click', '.img', function () {
		var link = $(this).parents('.hospital-item').attr('data-link');
		window.open(link, '_blank');
	})
});

/**
 * 동물 선택을 하면 해당 탭을 활성화시키고 기존 탭을 비활성화 시킵니다.
 */
function setAnimalTab() {
	var animalList = document.querySelectorAll('ul.animal-list li');
	for (var i = 0; i < animalList.length; i++) {
		animalList[i].addEventListener('click', function () {

			var alreadyActive = document.querySelector('ul.animal-list li.active');
			if (alreadyActive !== null) {
				// 기존 탭이 존재할 경우
				if (alreadyActive.classList)
					alreadyActive.classList.remove('active');
				else
					alreadyActive.className = alreadyActive.className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

			if (this.classList)
				this.classList.add('active');
			else
				this.className += ' ' + 'active';
		});
	}
}

/**
 * 검색 이벤트
 * @since 2018-10-21
 */
function search() {
	var animalName = document.querySelector('.animal-list li.active').innerText;

	$('#searchName').text(animalName);
}