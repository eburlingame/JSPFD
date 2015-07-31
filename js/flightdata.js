function FlightData()
{
	this.runningDemo = false;
	this.connectionOpen = false;
	this.url = "ws://localhost:4649/data";

	this.data = {}; // Holds the data to be displayed 
	this.rawData = []; // Holds the last 3 data points 
	var RECENT = 2;
	this.rawData[RECENT - 2] = {};
	this.rawData[RECENT - 1] = {};
	this.rawData[RECENT] = {};

	this.getData = function()
	{
		return this.data;
	}

	// Time between new data points
	this.culmTime = 0;
	this.updateData = function(delta)
	{      
		this.culmTime += delta;
		if (this.runningDemo)
		{
			this.updateDemo(delta);
		}        

		this.pushData();
	}

	this.pushData = function()
	{
		this.data.airspeed = this.getMappedValue('airspeed');

		this.data.latitude = this.getMappedValue('latitude');
		this.data.longitude = this.getMappedValue('longitude');
		this.data.trueCourse = this.getMappedValue('heading_magnetic');
		this.data.heading = this.getMappedValue('heading_magnetic');
		this.data.headingBug = 180 / 1;
		this.data.groundSpeed = this.getMappedValue('ground_speed'); 
		this.data.airspeedBug = 120 / 1;
		this.data.altitude = this.getMappedValue('altitude');
		this.data.altitudeBug = 4000 / 1;
		this.data.verticalSpeed = this.getMappedValue('vertical_speed');
		this.data.verticalSpeedBug = -500 / 1;
		this.data.bankAngle = this.getMappedValue('bank');
		this.data.pitchAngle = this.getMappedValue('pitch');
		this.data.turnCoordinationAngle = 0 / 1;
		this.data.terrainAhead = [];
	}

	this.openConnection = function()
	{
		var self = this;
		var ws = new WebSocket(this.url);

		ws.onopen = function()
		{
			send();
		}

		function send()
		{
			ws.send("getdata");
			if (this.connectionOpen) setTimeout(send, 90);
		}

		var now = then = deltaT = new Date().getTime();
		ws.onmessage = function (event) 
		{
			now = new Date().getTime();
			deltaT = (now - then) / 1000.0;
			then = now;

			this.shiftRecent();
			this.rawData[RECENT].delta = deltaT;
			this.rawData[RECENT] = JSON.parse(event.data);
		}
	} 

	this.shiftRecent = function()
	{		
		this.culmTime = 0;

		if (this.rawData[RECENT - 1] != null)
		{
			var deepCopied = jQuery.extend({}, this.rawData[RECENT - 1]);
			this.rawData[RECENT - 2] = deepCopied;
		}
		if (this.rawData[RECENT - 1] != null)
		{			
			var deepCopied = jQuery.extend({}, this.rawData[RECENT]);
			this.rawData[RECENT - 1] = deepCopied;
		}

		// Copy all attributes that were not in the new rawData object
		// This will cause the data point to freeze until a new value comes
		for(var propertyName in this.rawData[RECENT - 1]) 
		{
			if (this.rawData[RECENT][propertyName])
			{
				this.rawData[RECENT][propertyName] = this.rawData[RECENT - 1][propertyName];
			}
		}
	}

	this.getMappedValue = function(index)
	{		
		if (this.rawData[RECENT - 2][index] != null)
		{
			// (d1, t2, d2, t3, d3, delta)
			return this.mapValue(   this.rawData[RECENT - 2][index] / 1, // make sure it's a number
									this.rawData[RECENT - 1].delta, 
									this.rawData[RECENT - 1][index] / 1,
									this.rawData[RECENT].delta,
									this.rawData[RECENT][index] / 1,
									this.culmTime);	
		}
		return this.rawData[RECENT][index];
	}

	// Maps an output to a proportional value between d1 and d3 that matches the 
	// second derivative of the three data points
	this.mapValue = function(d1, t2, d2, t3, d3, delta)
	{
		// console.log(d1, t2, d2, t3, d3, delta);
		var r2 = (d2 - d1) / t2;
		var r3 = (d3 - d2) / t3;
		var a1 = (r3 - r2) / (t2 + t3);
		var r_current = r2 + a1 * delta;
		return (d1 + r_current * delta);
	}

	// Starts the demo
	this.runDemo = function()
	{
		this.rawData[RECENT] = {};
		this.rawData[RECENT].latitude = 46.197176;
		this.rawData[RECENT].longitude = -121.516602;
		this.rawData[RECENT].heading_magnetic = 180;
		this.rawData[RECENT].airspeed = 100;
		this.rawData[RECENT].ground_speed;
		this.rawData[RECENT].altitude = 1000;
		this.rawData[RECENT].vertical_speed = 200;
		this.rawData[RECENT].bank;
		this.rawData[RECENT].pitch;

		this.runningDemo = true;
	}


	this.heading = 100;
	this.headingSpd = 0;
	this.headingAcc = 0;

	this.altitude = 1000;
	this.altitudeSpd = 4;
	this.altitudeAcc = 5;

	this.airspeed = 100;
	this.airspeedSpd = 8;
	this.airspeedAcc = -1;
	this.airspeedAccAcc = 0.001;
	this.demoTime = 0;
	this.demoMaxTime = 0.5;
	this.updateDemo = function(delta)
	{
		this.demoTime += delta;

		this.altitude += this.altitudeSpd * delta;
		this.altitudeSpd += this.altitudeAcc * delta;

		this.heading += this.headingSpd * delta;
		this.headingSpd += this.headingAcc * delta;

		this.airspeed += this.airspeedSpd * delta;
		this.airspeedSpd += this.airspeedAcc * delta;
		this.airspeedAcc += this.airspeedAccAcc * delta;

		if (this.demoTime >= this.demoMaxTime)
		{
			this.shiftRecent();
			this.rawData[RECENT].delta = this.demoTime;
			this.rawData[RECENT].airspeed = this.airspeed;
			this.rawData[RECENT].heading_magnetic = this.heading;
			this.rawData[RECENT].altitude = this.altitude;



			this.demoTime = 0;
		}
	}
}