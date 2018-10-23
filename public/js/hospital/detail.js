$(document).ready(function () {

	$('.sub-img-list').on('click', 'li', function () {
		console.log($(this).children('img').attr('src'));
		$('.detail-img').css('background', 'url("' + $(this).children('img').attr('src') + '")')
	});

	initialize();
});

function initialize() {
	var Y_point = parseFloat($('#latitude').val()); // Y 좌표
	var X_point = parseFloat($('#longitude').val()); // X 좌표
	var zoomLevel = 15; // 첫 로딩시 보일 지도의 확대 레벨
	var markerTitle = $('#title').val(); // 현재 위치 마커에 마우스를 올렸을때 나타나는 이름
	var markerMaxWidth = 300; // 마커를 클릭했을때 나타나는 말풍선의 최대 크기

	// 말풍선 내용
	var contentString = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h3 id="firstHeading" class="firstHeading">' + markerTitle + '</h3>' +
		'<div id="bodyContent">' +
		'<p>' + $('#address').text() + '<br />' +
		'Tel. ' + $('#phone').text() + '</p>' +
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

	/**
	 * 스크랩
	 * @since 2018-10-20
	 */
	$('#scrapHospital').on('click', function() {
		$.ajax({
			url : '/hospital/process/scrap/hospital',
			data : {
				hospital_idx : $('#hospitalIdx').val()
			},
			dataType : 'json',
			method : 'POST',
			success : function (data) {
				console.log(data);
				alert(data.desc);
				if (data.result) {
					var scrap = $('#scrap');
					var scrapCount = parseInt(scrap.text());
					scrapCount++;
					scrap.text(scrapCount);
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

	/**
	 * 후기작성
	 * @since 2018-10-20
	 */
	$('#writeBoard').on('click', function() {
		$.ajax({
			url : '/user/process/loginCheck',
			dataType : 'json',
			method : 'POST',
			success : function (data) {
				console.log(data);
				if (data.result) {
					window.location.href = '/hospital/write_board/' + $('#hospitalIdx').val();
				} else {
					alert(data.desc);
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

	/**
	 * 상단 사진 변경
	 * @since 2018-10-20
	 */
	$('ul.sub-img-list').on('click', 'li', function () {
		var targetImg = $(this).children('img');
		$('.detail-img').css('background', 'url(' + targetImg.attr('src') + ')');
	})
}