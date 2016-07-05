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