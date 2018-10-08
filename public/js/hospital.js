$(document).ready(function() {
	setAnimalTab(); // 동물 선택 탭을 설정합니다.
	setLocalTab(); // 지역 선택 탭을 설정합니다.
	setSubLocalClickEvent(); // 서브 지역 클릭 이벤트를 설정합니다.

	$('.hospital-area').on('click', function() {
		var hospitalId = parseInt($(this).parent().attr('data-hospital-id'));

		window.location.href = '/hospital/detail/' + hospitalId;
	})
});

var subLocalList = [
	[
		"서울전체",
		"강남구",
		"강동구",
		"강북구",
		"강서구",
		"관악구",
		"광진구",
		"구로구",
		"금천구",
		"노원구",
		"도봉구",
		"동대문구",
		"동작구",
		"마포구",
		"서대문구",
		"서초구",
		"성동구",
		"성북구",
		"송파구",
		"양천구",
		"영등포구",
		"용산구",
		"은평구",
		"종로구",
		"중구",
		"중랑구"
	],
	[
		"경기전체",
		"가평군",
		"고양시 덕양구",
		"고양시 일산동구",
		"고양시 일산서구",
		"과천시",
		"광명시",
		"광주시",
		"구리시",
		"군포시",
		"김포시",
		"남양주시",
		"동두천시",
		"부천시",
		"성남시 분당구",
		"성남시 수정구",
		"성남시 중원구",
		"수원시 권선구",
		"수원시 영통구",
		"수원시 장안구",
		"수원시 팔달구",
		"시흥시",
		"안산시 단원구",
		"안산시 상록구",
		"안성시",
		"안양시 동안구",
		"안양시 만안구",
		"양주시",
		"양편군",
		"여주시",
		"연천군",
		"오산시",
		"용인시 기흥구",
		"용인시 수지구",
		"용신시 처인구",
		"의왕시",
		"의정부시",
		"이천시",
		"파주시",
		"평택시",
		"포천시",
		"하남시",
		"화성시"
	],
	[
		"인천전체",
		"강화군",
		"계양구",
		"남동구",
		"동구",
		"미추홀구",
		"부평구",
		"서구",
		"연수구",
		"옹진군",
		"중구"
	],
	[
		"강원전체",
		"강릉시",
		"고성군",
		"동해시",
		"삼척시",
		"속초시",
		"양구군",
		"양양군",
		"영월군",
		"원주시",
		"인제군",
		"정선군",
		"철원군",
		"춘천시",
		"태백시",
		"평창군",
		"홍천군",
		"화천군",
		"횡성군"
	],
	[
		"대전전체",
		"대덕구",
		"동구",
		"서구",
		"유성구",
		"중구"
	],
	[
		"세종전체",
		"세종시"
	],
	[
		"충남전체",
		"계룡시",
		"공주시",
		"금산군",
		"논산시",
		"당진시",
		"보령시",
		"부여군",
		"서산시",
		"서천군",
		"아산시",
		"예산군",
		"천안시 동남구",
		"천안시 서북구",
		"청양군",
		"태안군",
		"홍성군"
	],
	[
		"충북전체",
		"괴산군",
		"단양군",
		"보은군",
		"영동군",
		"옥천군",
		"음성군",
		"제천시",
		"증평군",
		"진천군",
		"청주시 상당구",
		"청주시 서원구",
		"청주시 청원구",
		"청주시 흥덕구",
		"충주시"
	],
	[
		"부산전체",
		"강서구",
		"금정구",
		"기장군",
		"남구",
		"동구",
		"동래구",
		"부산진구",
		"북구",
		"사상구",
		"사하구",
		"서구",
		"수영구",
		"연제구",
		"영도구",
		"중구",
		"해운대구"
	],
	[
		"울산전체",
		"남구",
		"동구",
		"북구",
		"울주군",
		"중구"
	],
	[
		"경남전체",
		"거제시",
		"거창군",
		"고성군",
		"김해시",
		"남해군",
		"밀양시",
		"사천시",
		"산청군",
		"양산시",
		"의령군",
		"진주시",
		"창녕군",
		"창원시 마산함포구",
		"창원시 마산회원구",
		"창원시 성산구",
		"창원시 의창구",
		"창원시 진해구",
		"통영시",
		"하동군",
		"함안군",
		"함양군",
		"합천군"
	],
	[
		"경북전체",
		"경산시",
		"경주시",
		"고령군",
		"구미시",
		"군위군",
		"김천시",
		"문경시",
		"봉화군",
		"상주시",
		"성주군",
		"안동시",
		"영덕군",
		"영양군",
		"영주시",
		"영천시",
		"예천군",
		"울릉군",
		"울진군",
		"의성군",
		"청도군",
		"청송군",
		"칠곡군",
		"포항시 남구",
		"포항시 북구"
	],
	[
		"대구전체",
		"남구",
		"달서구",
		"달성군",
		"동구",
		"북구",
		"서구",
		"수성구",
		"중구"
	],
	[
		"광주전체",
		"광산구",
		"남구",
		"동구",
		"북구",
		"서구"
	],
	[
		"전남전체",
		"강진군",
		"고흥군",
		"곡성군",
		"광양시",
		"구례군",
		"나주시",
		"담양군",
		"목포시",
		"무안군",
		"보성군",
		"순천시",
		"신안군",
		"여수시",
		"영광군",
		"영암군",
		"완도군",
		"장성군",
		"장흥군",
		"진도군",
		"함평군",
		"해남군",
		"화순군"
	],
	[
		"전북전체",
		"고창군",
		"군산시",
		"김제시",
		"남원시",
		"무주군",
		"부안군",
		"순창군",
		"완주군",
		"익산시",
		"임실군",
		"장수군",
		"전주시 덕진구",
		"전주시 완산구",
		"정읍시",
		"진안군"
	],
	[
		"제주전체",
		"서귀포시",
		"제주시"
	]
];

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