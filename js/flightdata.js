function FlightData()
{
	var self = this;
	self.runningDemo = false;
	self.connectionOpen = false;
	self.url = "ws://localhost:4649/data";

	self.data = {}; // Holds the data to be displayed 
	self.rawData = []; // Holds the last 3 data points 
	var RECENT = 2;
	self.rawData[RECENT - 2] = {};
	self.rawData[RECENT - 1] = {};
	self.rawData[RECENT] = {};

	self.getData = function()
	{
		return self.data;
	}

	// Time between new data points
	self.culmTime = 0;
	self.updateData = function(delta)
	{      
		self.culmTime += delta;
		if (self.runningDemo)
		{
			self.demoTime += delta;
			self.sim.update(delta);
			self.data = self.sim.data;
		}
	}

	self.updateAPVars = function(mcp_sim)
	{
		self.data.airspeedBug = mcp_sim.memory.ias;
		self.data.headingBug = mcp_sim.memory.heading;
		self.data.altitudeBug = mcp_sim.memory.altitude;
		self.data.verticalSpeedBug = mcp_sim.memory.vert_speed;
	}

	self.pushData = function()
	{
		self.data.airspeed = self.getMappedValue('airspeed');
		self.data.latitude = self.getMappedValue('latitude');
		self.data.longitude = self.getMappedValue('longitude');
		self.data.trueCourse = self.getMappedValue('heading_magnetic');
		self.data.heading = self.getMappedValue('heading_magnetic');
		self.data.headingBug = 180 / 1;
		self.data.groundSpeed = self.getMappedValue('ground_speed'); 
		self.data.airspeedBug = 120 / 1;
		self.data.altitude = self.getMappedValue('altitude');
		self.data.altitudeBug = 4000 / 1;
		self.data.verticalSpeed = self.getMappedValue('vertical_speed');
		self.data.verticalSpeedBug = -500 / 1;
		self.data.bankAngle = self.getMappedValue('bank');
		self.data.pitchAngle = self.getMappedValue('pitch');
		self.data.turnCoordinationAngle = 0 / 1;
		self.data.terrainAhead = [];
	}

	self.openConnection = function()
	{
		var self = self;
		var ws = new WebSocket(self.url);

		ws.onopen = function()
		{
			send();
		}

		function send()
		{
			ws.send("getdata");
			if (self.connectionOpen) setTimeout(send, 90);
		}

		var now = then = deltaT = new Date().getTime();
		ws.onmessage = function (event) 
		{
			now = new Date().getTime();
			deltaT = (now - then) / 1000.0;
			then = now;

			self.shiftRecent();
			self.rawData[RECENT].delta = deltaT;
			self.rawData[RECENT] = JSON.parse(event.data);
		}
	} 

	self.shiftRecent = function()
	{		
		self.culmTime = 0;

		if (self.rawData[RECENT - 1] != null)
		{
			var deepCopied = jQuery.extend({}, self.rawData[RECENT - 1]);
			self.rawData[RECENT - 2] = deepCopied;
		}
		if (self.rawData[RECENT - 1] != null)
		{			
			var deepCopied = jQuery.extend({}, self.rawData[RECENT]);
			self.rawData[RECENT - 1] = deepCopied;
		}

		// Copy all attributes that were not in the new rawData object
		// self will cause the data point to freeze until a new value comes
		for(var propertyName in self.rawData[RECENT - 1]) 
		{
			if (self.rawData[RECENT][propertyName])
			{
				self.rawData[RECENT][propertyName] = self.rawData[RECENT - 1][propertyName];
			}
		}
	}

	// Maps an output to a proportional value between d1 and d3 that matches the 
	// second derivative of the three data points
	self.mapValue = function(d1, t2, d2, t3, d3, delta)
	{
		// console.log(d1, t2, d2, t3, d3, delta);
		var r2 = (d2 - d1) / t2;
		var r3 = (d3 - d2) / t3;
		var a1 = (r3 - r2) / (t2 + t3);
		var r_current = r2 + a1 * delta;
		return (d1 + r_current * delta);
	}

	self.sim = {};
	// Starts the demo
	self.runDemo = function()
	{
		self.sim = new FlightSim();
		self.rawData = self.sim.data;
		self.demoTime = 0;
		self.runningDemo = true;
	}
}