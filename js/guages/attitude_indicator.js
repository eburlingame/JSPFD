
function AttitudeIndicator(ctx, location, pixelsPerDegree, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.pixelsPerDegree = pixelsPerDegree;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		this.drawBackground(this.data.pitchAngle, this.data.bankAngle);
		this.drawForeground(this.data.turnCoordinationAngle);
	}

	this.drawBackground = function(pitchAngle, bankAngle, turnCoordinationAngle)
	{
		var ctx = this.ctx;

		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.rect(x, y, wid, hei);
		ctx.clip();

		ctx.translate(x + wid / 2, y + hei / 2);

		ctx.rotate(bankAngle * Math.PI / 180);
		ctx.translate(0, this.pixelsPerDegree * pitchAngle);

		ctx.fillStyle = SKY;
		ctx.fillRect(- wid, -1000, 2 * wid, 1000);
		ctx.fillStyle = GROUND;
		ctx.fillRect(- wid, 0, 2 * wid, 1000);
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.fillRect(- wid, 0, 2 * wid, 1);

		var WIDTH_TEN = 100;
		var WIDTH_FIVE = 50;

		for (var i = -90; i < 90; i += 5)
		{
			ctx.fillStyle = GUAGE_FOREGROUND;
			ctx.font = "15px Arial";
			ctx.textAlign = "center"
			ctx.textBaseline = 'middle';
			var newY = - i * (this.pixelsPerDegree)
			if (i % 10 == 0 && i != 0)
			{
				ctx.fillRect(- WIDTH_TEN / 2, newY, WIDTH_TEN, 1);
				ctx.fillText(i, - WIDTH_TEN / 2 - 20, newY);
				ctx.fillText(i, + WIDTH_TEN / 2 + 20, newY);
			}
			else if (i != 0)
			{
				ctx.fillRect(- WIDTH_FIVE / 2, newY, WIDTH_FIVE, 1);
			}
		}

		ctx.restore();
	}

	this.drawForeground = function(turnCoordinationAngle)
	{	
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.translate(x + wid / 2, y + hei / 2);

		ctx.fillStyle = "#000";
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.moveTo(-125, -3);
		ctx.lineTo(-50, -3);
		ctx.lineTo(-50, 20);
		ctx.lineTo(-56, 20);
		ctx.lineTo(-56, 3);
		ctx.lineTo(-125, 3);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(125, -3);
		ctx.lineTo(50, -3);
		ctx.lineTo(50, 20);
		ctx.lineTo(56, 20);
		ctx.lineTo(56, 3);
		ctx.lineTo(125, 3);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		var boxWidth = 15;

		ctx.rect(-boxWidth, -boxWidth, 2 * boxWidth, 2 * boxWidth);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.arc(turnCoordinationAngle * this.pixelsPerDegree, 0, boxWidth - 2, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.restore();
	}
}
