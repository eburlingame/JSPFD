
function VerticalSpeedIndicator(ctx, location, fontSize, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.fontSize = fontSize;
	this.max = 2000;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		var verticalSpeed = this.data.verticalSpeed;
		if (this.data.verticalSpeed > this.max)
		{
			verticalSpeed = this.max;
		}
		else if (this.data.verticalSpeed < - this.max)
		{
			verticalSpeed = - this.max;
		}

		this.drawBackground(this.data.verticalSpeed);
		this.drawBug(this.data.verticalSpeedBug)
		// this.drawArrow(verticalSpeed);
		this.drawPointer(verticalSpeed);
	}

	this.drawBackground = function(verticalSpeed)
	{
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;
		var ctx = this.ctx;
		var fontSize = this.fontSize;

		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.fillRect(0, 0, wid / 4, hei);
		ctx.fillStyle = BACKGROUND;
		ctx.fillRect(wid / 4 + 3, 0, wid * 3 / 4, hei);

		ctx.translate(0, hei / 2);
		ctx.fillRect(wid / 4 + 3, -fontSize / 2, wid * 3 / 4, fontSize);
		ctx.strokeRect(wid / 4 + 3, -fontSize / 2, wid * 3 / 4, fontSize);

		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.font = fontSize + "px Arial"
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.fillText(Math.floor(verticalSpeed), wid / 4 + 3 + wid * 1.5 / 4, 0);

		ctx.font = "15px Arial"
		ctx.textAlign = "left";
		list = [-2000, -1500, -1000, -500, -250, 250, 500, 1000, 1500, 2000];
		for (var i = 0; i < list.length; i++)
		{
			var value = list[i];
			var newY = this.getYFromValue(value, this.max);
			ctx.fillText(value, wid / 4 + 3, newY)
		}
		
		ctx.restore();
	}

	this.drawArrow = function(value)
	{
		ctx.save();
		ctx.translate(this.loc.x, this.loc.y + this.loc.height / 2);

		var totalWidth = this.loc.width / 4;
		var height = this.getYFromValue(value);
		var arrowWidth = 0.5 * totalWidth;
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		if (height > 0)
		{
			ctx.moveTo(2, height - arrowWidth);
			ctx.lineTo(totalWidth / 2, height); // Top
			ctx.lineTo(totalWidth - 2,  height - arrowWidth);
			ctx.fillRect((totalWidth - arrowWidth) / 2, 0, arrowWidth, height - arrowWidth);
		}
		else
		{
			ctx.moveTo(2,  height + arrowWidth);
			ctx.lineTo(totalWidth / 2,  height); // Top
			ctx.lineTo(totalWidth - 2,   height + arrowWidth);
			ctx.fillRect((totalWidth - arrowWidth) / 2, 0, arrowWidth, height + arrowWidth);
		}

		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}

	this.drawPointer = function(value)
	{	
		ctx.save();
		ctx.translate(this.loc.x, this.loc.y + this.loc.height / 2);

		var totalWidth = this.loc.width / 4;
		var height = this.getYFromValue(value);
		var arrowWidth = 0.35 * totalWidth;
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.moveTo(0, height - arrowWidth); 
		ctx.lineTo(totalWidth * 0.8, height - arrowWidth);
		ctx.lineTo(totalWidth, height);
		ctx.lineTo(totalWidth * 0.8, height + arrowWidth);
		ctx.lineTo(0, height + arrowWidth);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	this.drawBug = function(value)
	{	
		ctx.save();
		ctx.translate(this.loc.x, this.loc.y + this.loc.height / 2);

		var totalWidth = this.loc.width / 4;
		var height = this.getYFromValue(value);
		var arrowWidth = 0.35 * totalWidth;

		ctx.fillStyle = BUG;
		ctx.beginPath();
		ctx.moveTo(totalWidth, height - arrowWidth); 
		ctx.lineTo(totalWidth * 0.8, height - arrowWidth);
		ctx.lineTo(totalWidth, height);
		ctx.lineTo(totalWidth * 0.8, height + arrowWidth);
		ctx.lineTo(totalWidth, height + arrowWidth);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	this.getYFromValue = function(value, max)
	{
		var absValue = Math.abs(value);
		var mapped = ((-0.00002 * absValue * absValue + 0.08 * absValue) / 85);
		if (value < 0)
		{
			return mapped * (this.loc.height / 2); 
		}
		else
		{
			return - mapped * (this.loc.height / 2); 
		}
	}
}