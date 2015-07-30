function FlightData()
{
	this.connectionOpen = false;
	this.url = "ws://localhost:4649/data";

	this.data = {};
	this.rawData = [];
	var RECENT = 2;


	this.getData = function()
	{
		return this.data;
	}

	this.updateData = function(delta)
	{                                          
		// Map to raw data array 
		data.latitude = rawData[RECENT].latitude / 1;
		data.longitide = rawData[RECENT].longitide / 1;
		data.trueCourse = rawData[RECENT].heading_magnetic;
		data.heading = rawData[RECENT].heading_magnetic;
		data.headingBug = 180;
		data.groundSpeed = rawData[RECENT].ground_speed;
		data.airspeed = rawData[RECENT].airspeed;
		data.airspeedBug = 120;
		data.altitude = rawData[RECENT].altitude;
		data.altitudeBug = 4000;
		data.verticalSpeed = rawData[RECENT].vertical_speed;
		data.verticalSpeedBug = -500;
		data.bankAngle = rawData[RECENT].bank;
		data.pitchAngle = rawData[RECENT].pitch;
		data.turnCoordinationAngle = 0;
		data.terrainAhead = [];
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

	  ws.onmessage = function (event) 
	  {
		if (this.rawData[RECENT - 2] != null)
		{
			this.rawData[RECENT - 2] = this.rawData[RECENT - 1];
		}
		if (this.rawData[RECENT - 1] != null)
		{
			this.rawData[RECENT - 1] = this.rawData[RECENT];
		}
	    this.rawData[RECENT] = JSON.parse(event.data);
	  }
	} 

	this.runDemo = function()
	{

	}
}