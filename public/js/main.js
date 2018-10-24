$(document).ready(function () {
    $('#magazineContainer').owlCarousel({
        loop:true,
        margin:10,
		items: 4,
        autoplay: true,
        autoplaySpeed : 500,
		nav : true,
        dotsEach: true
    });

    $('#shopContainer').owlCarousel({
        loop:true,
        margin:10,
        items: 4,
        nav :true,
		dotsEach: true
    });

    $('.shop-img').on('click', function () {
		var link = $(this).parents('.item').attr('data-link');
		window.open(link, '_blank');
	});

	$('ul.animal-list').on('click', 'li', function () {
		var target = $(this).children('div.animal-layer');
		if (target.hasClass('active')) {
			target.removeClass('active')
		} else {
			target.addClass('active');
		}
	});

	$('.magazine-area').on('click', '.item', function () {
		var magazineIdx = $(this).attr('data-magazine-idx');
		window.location.href = '/magazine/detail/' + magazineIdx;
	});

	getLocation();
});

function getLocation() {
	navigator.geolocation.getCurrentPosition(initialize, function () {
		alert("위치정보를 수락하고 다시 진행해주세요.");
	}, {
		timeout: 10000,
		enableHighAccuracy: true
	})
}

function initialize(position) {
	var Y_point = position.coords.latitude; // Y 좌표
	var X_point = position.coords.longitude; // X 좌표
	var zoomLevel = 17; // 첫 로딩시 보일 지도의 확대 레벨
	var markerTitle = "중앙 동물병원"; // 현재 위치 마커에 마우스를 올렸을때 나타나는 이름
	var markerMaxWidth = 300; // 마커를 클릭했을때 나타나는 말풍선의 최대 크기

	// 말풍선 내용
	var contentString = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h3 id="firstHeading" class="firstHeading">중앙 동물병원</h3>' +
		'<div id="bodyContent">' +
		'<p>경기도 안양시 만안구 안양6동 510-6<br />' +
		'Tel. 031-443-8875</p>' +
		'</div>' +
		'</div>';

	var myLatlng = new google.maps.LatLng(Y_point, X_point);
	var mapOptions = {
		zoom: zoomLevel,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: markerTitle
	});

	var infowindow = new google.maps.InfoWindow(
		{
			content: contentString,
			maxWidth: markerMaxWidth
		}
	);

	google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, marker);
	});
}