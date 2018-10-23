$(document).ready(function () {

});

/**
 * 후기작성
 */
function writeHospitalBoard() {
	$.ajax({
		url : '/user/process/loginCheck',
		dataType : 'json',
		method : 'POST',
		success : function (data) {
			console.log(data);
			if (data.result) {
				// 후기작성 로직 필요

				var star = 3;
				var text = $('.write-text').val();

				$.ajax({
					url : '/hospital/process/create/board',
					data : {
						hospitalIdx : parseInt($("#hospitalIdx").val()),
						star : star,
						text : text
					},
					dataType : 'json',
					method : 'POST',
					success : function (data) {
						console.log(data);
						if (data.result) {
							// 후기작성 로직 필요
							alert("성공적으로 등록되었습니다.");
							window.location.href = '/hospital/detail/' + $("#hospitalIdx").val();
						} else {
							alert(data.desc);
						}
					}
				})
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
}

/**
 * 취소
 */
function cancel() {
	window.location.href = '/hospital/detail/' + $("#hospitalIdx").val();
}