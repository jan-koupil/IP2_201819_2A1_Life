const mapWidth = 25;
const mapHeight = 25;

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
		for (let y = 0; y < mapHeight; y++) {
			const row = document.createElement("tr");
			viewMap.appendChild(row);
			this.cells[y] = [];

			for (let x = 0; x < mapWidth; x++) {
				const cell = document.createElement("td");
				row.appendChild(cell);
				this.cells[y][x] = cell; //store reference to cell
				cell.addEventListener("click", function(){
					controller.changeCellState(x,y);
				});
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
			}
		}
	}
};

const controlView = {
	initialize: function() {
		const startBtn = document.createElement("button");
		startBtn.innerText = "Start";
		startBtn.addEventListener("click", function(){controller.startStop();});
		document.getElementById("controls").appendChild(startBtn);
	},

	render: function() {

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
	getCellState: function(x, y) {
		try {
			return this.cells[y][x];
		} catch (e) {
			// temporary solution
			return false; // outside the map, all cells are dead
		}
	},

	setCellState: function(x, y, state) {
		this.cells[y][x] = state;
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
	initialize: function(mapHeight, mapWidth, mapView, ctrlView, model) {
        // store data
        this.model = model;
		this.mapView = mapView;
		this.ctrlView = ctrlView;
		this.mapHeight = mapHeight;
		this.mapWidth = mapWidth;

		this.mapView.initialize(mapWidth, mapHeight);
		this.ctrlView.initialize();
		this.model.initialize(this.createEmptyMap());

        // render initial state
		this.mapView.render(this.model.cells);
	},
	
	createEmptyMap: function() {
		const map = [];
		for (let y = 0; y < this.mapHeight; y++) {
			map[y] = [];
			for (let x = 0; x < this.mapWidth; x++) {
				map[y][x] = false;
			}
		}
		return map;
	},	

	changeCellState: function(x,y) {
		// change state in the model
		this.model.setCellState(x, y, !this.model.getCellState(x,y));
		// render
		this.mapView.render(this.model.cells);
	},
    
    /**
     * Calculates next state from current state
     * @returns {Array.Array.<boolean>} Next generation of cells
     */
	getNextState: function() {
		const nextState = [];
		for (let y = 0; y < this.mapHeight; y++) {
			nextState[y] = [];
			for (let x = 0; x < this.mapWidth; x++) {
				nextState[y][x] = this.isAlive(
					this.model.getCellState(x,y),
					this.neighbourCount(x,y)
				);
			}
		}
		return nextState;
	},
	
	iterate() {
		this.model.cells = this.getNextState();
		this.mapView.render(this.model.cells);
	},
    
    /**
     * Calculates if cell will be alive in the next generation
	 * @param {boolean} currentState - Currently dead or alive
     * @param {number} neighbourCount - Number of alive neighbours
     * @returns {boolean} dead(F) or alive(T)
     */
	isAlive: function(currentState, neighbourCount) {
        if (!currentState) {
			// dead cell with exactly 3 neighbours is alive again
			return neighbourCount === 3; 
		} else {
			// alive cells survive only with 2 or 3 neighbours
			return neighbourCount === 2 || neighbourCount === 3; 
		}
	},
	
	neighbourCount: function(x,y) {
		let count = 0;
		if (this.model.getCellState(x-1,y-1)) count++;
		if (this.model.getCellState(x  ,y-1)) count++;
		if (this.model.getCellState(x+1,y-1)) count++;
		if (this.model.getCellState(x-1,y  )) count++;
		if (this.model.getCellState(x+1,y  )) count++;
		if (this.model.getCellState(x-1,y+1)) count++;
		if (this.model.getCellState(x  ,y+1)) count++;
		if (this.model.getCellState(x+1,y+1)) count++;
		return count;
	},

	intervalRef: null, // reference to setInterval

	startStop: function() {
		// if not running, start
		if (!this.intervalRef) {
			this.intervalRef = setInterval(
				function(){controller.iterate();},
				500
			);			
		} else {
			clearInterval(this.intervalRef);
			this.intervalRef = null;
		}
	}
};

window.addEventListener("DOMContentLoaded", function() {
	controller.initialize(mapHeight, mapHeight, mapView, controlView, model);
	// setInterval(
	// 	function(){controller.iterate();},
	// 	2500
	// );
});
