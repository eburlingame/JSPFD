
function AirspeedTicker(ctx, location, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		this.drawAirspeedDigits(this.data.airspeed);
	}

	this.drawAirspeedDigits = function(airspeed)
	{
		var x = this.loc.x;
  		var y = this.loc.y;
  		var wid = this.loc.width;
  		var hei = this.loc.height;

  		var arrowSize = 15; 

  		var ctx = this.ctx;
  		ctx.fillStyle = GUAGE_BACKGROUND;
 		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();

		ctx.moveTo(x, y + hei / 2);
		ctx.lineTo(x + arrowSize, y);
		ctx.lineTo(x + arrowSize + wid, y);
		ctx.lineTo(x + arrowSize + wid, y + hei);
		ctx.lineTo(x + arrowSize, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
  	
	  	var onesList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i + ""
	  	}  

	  	if (airspeed < 0)
	  	{
	  		airspeed = 0;
	  	}
  		var ones = airspeed / 1;
  		var tens = airspeed / 10; 
  		var hundreds = airspeed / 100;

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x + arrowSize + (boxWidth) - 12
  		loc.y = y
  		loc.height = hei
  		loc.width = boxWidth / 3 + 5;
  		drawTickerDigit(onesList, ones, 1.0, 0, loc, 42);

  		// Draw tens digit place
  		loc.x -= (1 / 3 * boxWidth) + 5;
  		drawTickerDigit(onesList, tens, 0.2, 30, loc, 42);

  		// Draw hundreds digit place
  		onesList[0] = "";
  		loc.x -= (1 / 3 * boxWidth) + 5;
  		drawTickerDigit(onesList, hundreds, 0.01, 20, loc, 42);
	}
}

function AirspeedTape(ctx, location, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		//       location, 		fontSize, leftAlign, bigTicks,   
		drawTape(this.loc,      20,      false,      100,   
		//  smallTicks, negative, scale, value,           bugValue
			10,         false,    50,    data.airspeed,   data.airspeedBug);
	}
}