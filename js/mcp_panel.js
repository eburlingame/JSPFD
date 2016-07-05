function formatDigits(num, digits)
{
	var str = "" + num;
	while(str.length < digits)
		str = "0" + str;
	return str;
}


function MCPPanel(sim)
{
	var self = this;
	self.sim = sim;
	self.components = {

		// Displays
		courseL: 		new SevenSegmentDisplay(sim, "course_L"),
		courseR: 		new SevenSegmentDisplay(sim, "course_R"),
		iasMach: 		new SevenSegmentDisplay(sim, "ias_mach"),
		heading: 		new SevenSegmentDisplay(sim, "heading"),
		altitude: 		new SevenSegmentDisplay(sim, "altitude"),
		vertSpeed: 		new SevenSegmentDisplay(sim, "vert_speed"),

		// Knobs
		courseLKnob: 	new IndexedKnob(sim, "course_knob_L", sim.courseLScroll),		
		courseRKnob: 	new IndexedKnob(sim, "course_knob_R", sim.courseRScroll), 
		ias_mach_knob: 	new IndexedKnob(sim, "ias_mach_knob", sim.speed_scroll), 
		heading_knob: 	new IndexedKnob(sim, "heading_knob", sim.headingScroll), 
		altitude_knob: 	new IndexedKnob(sim, "altitude_knob", sim.altitudeScroll),
		vert_speed: 	new VerticalScrollKnob(sim, "vs_wheel", sim.vsScroll),

		// Buttons/Switches
		n1_eng: 		new LEDButton(sim, "n1_eng", sim.n1_eng),
		speed_eng: 		new LEDButton(sim, "speed_eng", sim.speed_eng),
		at_arm: 		new ToggleSwitch(sim, "at_arm", sim.at_arm),
		lvl_chg_eng: 	new LEDButton(sim, "lvl_chg_eng", sim.lvl_chg_eng),
		alt_eng: 		new LEDButton(sim, "alt_eng", sim.alt_eng),
		hdg_sel_eng: 	new LEDButton(sim, "hdg_sel_eng", sim.hdg_sel_eng),
		l_nav_eng: 		new LEDButton(sim, "l_nav_eng", sim.l_nav_eng),
		v_nav_eng: 		new LEDButton(sim, "v_nav_eng", sim.v_nav_eng),
		vor_loc_eng: 	new LEDButton(sim, "vor_loc_eng", sim.vor_loc_eng),
		app_eng: 		new LEDButton(sim, "app_eng", sim.app_eng),
		vs_eng: 		new LEDButton(sim, "vs_eng", sim.vs_eng),
		cmd_a_eng: 		new LEDButton(sim, "cmd_a_eng", sim.cmd_a_eng),
		cmd_b_eng: 		new LEDButton(sim, "cmd_b_eng", sim.cmd_b_eng),
		cws_a_eng: 		new LEDButton(sim, "cws_a_eng", sim.cws_a_eng),
		cws_b_eng: 		new LEDButton(sim, "cws_b_eng", sim.cws_b_eng),
		fd_on_R: 		new ToggleSwitch(sim, "fd_on_R", sim.fd_on_R),
		fd_on_L: 		new ToggleSwitch(sim, "fd_on_L", sim.fd_on_L),
		diseng_switch:	new ToggleSwitch(sim, "diseng_switch", sim.disengage),
	};

	self.render = function()
	{
		self.renderDisplays();
		self.renderSpeedButtons();
		self.renderLVNav();

		for (var name in self.components)
		{
			self.components[name].render();
		}
	}

	self.renderDisplays = function()
	{
		self.components.courseL.val = formatDigits(self.sim.memory.courseL, 3);
		self.components.courseR.val = formatDigits(self.sim.memory.courseR, 3);
		self.components.iasMach.val = self.sim.memory.ias;
		self.components.heading.val = formatDigits(self.sim.memory.heading, 3);
		self.components.altitude.val = self.sim.memory.altitude;
		self.components.vertSpeed.val = self.sim.memory.vert_speed;
	}

	self.renderSpeedButtons = function()
	{
		self.components.at_arm.on = self.sim.memory.at_arm;
		self.components.n1_eng.illuminated = false;
		self.components.speed_eng.illuminated = false;
		self.components.lvl_chg_eng.illuminated = false;

		if (self.sim.memory.speed_type == "n1")
			self.components.n1_eng.illuminated = true;
		else if (self.sim.memory.speed_type == "speed")
			self.components.speed_eng.illuminated = true;
		else if (self.sim.memory.speed_type == "lvl_chg")
			self.components.lvl_chg_eng.illuminated = true;
	}

	self.renderLVNav = function()
	{
		self.components.l_nav_eng.illuminated = self.sim.memory.L_nav_eng;
		self.components.v_nav_eng.illuminated = self.sim.memory.V_nav_eng;
		self.components.hdg_sel_eng.illuminated = self.sim.memory.heading_sel_eng;
		self.components.alt_eng.illuminated = self.sim.memory.altitude_hold;
		self.components.app_eng.illuminated = self.sim.memory.app_eng;
		self.components.vor_loc_eng.illuminated = self.sim.memory.vor_loc_eng;
		self.components.vs_eng.illuminated = self.sim.memory.vs_eng;

		self.components.cmd_a_eng.illuminated = self.sim.memory.cmd_a_eng;
		self.components.cmd_b_eng.illuminated = self.sim.memory.cmd_b_eng;
		self.components.cws_a_eng.illuminated = self.sim.memory.cws_a_eng;
		self.components.cws_b_eng.illuminated = self.sim.memory.cws_b_eng;
	}
}
