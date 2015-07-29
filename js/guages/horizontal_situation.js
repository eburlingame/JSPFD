
function HorizontalSituationIndicator(ctx, location, fontSize, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.fontSize = fontSize;

	this.update = function(data)
	{
		this.data = data;
	}

	this.draw = function()
	{
		this.drawBackground();
		this.drawForeground(this.data.heading, this.data.trueCourse, this.data.headingBug);
	}

	this.drawBackground = function()
	{
		var ctx = this.ctx;

		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.rect(x, y, wid, hei);
		ctx.clip();

		ctx.fillStyle = BACKGROUND;
		ctx.fillRect(x, y, wid, hei);
		ctx.translate(x + wid / 2, y + hei);

		// Draw Arc
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(0, 0, hei - 2, 0, 2*Math.PI);
		ctx.stroke();

		// Draw plane cross icon
		var planeWidth = 20;	
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.fillRect(- planeWidth, -3, planeWidth * 2, planeWidth / 4);

		ctx.restore();
	}

	this.drawForeground = function(heading, trueCourse, headingBug)
	{	
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;

		ctx.save();
		ctx.translate(x + wid / 2, y + hei);

		// Draw heading line
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, - hei + 3);
		ctx.stroke();
		
		// Draw true course line
		ctx.strokeStyle = SKY;
		ctx.lineWidth = 2;
		ctx.setLineDash([20, 5]);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		var R = hei - 3; var theta = - (heading - trueCourse) * Math.PI / 180 - Math.PI / 2
		var newX = (R * Math.cos(theta));
		var newY = (R * Math.sin(theta));
		ctx.lineTo(newX, newY);
		ctx.stroke();

		// Draw true heading bug line
		ctx.strokeStyle = BUG;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		R = hei - 3; 
		theta = - (heading - headingBug) * Math.PI / 180 - Math.PI / 2
		newX = (R * Math.cos(theta));
		newY = (R * Math.sin(theta));
		ctx.lineTo(newX, newY);
		ctx.stroke();

		// Draw box around heading numbers
		ctx.setLineDash([]);
		ctx.font = fontSize + "px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.strokeStyle = GUAGE_FOREGROUND;
		var boxHeight = this.fontSize;
		var boxWidth = ctx.measureText("333").width + 10;
		ctx.fillRect(- boxWidth / 2, - hei + 0.5 * boxHeight, boxWidth, boxHeight);
		ctx.strokeRect(- boxWidth / 2, - hei + 0.5 * boxHeight, boxWidth, boxHeight);

		// Draw heading numbers
		ctx.fillStyle = GUAGE_FOREGROUND;
		ctx.fillText(Math.floor(heading), 0, - hei + boxHeight)



		// Draw box around course numbers
		ctx.font = 0.5 * fontSize + "px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.strokeStyle = SKY;
		var boxHeight = this.fontSize;
		var boxWidth = ctx.measureText("333").width + 10;
		ctx.fillRect(- boxWidth / 2, - hei + 2.5 * boxHeight, boxWidth, boxHeight);
		ctx.strokeRect(- boxWidth / 2, - hei + 2.5 * boxHeight, boxWidth, boxHeight);

		// Draw course numbers
		ctx.fillStyle = SKY;
		ctx.fillText(Math.floor(trueCourse), 0, - hei + 3 * boxHeight)

		ctx.restore();
	}
}
