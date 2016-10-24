$(document).ready(function() {

	function Character (name, health, attack) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.img_source = "assets/images/" + name + ".jpg";
	}

	Character.prototype.damage = function(multiplier) {
		return this.attack * multiplier;
	}

	Character.prototype.createElement = function(parent) {
		var div = $("<div>", {
			"class": "character object-wrapper",
			"data-name": this.name,
			"data-health": this.health,
			"data-attack": this.attack,
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

		div.append(p_name, img, p_health);
		$(parent).append(div);
	}

	var obiWanKenobi = new Character("Obi-Wan Kenobi", 120, 8);
	var lukeSkywalker = new Character("Luke Skywalker", 100, 5);
	var darthSidious = new Character("Darth Sidious", 150, 20);
	var darthMaul = new Character("Darth Maul", 180, 25);

	obiWanKenobi.createElement('.all');
	lukeSkywalker.createElement('.all');
	darthSidious.createElement('.all');
	darthMaul.createElement('.all');

	var balance = {
		'Obi-Wan Kenobi': obiWanKenobi,
		'Luke Skywalker': lukeSkywalker,
		'Darth Sidious': darthSidious,
		'Darth Maul': darthMaul
	}

	$(".object-wrapper").on("click", function() {
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
		var player = $('.player').children()[0];
		var defender = $('.defender').children()[0];

		var playerChar = balance[$(player).data('name')];
		var defenderChar = balance[$(defender).data('name')];

		$('.status-text').css('display', 'block');
		$('.top').text(
			'You attacked ' + $(defender).data('name') + ' for ' + playerChar.damage(i) + ' damage.' 
		);
		$('.bottom').text(
			$(defender).data('name') + ' attacked you back for ' + $(defender).data('attack') + ' damage.'
		);

		i += 1;
	});
});