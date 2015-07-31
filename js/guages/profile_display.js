
// horizontalScale in nm per width
// terrainSteps in number of steps of terrain to draw
function ProfileDisplay(ctx, location, terrainOn, horizontalScale, terrainSteps, fontSize, data)
{
	this.ctx = ctx;
	this.data = data;
	this.loc = location;
	this.fontSize = fontSize;
	this.terrainOn = terrainOn;
	this.max = 2000;
	this.image = null;

	this.horizontalScale = (0.6 * this.loc.width) / horizontalScale; // pixels per nm
	this.terrainResolution = (0.6 * this.loc.width) / this.horizontalScale / terrainSteps; // nm per step
	this.verticalScale = 10; // feet per pixel
	this.planeHeightPixels = this.loc.height / 2; // pixels

  	this.terrain = new TerrainData();
  	this.lastTrueCourse = 0;
	this.data.terrainAhead = this.terrain.elevationArr;

	this.update = function(data) 
	{
		this.data = data;
		var feetPerSec = this.data.verticalSpeed;
		var feetPerSecBug = this.data.verticalSpeedBug;
		var nmPerHour = this.data.groundSpeed;

		this.feetPerNm = (feetPerSec / nmPerHour) * (60.0);
		this.feetPerNmBug = (feetPerSecBug / nmPerHour) * (60.0);

  		if (this.terrainOn && Math.floor(this.lastTrueCourse) != Math.floor(this.data.trueCourse))
  		{
  			var nmRight = 0.8 * this.loc.width / (this.horizontalScale); // pixels / (pixels / nm)
  			var nmLeft = 0.2 * this.loc.width / (this.horizontalScale); // pixels / (pixels / nm)
  			this.terrain.getElevationArray( this.data.latitude, 
  											this.data.longitude,
  											this.data.trueCourse,
  											-nmLeft, 
  											nmRight, 
  											this.terrainResolution);
	  		this.lastTrueCourse = this.data.trueCourse;	
  		}
	}

	this.draw = function()
	{		
		this.drawBackGround();
		this.drawTerrain();
		this.drawPlaneAndLine();
	}

	this.drawBackGround = function()
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

		ctx.strokeStyle = EARTH;
		ctx.beginPath();
		ctx.moveTo(0, hei - 1);
		ctx.lineTo(wid, hei - 1);
		ctx.stroke();

		ctx.restore();
	}

	this.drawPlaneAndLine = function()
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

		// Calculate plane's height in pixels if we are close to the ground
		var planeMoveThreshold = 100; // feet in altitude
		var planeHeightPixels = (hei / 2);
		this.planeHeightPixels = planeHeightPixels;
		if (this.data.altitude < planeMoveThreshold)
		{
			planeHeightPixels = (this.data.altitude / planeMoveThreshold) * (hei / 2);
			planeHeightPixels = hei - planeHeightPixels;
		}

		// Calculate vertical and horizontal scales
		var feetPerPixel = (this.data.altitude) / (planeHeightPixels); // feet per pixel
		this.verticalScale = feetPerPixel; // feet per pixel
		var widthInNm = (wid * 0.6) / this.horizontalScale; // nm


		// Draw vertical speed bug
		ctx.strokeStyle = BUG;
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.setLineDash([20, 5]);

		var newY = - this.feetPerNmBug * widthInNm / feetPerPixel;
		ctx.moveTo(wid * 0.2, planeHeightPixels);
		ctx.lineTo(wid * 0.8, planeHeightPixels + newY);
		ctx.stroke();


		// Draw current vertical path line
		ctx.strokeStyle = GUAGE_FOREGROUND;
		ctx.beginPath();
		ctx.lineWidth = 1;

		var newY = - this.feetPerNm * widthInNm / feetPerPixel;
		ctx.moveTo(wid * 0.2, planeHeightPixels);
		ctx.lineTo(wid * 0.8, planeHeightPixels + newY);
		ctx.stroke();

		// Draw plane image
		if (this.img != null)
		{
			ctx.drawImage(this.img, wid * 0.2 - 30, planeHeightPixels - 10, 30, 10);
		}

		ctx.restore();
	}

	this.drawTerrain = function()
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

		ctx.fillStyle = EARTH;
		var startingX = 0.2 * wid;
		for (var i = 0; i < this.terrain.elevationArr.length; i++)
		{
			var data = this.terrain.elevationArr[i];
			var newX = startingX + (data.distance * this.horizontalScale); // pixels + (nm * pixels / nm)
			var newY = hei - (data.elevation / this.verticalScale);
			var width = data.stepSize * this.horizontalScale; // nm * pixels / nm
			var height = (data.elevation / this.verticalScale); // feet / (feet / pixels)
			ctx.fillRect(newX, newY, width, height);
			// console.log(newX, newY);
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
		this.img.src = "img/Plane_icon.png";
	}
	this.loadImage();
}

function arraysEqual(a, b) 
{
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.

	for (var i = 0; i < a.length; ++i) 
	{
		if (a[i] !== b[i]) return false;
	}
	return true;
}