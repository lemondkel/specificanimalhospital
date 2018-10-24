$(document).ready(function () {
	$('.mypage-hospital-item').on('click', function () {
		var hospitalIdx = $(this).attr('data-hospital-id');
		window.location.href = '/hospital/detail/' + hospitalIdx;
	});
});