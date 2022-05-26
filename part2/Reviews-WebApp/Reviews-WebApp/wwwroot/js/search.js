$(function () {
	$('form').submit(async e => {
		e.preventDefault();

		const q = $('#search').val();

		const response = await fetch('/Reviews/Search?query=' + q);
		const data = await response.json();
		console.log(data);
		$('tbody').html("");
		if (data != undefined && Array.isArray(data) && data.length >= 0) {
			data.forEach(element => {
				$('tbody').append('<tr><td>' + element.name +
					'</td><td>' + element.grade + " / 5"+
					'</td><td>' + element.feedback +
					'</td><td>' + new Date(element.date).toLocaleString() +
					'</td></tr >');
			});
		}
	})
});