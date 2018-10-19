function login() {
	var id = $('input[name=id]');
	var pw = $('input[name=pw]');

	$.ajax({
		url: '/user/process/login',
		dataType: 'json',
		data: {
			id: id.val(),
			pw: pw.val()
		},
		method: "POST",
		success: function (data) {
			console.log(data);
			alert(data.desc);
			if (data.result) {
				window.location.href = '/';
			} else {

			}
		},
		error: function (err) {
			console.log(err);
		}
	})
}