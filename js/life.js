const mapWidth = 4;
const mapHeight = 4;

/**
 * Controls rendering the map area
 */
const mapView = {
    /** 
     * A 2D array of table cells representing the Life game cells
     * @type {Array.Array.HTMLTableDataCellElement} 
     */
	cells: null,

    /**
     * Initializes a new map view
     * @param {number} mapWidth - Map width
     * @param {number} mapHeight - Map height
     */
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

    /**
     * Updates the plan
     * @param {Array.Array.<boolean>} cellMap - The status of all Life game cells
     */
	render: function(cellMap) {
		for (let y = 0; y < cellMap.length; y++) {
			for (let x = 0; x < cellMap[y].length; x++) {
				this.cells[y][x].classList.toggle("isAlive", cellMap[y][x]);
                
                /* kód níže dělá to samé */
                
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
/**
 * Keeps all app data at one place
 */
const model = {
    /** @type {Array.Array.<boolean>} The alive cells */
    cells: null,
    
    /** 
     * Initializes the model with a new map
     * @param {Array.Array.<boolean>} map - The initial mapo
     */
	initialize: function(map) {
		this.cells = map;
    },

    /**
     * Returns state of a single cell, maintains indices outside boundaries
     * @param {number} x - x-coordinate
     * @param {number} y - y-coordinate
     * @returns {boolean} cell status
     */
	getCell: function(x, y) {
		try {
			return this.cells[y][x];
		} catch (e) {
			// temporary solution
			return false; // outside the map, all cells are dead
		}
	}
};

/**
 * Controls the view and the model, runs the game
 */
const controller = {
    /**
     * Initializes the game controller
     * @param {number} mapHeight - Map height
     * @param {number} mapWidth - Map width
     * @param {Object} mapView - The map view
     * @param {Object} model - The data model
     */
	initialize: function(mapHeight, mapWidth, mapView, model) {
        // store data
        this.model = model;
		this.mapView = mapView;
		this.mapHeight = mapHeight;
		this.mapWidth = mapWidth;

		let map = [
			[true, false, false, true],
			[true, false, true, true],
			[false, false, false, true],
			[true, true, true, true]
		];

		this.mapView.initialize(mapWidth, mapHeight);
		this.model.initialize(map);

        // render initial state
		this.mapView.render(this.model.cells);
    },
    
    /**
     * Calculates next state from current state
     * @returns {Array.Array.<boolean>} Next generation of cells
     */
	getNextState: function() {
		return [[]];
    },
    
    /**
     * Calculates if cell will be alive in the next generation
     * @param {number} neighbourCount - Number of alive neighbours
     * @returns {boolean} Dead(F) or alive(T)
     */
	isAlive: function(neighbourCount) {
        return false;
    }
};

window.addEventListener("DOMContentLoaded", function() {
	mapView.initialize(mapWidth, mapHeight);

	mapView.render(map);
});
