
// horizontalScale in pixels per nm
function ProfileDisplay(ctx, location, horizontalScale, fontSize, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.fontSize = fontSize;
	this.max = 2000;
	this.image = null;
	this.horizontalScale = horizontalScale;

	this.update = function(data)
	{
		this.data = data;
		var feetPerSec = this.data.verticalSpeed;
		var nmPerHour = this.data.groundSpeed;
		this.feetPerNm = (feetPerSec / nmPerHour) * (60.0);
	}

	this.draw = function()
	{		
		var x = this.loc.x;
  		var y = this.loc.y;
  		var wid = this.loc.width;
  		var hei = this.loc.height;
		var ctx = this.ctx;

		ctx.save();
		ctx.rect(x, y, wid, hei);
		ctx.clip();
		ctx.translate(x, y);

		ctx.fillStyle = BACKGROUND;
		ctx.fillRect(0, 0, wid, hei);

		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.lineWidth = 1;

		var planeMoveThreshold = 100; // feet in altitude
		var planeHeightPixels = (hei / 2);
		if (this.data.altitude < planeMoveThreshold)
		{
			planeHeightPixels = (this.data.altitude / planeMoveThreshold) * (hei / 2);
			planeHeightPixels = hei - planeHeightPixels;
		}

		var feetPerPixel = (this.data.altitude) / (planeHeightPixels); // feet per pixel
		var widthInNm = (wid * 0.6) / this.horizontalScale; // nm
		var newY = - this.feetPerNm * widthInNm / feetPerPixel;
		ctx.moveTo(wid * 0.2, planeHeightPixels);
		ctx.lineTo(wid * 0.8, planeHeightPixels + newY);
		ctx.stroke();

		ctx.strokeStyle = EARTH;
		ctx.beginPath();
		ctx.moveTo(0, hei - 1);
		ctx.lineTo(wid, hei - 1);
		ctx.stroke();

		if (this.img != null)
		{
			ctx.drawImage(this.img, wid * 0.2 - 30, planeHeightPixels - 10, 30, 10);
		}

		ctx.restore();
	}

	this.loadImage = function()
	{	
		this.img = new Image();
		this.img.onload = function() 
		{
			// ctx.drawImage(this.img, 178, 61, 30, 10);
		}
		this.img.src = "Plane_icon.png";
	}
	this.loadImage();
}