$(document).ready(function () {
	initialize();
});

function initialize() {
	var Y_point = 37.3959962; // Y 좌표
	var X_point = 126.93118049999998; // X 좌표
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

	/**
	 * 스크랩
	 * @since 2018-10-20
	 */
	$('#scrapHospital').on('click', function() {
		$.ajax({
			url : '/hospital/process/scrap/hospital',
			data : {

			},
			dataType : 'json',
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

	/**
	 * 후기작성
	 * @since 2018-10-20
	 */
	$('#writeBoard').on('click', function() {
		$.ajax({
			url : '/hospital/process/create/board',
			data : {

			},
			dataType : 'json',
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

	/**
	 * 상단 사진 변경
	 * @since 2018-10-20
	 */
	$('ul.sub-img-list').on('click', 'li', function () {
		var targetImg = $(this).children('img');
		$('.detail-img').css('background', 'url(' + targetImg.attr('src') + ')');
	})
}