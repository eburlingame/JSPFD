
function AltimeterTicker(ctx, location, data)
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
		this.drawAltitimeterDigits(this.data.altitude);
	}

	this.drawAltitimeterDigits = function(altitude)
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

		ctx.moveTo(x, y);
		ctx.lineTo(x + wid - arrowSize, y);
		ctx.lineTo(x + wid, y + hei / 2);
		ctx.lineTo(x + wid - arrowSize, y + hei);
		ctx.lineTo(x, y + hei);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
  	
  		// Data to print
	  	var tensList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		tensList[i] = i + "0"
	  	}

	  	var onesList = []
	  	for (var i = 0; i < 10; i++)
	  	{
	  		onesList[i] = i + ""
	  	}  

	  	if (altitude < 0)
	  	{
	  		altitude = 0;
	  	}
  		var tens = altitude / 10
  		var hundreds = (altitude / 100)
  		var thousands = (altitude / 1000)
  		var thenThousands = (altitude / 10000)

	  	// Draw tens digit place
  		var loc = {}
  		var boxWidth = (wid - arrowSize)
  		loc.x = x + boxWidth * (3 / 4)
  		loc.y = y
  		loc.height = hei
  		loc.width = boxWidth / 4
  		drawTickerDigit(tensList, tens, 1.0, 0, loc, 32);

  		// Draw hundreds digit place
  		loc.x = x + boxWidth * (2 / 4)
  		drawTickerDigit(onesList, hundreds, 0.1, 30, loc, 32);

  		// Draw thousands digit place
  		loc.x = x + boxWidth * (1 / 4)
  		drawTickerDigit(onesList, thousands, 0.05, 20, loc, 55);

  		// Draw ten thousands digit place
  		loc.x = x
  		onesList[0] = ""
  		drawTickerDigit(onesList, thenThousands, 0.001, 20, loc, 55);
	}
}

function AltimeterTape(ctx, location, data)
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
		//       location, 		fontSize, leftAlign, bigTicks, smallTicks, negative,
		drawTape(this.loc,      20,      true,      1000,     100,         true,    
		//  scale, value,         bugValue 
			40,    this.data.altitude, this.data.altitudeBug);
	}
}