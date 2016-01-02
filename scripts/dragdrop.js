var theFaves = document.getElementById('faves');

$('.menu')
	.bind('dragstart', function (evt) {
		evt.dataTransfer.setData('text', this.id);
	});


$('#favorites')
	.bind('dragover', function (evt) {
		$('#favorites').css('background-color','gray');
		evt.preventDefault();
	})
	.bind('dragleave', function (evt) {
		$('#favorites').css('background-color','#A858A3');
		evt.preventDefault();
	})
	.bind('dragenter', function (evt) {
		evt.preventDefault();
	})
	.bind('drop', function (evt) {
		var id = evt.dataTransfer.getData('text'),
			item = $('#' + id),
			favList = $("#faves"),
			prevFavItem = null,
			deleteHtml = null;
		var title = item.data().name,
			value = parseInt(item.data().calory),
			deleteHtml = '<button class="destroy">x</button>',
			textValue = title + ' - ' + value + 'kcal ' + deleteHtml,


			prevFavItem = $('<li />', {
				html: textValue,
				data : { id : id }
			}).appendTo(favList);
		$('#favorites').css('background-color','#A858A3');

		// saveFaves();

		evt.stopPropagation();
		return false;
	});

	function saveFaves() {
		localStorage.setItem('favorites', theFaves.innerHTML);
	};

	// loadFaves();

	function loadFaves() {
		if (localStorage.getItem('favorites')) {
			theFaves.innerHTML = localStorage.getItem('favorites');
		}
	}
