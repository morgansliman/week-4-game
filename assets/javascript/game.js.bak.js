$(document).ready(function() {

	
	var character = {
		name: "",

		health: 0,

		attack: 0,

		img_source: "",

		init: function(name, health, attack) {
			this.name = name;
			this.health = health;
			this.attack = attack;
			this.img_source = "assets/images/" + name + ".jpg";
			this.createElement(".all");
			return this;
		},

		createElement: function(parent) {
			var div = $("<div>", {
				"class": "character object-wrapper",
				"data-name": this.name,
				"data-health": this.health,
				"data-attack": this.attack
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
	};

	var obiWanKenobi = character.init("Obi-Wan Kenobi", 120, 8);
	var lukeSkywalker = character.init("Luke Skywalker", 100, 5);
	var darthSidious = character.init("Darth Sidious", 150, 20);
	var darthMaul = character.init("Darth Maul", 180, 25);

	var balance = {
		"Obi-Wan Kenobi": obiWanKenobi,
		"Luke Skywalker": lukeSkywalker,
		"Darth Sidious": darthSidious,
		"Darth Maul": darthMaul
	};

	$(".object-wrapper").on("click", function() {
		var k = balance[$(this).data("name")];
		console.log(k);
	})
});