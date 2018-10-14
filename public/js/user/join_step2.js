$(document).ready(function () {

	/**
	 * 아이디 수정 클릭 이벤트
	 * @since 2018-10-14
	 */
	$('button#idChange').on('click', function () {
		var id = $('input#id');
		$('button#idChange').hide();
		$('button#idCheck').show();
		id.val('');
		id.attr('disabled', false);
		id.focus();
		$('#idCheckVal').val("0");
	});

	/**
	 * 닉네임 수정 클릭 이벤트
	 * @since 2018-10-14
	 */
	$('button#nickChange').on('click', function () {
		var nick = $('input#nick');
		$('button#nickChange').hide();
		$('button#nickCheck').show();
		nick.val('');
		nick.attr('disabled', false);
		nick.focus();
		$('#nickCheckVal').val("0");
	});

	/**
	 * 아이디 중복확인 클릭 이벤트
	 * @since 2018-10-14
	 */
	$('button#idCheck').on('click', function () {
		var id = $('#id');
		var idReg = /^[a-z]+[a-z0-9]{5,19}$/g;
		if (!idReg.test(id.val())) {
			alert("아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.");
			$('#idCheckVal').val("0");
			id.focus();
		} else {
			$.ajax({
				url: '/user/process/idCheck',
				method: 'POST',
				data: {
					id: id.val()
				},
				success: function (data) {
					alert(data.desc);
					if (data.result) {
						$('#idCheckVal').val("1");
						$('input#id').attr('disabled', true);
						$('button#idChange').show();
						$('button#idCheck').hide();
						$('input#pw').focus();
					} else {
						$('#idCheckVal').val("0");
					}
				}
			});
		}
	});

	/**
	 * 닉네임 중복확인 클릭 이벤트
	 * @since 2018-10-14
	 */
	$('button#nickCheck').on('click', function () {
		var nick = $('#nick');
		if (nick.val().length < 2) {
			alert("닉네임을 2자 이상으로 설정해주세요.");
			nick.focus();
		} else {
			$.ajax({
				url: '/user/process/nickCheck',
				method: 'POST',
				data: {
					nick: nick.val()
				},
				success: function (data) {
					alert(data.desc);
					if (data.result) {
						$('#nickCheckVal').val("1");
						$('input#nick').attr('disabled', true);
						$('button#nickChange').show();
						$('button#nickCheck').hide();
						$('input#email').focus();
					} else {
						$('#nickCheckVal').val("0");
					}
				}
			});
		}
	});

	/**
	 * 회원가입 클릭 이벤트
	 * @since 2018-10-14
	 */
	$('button.confirm').on('click', function () {
		if (parseInt($('#idCheckVal').val()) === 0) {
			alert('아이디 중복확인을 먼저 진행해주세요.');
			$('#idCheck').focus();
			return false;
		}

		if (parseInt($('#nickCheckVal').val()) === 0) {
			alert('닉네임 중복확인을 먼저 진행해주세요.');
			$('#nickCheck').focus();
			return false;
		}

		var id = $('#id');
		var pw = $('#pw');
		var pwCheck = $('#pwCheck');
		var name = $('#name');
		var nick = $('#nick');
		var email = $('#email');
		var acceptEmail = $('#acceptEmail');
		var phone = $('#phone');
		var zipCode = $('#zipCode');
		var address1 = $('#address1');
		var address2 = $('#address2');

		if (pw.val().length < 4 || pwCheck.val().length < 4) {
			alert("비밀번호는 4자리 이상 입력해주세요.");
			return false;
		}

		if (pw.val() !== pwCheck.val()) {
			alert("비밀번호와 비밀번호 확인이 다릅니다.");
			return false;
		}

		if (name.val() === "") {
			alert("이름을 입력해주세요.");
			return false;
		}

		var emailPattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";
		if (email.val().match(emailPattern) === false) {
			alert("이메일을 정확히 입력해주세요.");
			return false;
		}

		if (phone.val() === "") {
			alert("전화번호를 입력해주세요.");
			return false;
		}

		$.ajax({
			url : '/user/process/create',
			method : 'post',
			data : {
				id: id.val(),
				pw: pw.val(),
				name: name.val(),
				nick: nick.val(),
				email: email.val(),
				phone: phone.val(),
				zipCode: zipCode.val(),
				address1: address1.val(),
				address2: address2.val(),
				acceptEmail: acceptEmail.prop('checked') ? 1 : 0
			},
			success : function (data) {
				console.log(data);

				if (data.result) {
					alert('회원가입이 완료되었습니다.');
					window.location.href = '/user/join_step3';
				} else {
					alert(data.desc);
				}
			}
		})
	});
});


function searchAddr() {
	new daum.Postcode({
		oncomplete: function (data) {
			console.log(data);
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}
			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if (fullRoadAddr !== '') {
				fullRoadAddr += extraRoadAddr;
			}
			document.getElementById('zipCode').value = data.zonecode;

			if (data.userSelectedType === 'R') {
				//도로명주소
				document.getElementById('address1').value = data.jibunAddress;
			}
			else {
				//지번주소
				document.getElementById('address1').value = fullRoadAddr;
			}
			document.getElementById("address2").focus();
		}
	}).open();
}
