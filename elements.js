function drawTickerDigit(list, value, scrollThreshold, digitSpacing, location, fontSize)
{
	var x = location.x;
	var y = location.y;
	var wid = location.width;
	var hei = location.height;

	ctx.save();
	ctx.rect(x, y, wid, hei);
	ctx.clip();

	ctx.fillStyle = GUAGE_BACKGROUND;
	ctx.fillRect(x, y, wid, hei);

	ctx.font = fontSize + "px 'Arial', Gadget, sans-serif";
	ctx.fillStyle = GUAGE_FOREGROUND;
	ctx.textAlign = "center"
	ctx.textBaseline = 'middle';
	size = ctx.measureText("00");

	var index = Math.floor(value + 0.5);
	var length = list.length;
	var progress = value - Math.floor(value)
	var valueOffset = Math.floor(value);
	if (progress > 1 - scrollThreshold)
	{
		var ratio = (progress - (1 - scrollThreshold)) / scrollThreshold
		valueOffset = Math.floor(value) + ratio
	}

	for (var i = index - 2; i <= index + 2; i++)
	{
		I = i % length
		var xLoc = x + wid / 2;
		var yLoc = y + hei / 2;
		var offset = - (fontSize + digitSpacing) * (i - valueOffset);
		if (I > -1)
		{
			ctx.fillText(list[I], xLoc, yLoc + offset);
		}
	}

	var fullSize = fontSize + digitSpacing
	// ctx.fillStyle = BACKGROUND;
	// ctx.fillRect(x, y - hei - 2 * fullSize, wid, hei + 2 * fullSize);
	// ctx.fillRect(x, y + hei, wid, hei + fullSize);
	ctx.restore();
}

// Scale in pixels per small tick
function drawTape(location, fontSize, leftAlign, bigTicks, smallTicks, scale, value)
{
	var x = location.x;
	var y = location.y;
	var wid = location.width;
	var hei = location.height;
	ctx.save();
	ctx.rect(x, y, wid, hei);
	ctx.clip();
	
	var numberToDraw = Math.floor(hei / scale + 0.5);

	ctx.fillStyle = GUAGE_BACKGROUND
	ctx.fillRect(x, y, wid, hei)

	ctx.fillStyle = GUAGE_FOREGROUND;
	ctx.font = fontSize + "px Arial"
	ctx.textAlign = "center";
	ctx.textBaseline = "middle"; 
	for (var i = -numberToDraw; i < numberToDraw; i++)
	{
		var relValue = Math.floor((value - smallTicks * - i) / smallTicks) * smallTicks
		var diff = (value - relValue) / smallTicks;
		var newY = (y + hei / 2) + scale * (diff);
		if (newY + fontSize > y && newY - fontSize < y + hei)
		{
			if (relValue % bigTicks == 0)
			{
				ctx.font = (fontSize * 1.5) + "px Arial"
				ctx.fillRect(x, newY - 1.5 * fontSize / 2 - 3, wid, 1)
				ctx.fillRect(x, newY + 1.5 * fontSize / 2, wid, 1)
				ctx.fillText(relValue, x + wid / 2, newY)
				ctx.font = fontSize + "px Arial"
			}
			else if (relValue % smallTicks == 0)
			{
				if (leftAlign)
				{
					var textWidth = ctx.measureText(relValue).width;
					ctx.fillRect(x, newY, wid/2 - 15, 1)
					ctx.fillText(relValue, x + wid - textWidth/2 - 5, newY)
				}
				else
				{
					var textWidth = ctx.measureText(relValue).width;
					ctx.fillRect(x + wid/2 + 15, newY, wid/2 - 15, 1)
					ctx.fillText(relValue, x + textWidth/2 + 5, newY)
				}
			}
		}
	}

	ctx.restore();
	// ctx.fillStyle = BACKGROUND;
	// ctx.fillRect(x, y - 2 * fontSize, wid, 2 * fontSize);
	// ctx.fillRect(x, y + hei, wid, 2 * fontSize);
}