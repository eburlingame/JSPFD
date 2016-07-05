
function LEDButton(sim, domID, clickCallback)
{
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.illuminated = false;
	self.clickCallback = clickCallback;

	self.click = function(event)
	{
		self.clickCallback.call();
	}
	$(self.q).on("click", self.click);

	self.render = function()
	{
		if (self.illuminated)
			$(self.q).addClass("on");
		else
			$(self.q).removeClass("on");
	}
}

function ToggleSwitch(sim, domID, clickCallback)
{
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.on = false;
	self.clickCallback = clickCallback;

	self.click = function(event)
	{
		self.on = ! self.on;
		self.render();
		self.clickCallback.call(null, self.on);
	}
	$(self.q).on("click", self.click);

	self.render = function()
	{
		if (self.on)
			$(self.q).addClass("on");
		else
			$(self.q).removeClass("on");
	}
}

function IndexedKnob(sim, domID, scrollCallback)
{
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.rot = 0;
	self.scrollCallback = scrollCallback;

	self.scroll = function(event)
	{
		var indexes = event.originalEvent.wheelDelta / 120;
		self.rot += indexes * 5;
		self.render();
		self.scrollCallback.call(null, indexes);
	}
	$(self.q).on("mousewheel", self.scroll);

	self.render = function()
	{
		$(self.q).css("transform", "rotate(" + self.rot + "deg)");
	}
}

function VerticalScrollKnob(sim, domID, scrollCallback)
{
	var self = this;
	self.sim = sim;
	self.domID = domID;
	self.q = "#" + self.domID;
	self.turnt = false;
	self.scrollCallback = scrollCallback;

	self.click = function(event)
	{
		self.turnt = ! self.turnt;
		self.render();
		var indexes = event.originalEvent.wheelDelta / 120;
		self.scrollCallback.call(null, indexes);
	}
	$(self.q).on("mousewheel", self.click);

	self.render = function()
	{
		if (self.turnt)
			$(self.q).addClass("turnt");
		else
			$(self.q).removeClass("turnt");
	}
}

function SevenSegmentDisplay(sim, domID)
{
	var self = this;
	self.val = "0";
	self.domID = domID;
	self.q = "#" + self.domID;

	self.render = function()
	{
		$(self.q).text(self.val);
	}
}