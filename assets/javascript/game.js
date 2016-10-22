$(document).ready(function() {

	function Character (name, health, attack) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.img_source = "assets/images/" + name + ".jpg";
	}

	Character.prototype.createElement = function(parent) {
		var div = $("<div>", {
			"class": "character object-wrapper",
			"data-name": this.name,
			"data-health": this.health,
			"data-attack": this.attack,
		});

		var p_name = $("<p>", {
			"class": "name object-text",
			"data-name": this.name
		}).text(this.name);

		var img = $("<img>", {
			"class": "object-picture center-block",
			"src": this.img_source
		});

		var p_health = $("<p>", {
			"class": "health object-text",
			"data-health": this.health
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
		"Obi-Wan Kenobi": obiWanKenobi,
		"Luke Skywalker": lukeSkywalker,
		"Darth Sidious": darthSidious,
		"Darth Maul": darthMaul
	};

	$(".object-wrapper").on("click", function() {
		if ($('.player').children().length == 0) {
			var k = $(this).data('name');
			balance[k].createElement('.player');

			
		}
	})
});