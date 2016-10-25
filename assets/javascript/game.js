$(document).ready(function() {

	function Character (name, health, attack, counter) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.img_source = "assets/images/" + name + ".jpg";
	}

	Character.prototype.damage = function(multiplier) {
		return this.attack * multiplier;
	}

	Character.prototype.createElement = function(parent, hidden=false) {
		var div = $("<div>", {
			"class": "character object-wrapper",
			"data-name": this.name,
			"data-health": this.health,
			"data-attack": this.attack,
			"data-counter": this.counter
		});

		var p_name = $("<p>", {
			"class": "name object-text"
		}).text(this.name);

		var img = $("<img>", {
			"class": "object-picture center-block",
			"src": this.img_source
		});

		var p_health = $("<p>", {
			"class": "health object-text",
		}).text(this.health);

		if (hidden) {
			div.addClass('hid');
		}

		div.append(p_name, img, p_health);
		$(parent).append(div);
	}

	var obiWanKenobi = new Character("Obi-Wan Kenobi", 145, 11, 12);
	var lukeSkywalker = new Character("Luke Skywalker", 145, 10, 11);
	var darthSidious = new Character("Darth Sidious", 150, 12, 16);
	var darthMaul = new Character("Darth Maul", 155, 13, 16);
	var ewok = new Character("Ewok", 9001, 9001);

	obiWanKenobi.createElement('.all');
	lukeSkywalker.createElement('.all');
	darthSidious.createElement('.all');
	darthMaul.createElement('.all');
	ewok.createElement('.all', true);

	var balance = {
		'Obi-Wan Kenobi': obiWanKenobi,
		'Luke Skywalker': lukeSkywalker,
		'Darth Sidious': darthSidious,
		'Darth Maul': darthMaul,
		'Ewok': ewok
	}
	

	$(".object-wrapper").on("click", function() {
		if (!$('.all').children('[data-name="Ewok"]').is(':visible')) {
			$('.all').children('[data-name="Ewok"]').remove();
		}

		if ($('.player').children().length == 0) {
			var p = $(this).data('name');

			$('.player').append($('.all').children('[data-name="' + p + '"]'));
			$('.enemy').append($('.all').children());
			$('.all').css('display', 'none');
			$('.enemy').css('display', 'block');
			$('.enemy').children('.character').css({
				'background-color': 'red',
				'border': '2px solid black'
			});
		}

		if ($('.defender').children().length == 0) {
			var d = $(this).data('name');
			$('.defender').append($('.enemy').children('[data-name="' + d + '"]'));
			$('.defender').children('.character').css({
				'background-color': 'black',
				'border': '2px solid red'
			});
			$('.defender').find('.object-text').css('color', 'white');
		}
	});

	var i = 1;
	$('.attack-button').on('click', function() {
		if ($('.defender').children().length == 0) {
			$('.top').text('No enemy here');
			$('.top').css('display', 'block');
		}

		var player = $('.player').children()[0];
		var defender = $('.defender').children()[0];

		if ($(player).data('health') >= 0 && $(defender).data('health') >= 0) {

			var playerChar = balance[$(player).data('name')];
			var defenderChar = balance[$(defender).data('name')];

			var playerHealth = $(player).find('.health');
			var defenderHealth = $(defender).find('.health');

			$(playerHealth).text(
				parseInt($(player).data('health')) - parseInt($(defender).data('counter'))
			);
			$(player).data('health', $(playerHealth).text());

			$(defenderHealth).text(
				parseInt($(defender).data('health')) - playerChar.damage(i)
			);
			$(defender).data('health', $(defenderHealth).text());

			$('.status-text').css('display', 'block');
			$('.top').text(
				'You attacked ' + $(defender).data('name') + ' for ' + playerChar.damage(i) + ' damage.' 
			);
			$('.bottom').text(
				$(defender).data('name') + ' attacked you back for ' + $(defender).data('counter') + ' damage.'
			);

			i += 1;
		}

		if ($(player).data('health') <= 0) {
			$('.top').text('You have been defeated...GAME OVER!!!');
			$('.bottom').text('');
			$('.bottom').css('display', 'none');
			$('.restart-button').css('display', 'block');
		}

		else if ($(defender).data('health') <= 0) {

			if ($('.enemy').children().length == 0) {
				$(defender).remove();
				$('.top').text('You Won!!!! GAME OVER!!!');
				$('.bottom').text('');
				$('.bottom').css('display', 'none');
				$('.restart-button').css('display', 'block');
			}

			else {
				$('.top').text(
					'You have defeated ' + 
					$(defender).data('name') + 
					', you can choose to fight another enemy.'
				);
				$('.bottom').text('');
				$(defender).remove();
			}
		}
	});

	$('.restart-button').on('click', function() {
		location.reload();
	});

	var easterEgg = new Konami(function() {
		$('.all').children('[data-name="Ewok"]').css('display', 'block');
		$('.top').text('JubJubJub...');
		$('.top').css('display', 'block');
	});
});