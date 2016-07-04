function formatNumberLength(num, length) 
{
  var r = "" + num;
  while (r.length < length) {
      r = "0" + r;
  }
  return r;
}

function ToggleButton(domId, dataId)
{
	var self = this;
	self.engaged = false;
	self.q = "#" + domId;
	self.dataId = dataId;

	self.click = function(event)
	{
		self.engaged = ! self.engaged;

		self.render();
	}
	$(self.q).on("click", self.click);

	self.render = function()
	{
		if (self.engaged)
			$(self.q).addClass("on");
		else
			$(self.q).removeClass("on");
	}
}

function Panel()
{
	var self = this;
	self.data = {
		courseL: 0,
		courseR: 0,
		ias: 0,
		mach: 0,
		heading: 100,
		altitude: 1000,
		altitude_hold: 0,
		vert_speed: 0,
		n1_eng: 0,
		speed_eng: 0,
		at_eng: 0,
		lvl_chg_eng: 0,
		heading_sel_eng: 0,
		L_nav_eng: 0,
		V_nav_eng: 0,
		vor_loc_eng: 0,
		app_eng: 0,
		alt_hold_eng: 0,
		vs_eng: 0,
		cmd_a_eng: 0,
		cmd_b_eng: 0,
		cws_a_eng: 0,
		cws_b_eng: 0,
		fd_L_eng: 0,
		fd_R_eng: 0,
	};

	self.buttons = [
		new ToggleButton("n1_eng", "n1_eng"),
		new ToggleButton("speed_eng", "speed_eng"),
		new ToggleButton("at_eng", "at_eng"),
		new ToggleButton("lvl_chg_eng", "lvl_chg_eng"),
		new ToggleButton("hdg_sel_eng", "heading_sel_eng"),
		new ToggleButton("l_nav_eng", "L_nav_eng"),
		new ToggleButton("v_nav_eng", "V_nav_eng"),
		new ToggleButton("vs_eng", "vs_eng"),
		new ToggleButton("app_eng", "app_eng"),
		new ToggleButton("vor_loc_eng", "vor_loc_eng"),
		new ToggleButton("alt_eng", "alt_hold_eng"),
		new ToggleButton("cmd_a_eng", "cmd_a_eng"),
		new ToggleButton("cmd_b_eng", "cmd_b_eng"),
		new ToggleButton("cws_a_eng", "cws_a_eng"),
		new ToggleButton("cws_b_eng", "cws_b_eng"),
		new ToggleButton("fd_on_L", "fd_L_eng"),
		new ToggleButton("fd_on_R", "fd_R_eng"),
	];

	self.courseLScroll = function(event)
	{
	    var dir = event.originalEvent.wheelDelta / 120 * 5;
	    self.data.courseL = (self.data.courseL + dir) % 360;
	    if (self.data.courseL < 0)
	    	self.data.courseL += 360;

	    var rot = self.data.courseL;
	    $("#course_knob_L").css("transform", "rotate(" + rot + "deg)");
	    var txt = formatNumberLength(self.data.courseL, 3);
	    $("#course_L").text(txt);
	}
	$("#course_knob_L").on("mousewheel", self.courseLScroll);

	self.courseRScroll = function(event)
	{
	    var dir = event.originalEvent.wheelDelta / 120 * 5;
	    self.data.courseR = (self.data.courseR + dir) % 360;
	    if (self.data.courseR < 0)
	    	self.data.courseR += 360;

	    var rot = self.data.courseR;
	    $("#course_knob_R").css("transform", "rotate(" + rot + "deg)");
	    var txt = formatNumberLength(self.data.courseR, 3);
	    $("#course_R").text(txt);
	}
	$("#course_knob_R").on("mousewheel", self.courseRScroll);

	self.headingScroll = function(event)
	{
	    var dir = event.originalEvent.wheelDelta / 120 * 5;
	    self.data.heading = (self.data.heading + dir) % 360;
	    if (self.data.heading < 0)
	    	self.data.heading += 360;

	    var rot = self.data.heading;
	    $("#heading_knob").css("transform", "rotate(" + rot + "deg)");
	    var txt = formatNumberLength(self.data.heading, 3);
	    $("#heading").text(txt);
	}
	$("#heading_knob").on("mousewheel", self.headingScroll);

	self.iasMachScroll = function(event)
	{
	    var dir = event.originalEvent.wheelDelta / 120 * 1;
	    self.data.ias = (self.data.ias + dir);
	    if (self.data.ias < 0)
	    	self.data.ias = 0;

	    var rot = self.data.ias;
	    $("#ias_mach_knob").css("transform", "rotate(" + rot + "deg)");
	    var txt = formatNumberLength(self.data.ias, 3);
	    $("#ias_mach").text(txt);
	};
	$("#ias_mach_knob").on("mousewheel", self.iasMachScroll);

	self.altitudeScroll = function(event)
	{
	    var dir = event.originalEvent.wheelDelta / 120 * 100;
	    self.data.altitude = (self.data.altitude + dir);
	    if (self.data.altitude < 0)
	    	self.data.altitude = 0;

	    var rot = self.data.altitude;
	    $("#altitude_knob").css("transform", "rotate(" + rot + "deg)");
	    var txt = formatNumberLength(self.data.altitude, 3);
	    $("#altitude").text(txt);
	};
	$("#altitude_knob").on("mousewheel", self.altitudeScroll);

	self.vsScroll = function(event)
	{
		var dir = event.originalEvent.wheelDelta / 120 * 100;
		console.log(dir);
		self.data.vert_speed += dir;
		$("#vs_wheel").toggleClass("turnt");
		var txt = self.data.vert_speed;
		// if (self.data.vert_speed > 0)
		// 	txt = "+" + txt;
		$("#vert_speed").text(txt);
	}
	$("#vs_wheel").on("mousewheel", self.vsScroll);

	self.atArm = function(event)
	{
		self.data.at_eng = !self.data.at_eng;
		if (self.data.at_eng)
		  $("#at_arm").addClass("on");
		else
		  $("#at_arm").removeClass("on");
	}
	$("#at_arm").on("click", self.atArm);
}