const mapWidth = 4;
const mapHeight = 4;

const mapView = {
	cells: null,

	initialize: function(mapWidth, mapHeight) {
		const viewMap = document.getElementById("map");

		this.cells = [];
		for (let i = 0; i < mapHeight; i++) {
			const row = document.createElement("tr");
			viewMap.appendChild(row);
			this.cells[i] = [];

			for (let j = 0; j < mapWidth; j++) {
				const cell = document.createElement("td");
				row.appendChild(cell);
				this.cells[i][j] = cell; //store reference to cell
			}
		}
	},

	render: function(cellMap) {
		for (let y = 0; y < cellMap.length; y++) {
			for (let x = 0; x < cellMap[y].length; x++) {
				this.cells[y][x].classList.toggle("isAlive", cellMap[y][x]);
				/* dělá to samé */
				// const cellTd = this.cells[y][x];
				// const isAlive = cellMap[y][x];
				// if (isAlive)
				//     cellTd.classList.add("isAlive");
				// else
				//     cellTd.classList.remove("isAlive");
			}
		}
	}
};

const model = {
	cells: null,
	initialize: function(map) {
		this.cells = map;
	},
	getCell: function(x, y) {
		try {
			return this.cells[y][x];
		} catch (e) {
			// temporary solution
			return false; // outside the map, all cells are dead
		}
	}
};

const controller = {
	initialize: function(mapHeight, mapWidth, mapView, model) {
		this.model = model;
		this.mapView = mapView;
		this.mapHeight = mapHeight;
		this.mapWidth = mapWidth;

		this.mapView.initialize(mapWidth, mapHeight);

		let map = [
			[true, false, false, true],
			[true, false, true, true],
			[false, false, false, true],
			[true, true, true, true]
		];

		this.model.initialize(map);

		this.mapView.render(this.model.cells);
	},
	getNextState: function() {
		// calculates next state from current state
	},
	isAlive: function(neighbourCount) {}
};

window.addEventListener("DOMContentLoaded", function() {
	mapView.initialize(mapWidth, mapHeight);

	mapView.render(map);
});
