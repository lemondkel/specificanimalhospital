$(document).ready(function () {

	$('.hospital-item').on('click', function () {
		var hospitalIdx = $(this).attr('data-hospital-id');
		window.location.href = '/hospital/detail/' + hospitalIdx;
	})
});