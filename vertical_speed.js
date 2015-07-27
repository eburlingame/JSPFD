
function VerticalSpeedIndicator(ctx, location, data)
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
		this.drawBackground(this.data.verticalSpeed);
	}

	this.drawBackground = function drawTickerDigit(verticalSpeed)
	{
		var x = this.loc.x;
		var y = this.loc.y;
		var wid = this.loc.width;
		var hei = this.loc.height;
		var ctx = this.ctx;

		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = GUAGE_BACKGROUND;
		ctx.fillRect(0, 0, wid / 4, hei);

		for (var i = -2000; i <= 2000; i++)
		{

		}
		
		ctx.restore();
	}
}