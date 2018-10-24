$(document).ready(function () {
	setAnimalTab(); // 동물 선택 탭을 설정합니다.

	$('.hospital-area').on('click', function () {
		var hospitalId = parseInt($(this).parent().attr('data-hospital-id'));

		window.location.href = '/hospital/detail/' + hospitalId;
	});

	var hospitalItem = $('.hospital-item');
	hospitalItem.on('click', '.hospital-area', function () {
		var magazineIdx = $(this).parents('.hospital-item').attr('data-magazine-idx');
		window.location.href = '/magazine/detail/' + magazineIdx;
	});

	hospitalItem.on('click', '.scrap-button', function () {
		var magazineIdx = $(this).parents('.hospital-item').attr('data-magazine-idx');
		$.ajax({
			url : '/magazine/process/scrap',
			data : {
				magazine_idx : magazineIdx
			},
			method : 'POST',
			success : function (data) {
				console.log(data);
				alert(data.desc);
				if (data.result) {

				} else {
					if(data.code !== undefined) {
						switch (data.code) {
							case 600:
								window.location.href = '/user/login';
								break;
						}
					}
				}
			}
		})
	});
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

			// console.log(this.getAttribute("data-type")); // 동물 유형
			if (this.classList)
				this.classList.add('active');
			else
				this.className += ' ' + 'active';
		});
	}
}

// 검색 이벤트
function search() {
	var type = parseInt(document.querySelector('.animal-list li.active').getAttribute("data-type"));

	window.location.href = '/magazine/list?type=' + type;
}