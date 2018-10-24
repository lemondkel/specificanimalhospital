var markers = [];

$(document).ready(function () {
	$('#magazineContainer').owlCarousel({
		loop: true,
		margin: 10,
		items: 4,
		autoplay: true,
		autoplaySpeed: 500,
		nav: true,
		dotsEach: true
	});

	$('#shopContainer').owlCarousel({
		loop: true,
		margin: 10,
		items: 4,
		nav: true,
		dotsEach: true
	});

	$('.shop-img').on('click', function () {
		var link = $(this).parents('.item').attr('data-link');
		window.open(link, '_blank');
	});

	$('ul.animal-list').on('click', 'li', function () {
		var target = $(this).children('div.animal-layer');
		if (target.hasClass('active')) {
			target.removeClass('active');
			hideMarkers(parseInt($(this).attr('data-type')));
		} else {
			target.addClass('active');
			showMarkers(parseInt($(this).attr('data-type')));
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
	var hospitalList = $('[data-hospital-idx]');
	var hospitals = [];

	var Y_point = position.coords.latitude; // Y 좌표
	var X_point = position.coords.longitude; // X 좌표
	var zoomLevel = 17; // 첫 로딩시 보일 지도의 확대 레벨

	var myLatlng = new google.maps.LatLng(Y_point, X_point);
	var mapOptions = {
		zoom: zoomLevel,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	for (var i = 0; i < hospitalList.length; i++) {
		var title = hospitalList.eq(i).children('[name=title]').val();
		var address = hospitalList.eq(i).children('[name=address]').val();
		var phone = hospitalList.eq(i).children('[name=phone]').val();
		var animals = hospitalList.eq(i).children('[name=animals]').val();
		var latitude = parseFloat(hospitalList.eq(i).children('[name=latitude]').val());
		var longitude = parseFloat(hospitalList.eq(i).children('[name=longitude]').val());
		hospitals[i] = [
			title, latitude, longitude, animals, address, phone
		];
		var newMarker = new google.maps.Marker({
			position: new google.maps.LatLng(hospitals[i][1], hospitals[i][2]),
			map: map,
			title: hospitals[i][0],
			address: hospitals[i][4],
			phone: hospitals[i][5]
		});

		newMarker.category = hospitals[i][3];
		newMarker.setVisible(false);

		var markerMaxWidth = 300; // 마커를 클릭했을때 나타나는 말풍선의 최대 크기

		// 말풍선 내용
		var contentString = '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h3 id="firstHeading" class="firstHeading">' + hospitals[i][0] + '</h3>' +
			'<div id="bodyContent">' +
			'<p>' + hospitals[i][4] + '<br />' +
			'Tel. ' + hospitals[i][5] + '</p>' +
			'</div>' +
			'</div>';


		var infowindow = new google.maps.InfoWindow(
			{
				content: contentString,
				maxWidth: 300
			}
		);

		markers.push(newMarker);

		google.maps.event.addListener(newMarker, 'click', function () {
			infowindow.setContent('<div id="content">' +
				'<div id="siteNotice">' +
				'</div>' +
				'<h3 id="firstHeading" class="firstHeading">' + this.title + '</h3>' +
				'<div id="bodyContent">' +
				'<p>' + this.address + '<br />' +
				'Tel. ' + this.phone + '</p>' +
				'</div>' +
				'</div>');
			infowindow.open(this.map, this);
		});
	}

}
function showMarkers(category) {
	var i;

	for (i = 0; i < markers.length; i++) {
		if (markers[i].category.indexOf(category) > -1)
			markers[i].setVisible(true);
	}
}
function hideMarkers(category) {
	var i;

	for (i = 0; i < markers.length; i++) {
		if (markers[i].category.indexOf(category) > -1) {
			markers[i].setVisible(false);
		}
	}
}