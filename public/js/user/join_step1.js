$(document).ready(function () {
	var agreeAll = $('#agreeAll');
	var oneCheck = $('.one-check');
	var checkBoxObserver = new MutationObserver(function (mutations) {
		for (var i = 0; i < mutations.length; i++) {
			if (i === mutations.length - 1) {
				if (oneCheck.children('input.agree-check-area').length === oneCheck.children('input.agree-check-area:checked').length) {
					agreeAll.prop('checked', true);
				} else {
					agreeAll.prop('checked', false);
				}
			}
		}
	});
	var checkBoxList = oneCheck.children('input.agree-check-area');
	for (var i = 0; i < checkBoxList.length; i++) {
		checkBoxObserver.observe(checkBoxList[i], {attributes: true})
	}

	oneCheck.children('.agree-check-area').on('change', function () {
		var currentChecked = $(this).prop('checked'); // 체크박스 상태
		$(this).attr('checked', currentChecked);
	});

	/**
	 * 전체선택 체크박스 변경 이벤트
	 * @since 2018-10-12
	 */
	agreeAll.on('change', function () {
		var currentChecked = $(this).prop('checked'); // 전체선택 체크박스 상태

		var agree1 = $('#agree1');
		var agree2 = $('#agree2');
		var agree3 = $('#agree3');
		switch (currentChecked) {
			case true:
				agree1.prop('checked', true);
				agree2.prop('checked', true);
				agree3.prop('checked', true);
				break;
			case false:
				agree1.prop('checked', false);
				agree2.prop('checked', false);
				agree3.prop('checked', false);
				break;
		}
	});

	/**
	 * 동의함 클릭 이벤트
	 * @since 2018-10-12
	 */
	$('button.go').on('click', function () {
		var agree1 = $('#agree1');
		var agree2 = $('#agree2');
		var agree3 = $('#agree3');

		if (agree1.prop('checked') && agree2.prop('checked') && agree3.prop('checked')) {
			// 모든 체크박스가 체크상태일 경우
			window.location.href = '/user/join_step2';
		} else {
			alert("약관에 동의해주세요");
			agreeAll.focus();
		}

	});

	/**
	 * 동의안함 클릭 이벤트
	 * @since 2018-10-12
	 */
	$('button.cancel').on('click', function () {
		window.history.back();
	})
});