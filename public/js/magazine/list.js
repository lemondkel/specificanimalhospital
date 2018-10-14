$(document).ready(function() {
	setAnimalTab(); // 동물 선택 탭을 설정합니다.
	setLocalTab(); // 지역 선택 탭을 설정합니다.
	setSubLocalClickEvent(); // 서브 지역 클릭 이벤트를 설정합니다.

	$('.hospital-area').on('click', function() {
		var hospitalId = parseInt($(this).parent().attr('data-hospital-id'));

		window.location.href = '/hospital/detail/' + hospitalId;
	})
});

function setSubLocalClickEvent() {
	document.querySelector('.sub-local-list').addEventListener('click', function (e) {
		console.log(e.target);
		if (e.target && e.target.nodeName == 'LI') {
			var alreadyActive = document.querySelector('ul.sub-local-list li.active');
			if (alreadyActive !== null) {
				// 기존 탭이 존재할 경우
				if (alreadyActive.classList)
					alreadyActive.classList.remove('active');
				else
					alreadyActive.className = alreadyActive.className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

			console.log(this.getAttribute("data-type")); // 동물 유형
			if (e.target.classList)
				e.target.classList.add('active');
			else
				e.target.className += ' ' + 'active';
		}
	});
}

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

			console.log(this.getAttribute("data-type")); // 동물 유형
			if (this.classList)
				this.classList.add('active');
			else
				this.className += ' ' + 'active';
		});
	}
}

// 검색 이벤트
function search() {
	var animalType = parseInt(document.querySelector('.animal-list li.active').getAttribute('data-type'));
	var localType = parseInt(document.querySelector('.local-list li.active').getAttribute('data-type'));
	var subLocalText = document.querySelector('.sub-local-list li.active').innerText;

	console.log(animalType + "번 동물");
	console.log(localType + "번 지역");
	console.log(subLocalText + "번 서브지역");
}

/**
 * 지역 선택을 하면 해당 탭을 활성화시키고 기존 탭을 비활성화 시킵니다.
 */
function setLocalTab() {
	var localList = document.querySelectorAll('ul.local-list li');
	for (var i = 0; i < localList.length; i++) {
		localList[i].addEventListener('click', function () {

			var alreadyActive = document.querySelector('ul.local-list li.active');
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
			console.log(this.getAttribute("data-type")); // 지역 유형

			var subLocalUl = document.getElementById('subLocalList');
			var localType = parseInt(this.getAttribute("data-type"));
			if (localType === -1) {
				// 전체 지역을 골랐을 경우
				subLocalUl.style.display = "none";
			} else {
				// 다른 지역을 골랐을 경우
				subLocalUl.style.display = "inline-block";
				console.log(subLocalList[localType]);

				subLocalUl.innerHTML = null;
				for (var i = 0; i < subLocalList[localType].length; i++) {
					var html = '<li>';
					html += subLocalList[localType][i];
					html += '</li>';

					subLocalUl.innerHTML += html;
				}
			}
		});
	}
}