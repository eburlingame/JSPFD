function MCPSim()
{
	var self = this;

	self.memory = {
		courseL: 0,
		courseR: 0,
		ias: 100,
		mach: 0.8,
		heading: 000,
		altitude: 1000,
		vert_speed: 1000,
		speed_type: false,
		at_eng: false,
		lvl_chg_eng: false,
		altitude_hold: false,
		heading_sel_eng: false,
		L_nav_eng: false,
		V_nav_eng: false,
		vor_loc_eng: false,
		app_eng: false,
		vs_eng: false,
		cmd_a_eng: false,
		cmd_b_eng: false,
		cws_a_eng: false,
		cws_b_eng: false,
		fd_L_eng: false,
		fd_R_eng: false
	};

	self.courseLScroll = function(indexes)
	{
		self.memory.courseL = (self.memory.courseL + indexes * 5) % 360;
		if (self.memory.courseL < 0)
			self.memory.courseL += 360;
		self.panel.render();
	}

	self.courseRScroll = function(indexes)
	{
		self.memory.courseR = (self.memory.courseR + indexes * 5) % 360;
		if (self.memory.courseR < 0)
			self.memory.courseR += 360;
		self.panel.render();
	}

	self.speed_scroll = function(indexes)
	{
		self.memory.ias += indexes;
		if (self.memory.ias < 0)
			self.memory.ias = 0;
		self.panel.render();
	}

	self.headingScroll = function(indexes)
	{
		self.memory.heading = (self.memory.heading + indexes * 5) % 360;
		if (self.memory.heading < 0)
			self.memory.heading += 360;
		self.panel.render();
	}

	self.altitudeScroll = function(indexes)
	{
		self.memory.altitude += indexes * 100;
		if (self.memory.altitude < 0)
			self.memory.altitude += 360;
		self.memory.altitude_hold = false;
		self.panel.render();
	}

	self.vsScroll = function(indexes)
	{
		self.memory.vert_speed += indexes * 100;
		self.panel.render();
	}

	// Speed 
	self.n1_eng = function()
	{
		if (!self.memory.at_arm)
			return;
		self.memory.speed_type = "n1";
		self.panel.render();
	}

	self.speed_eng = function()
	{
		if (!self.memory.at_arm)
			return;
		self.memory.speed_type = "speed";
		self.panel.render();
	}

	self.lvl_chg_eng = function()
	{
		if (!self.memory.at_arm)
			return;
		self.memory.speed_type = "lvl_chg";
		self.panel.render();
	}

	self.at_arm = function(on)
	{
		self.memory.at_arm = on;
		if (!on)
			self.memory.speed_type = false;
		self.panel.render();
	}


	self.alt_eng = function()
	{
		self.memory.vs_eng = false;
		self.memory.altitude_hold = true;
		self.panel.render();
	}

	self.vs_eng = function()
	{
		self.memory.altitude_hold = false;
		self.memory.vs_eng = true;
		self.panel.render();
	}

	self.hdg_sel_eng = function()
	{
		self.memory.L_nav_eng = false;
		self.memory.vor_loc_eng = false;
		self.memory.heading_sel_eng = true;
		self.panel.render();
	}

	self.l_nav_eng = function()
	{
		self.memory.heading_sel_eng = false;
		self.memory.vor_loc_eng = false;
		self.memory.L_nav_eng = true;
		self.panel.render();
	}

	self.v_nav_eng = function()
	{
		self.memory.speed_type = false;
		self.memory.V_nav_eng = true;
		self.panel.render();
	}

	self.vor_loc_eng = function()
	{
		self.memory.heading_sel_eng = false;
		self.memory.L_nav_eng = false;
		self.memory.vor_loc_eng = true;
		self.panel.render();
	}

	self.app_eng = function()
	{
		self.memory.app_eng = true;
		self.panel.render();
	}

	self.cmd_a_eng = function()
	{
		self.memory.cmd_a_eng = true;
		self.panel.render();
	}

	self.cmd_b_eng = function()
	{
		self.memory.cmd_b_eng = true;
		self.panel.render();
	}

	self.cws_a_eng = function()
	{
		self.memory.cws_a_eng = true;
		self.panel.render();
	}

	self.cws_b_eng = function()
	{
		self.memory.cws_b_eng = true;
		self.panel.render();
	}

	self.fd_on_R = function(on)
	{
		self.memory.fd_on_L = on; 
	}

	self.fd_on_L = function(on)
	{
		self.memory.fd_on_R = on;
	}

	self.disengage = function(on)
	{
		if (on)
		{
			self.memory.cmd_a_eng = false;
			self.memory.cmd_b_eng = false;
			self.memory.cws_a_eng = false;
			self.memory.cws_b_eng = false;
		}
		self.panel.render();
	}

	self.panel = new MCPPanel(self);
	self.panel.render();
}

function MCPControl(flightdata, mcp)
{
	var self = this;
	self.flight = flightdata;
	self.mcp = mcp;

	self.rollPID = new PIDController(0.15, 0.1, 0.1);
	self.pitch0PID = new PIDController(0.1, 0.1, 0.1);
	self.altHoldPID = new PIDController(0.01, 0.1, 0.01);
	self.VSPID = new PIDController(0.01, 0.1, 0.01);
	self.IASHoldPID = new PIDController(0.1, 0.01, 0.01);

	self.speedMode = "off"; // off, IAS
	self.pitchMode = "off"; // off, vert speed, altitude hold
	self.rollMode = "off"; // off, level

	self.modeSelect = function()
	{
		if (!self.mcp.memory.cmd_a_eng)
		{
			self.speedMode = "off"; // off, IAS
			self.pitchMode = "off"; // off, vert_speed, altitude_hold
			self.rollMode = "off"; // off, level
		}
		else
		{
			// Roll mode select
			self.rollMode = "level";

			// Speed mode select
			if (self.mcp.memory.at_arm && self.mcp.memory.speedMode == "speed")
				self.speedMode = "IAS";

			// Pitch mode select
			if (self.mcp.memory.altitude_hold)
				self.pitchMode = "altitude_hold";
			else if (self.mcp.memory.vs_eng)
				self.pitchMode = "vert_speed";
		}
	}

	self.update = function(delta)
	{
		self.modeSelect();

		self.rollPID.update(delta, self.flight.data.bankAngle, 0);
		self.pitch0PID.update(delta, self.flight.data.pitchAngle, 0);
		self.altHoldPID.update(delta, self.flight.data.altitude, self.mcp.memory.altitude);
		self.VSPID.update(delta, self.flight.data.altitude, self.mcp.memory.vert_speed);
		self.IASHoldPID.update(delta, self.flight.data.vert_speed, self.mcp.memory.ias);

		var alerion = self.rollPID.getControl();
		var elevator = self.pitch0PID.getControl();
		var throttle = 0.5;
		
		if (self.speedMode == "IAS")
			throttle = self.IASHoldPID.getControl();

		if (self.pitchMode == "altitude_hold")
			elevator = self.altHoldPID.getControl();
		else if (self.pitchMode == "vert_speed")
			elevator = self.VSPID.getControl();

		if (self.rollMode == "level")
			alerion = self.rollPID.getControl();

		if (self.mcp.memory.cmd_a_eng || self.mcp.memory.cmd_b_eng)
		{
			self.flight.sim.setControls(elevator, alerion, throttle);
		}
	}
}