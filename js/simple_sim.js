const pi = 3.14159;
function deg2rad(deg)
{
	return deg * pi / 180;
}
function rad2deg(rad)
{
	return rad * 180 / pi;
}
function fps2fpm(sec)
{
	return sec * 60;
}

function FlightSim()
{
	var self = this;

	self.data = {
		airspeed: 46.197176,
		latitude: -121.516602,
		longitude: 0,
		trueCourse: 0,
		heading: 180,
		headingBug: 200,
		groundSpeed: 100, 
		airspeedBug: 100,	
		altitude: 5000,
		altitudeBug: 5000,		
		verticalSpeed: 0,
		verticalSpeedBug: 1000,		
		bankAngle: 0,
		pitchAngle: 0,
		turnCoordinationAngle: 0,
		terrainAhead: 0,
	}

	// Variables 
	self.x = 0; // Horizontal position
	self.y = 1000; // Vertical position (altitude)

	self.V_a = 180; // Airspeed (knots)
	self.V_x = 180; // Horizontal velocity (knots)
	self.V_y = 0; // Vertical velocity (Feet per second)

	self.A_x = 0; // Horizontal acceleration (Feet per second^2)
	self.A_y = 0; // Vertical acceleration (Feet per second^2)

	self.theta_a = 0; // Angle of attack (Degrees)
	self.omega_a = 0; // Pitch angular velocity (Degrees per second)
	self.alpha_a = 0; // Pitch acceleration  (Degrees per second^2)

	self.theta_r = 0; // Roll angle (degrees)
	self.omega_r = 0; // Roll angular velocity (degrees per second)
	self.alpha_r = 0; // Roll angular acceleration (degrees per second^2)

	// Calibration scalars
	self.C_T = 1.5; // Throttle force scalar
	self.C_D = 0.0000001; // Drag force scalar
	self.C_L = 0.000005; // Lift function
	self.C_E = 0.1; // Elevator torque scalar

	self.C_PD = 1; // Pitch dampening scalar
	self.C_VD = 1; // Vertical dampening scalar

	self.C_A = 20; // Alerion torque scalar
	self.C_AD = 1; // Roll dampening scalar
	self.C_theta_rTD = 0.05;

	self.C_theta_aD = 0.01; // Pitch angle dampening scalar
	self.C_theta_rD = 0.01; // Roll angle dampening scalar

	self.G = 0.1; // Gravitational force (mg)

	// Inputs
	self.I_t = 1; // Throttle input (0 to 1)
	self.I_a = 0; // Alerion input (-1 to 1)
	self.I_e = 0; // Elevator input (-1, to 1)

	self.setControls = function(elevator, alerion, throttle)
	{
		self.I_e = elevator;
		self.I_a = alerion;
		self.I_t = throttle;
	}

	// Updates the simulation (dt in seconds)
	self.update = function(dt)
	{
		// Update pitch angle acceleration, velocity, and position
		self.alpha_a = self.C_E * self.I_e * self.V_a - self.C_PD * self.omega_a;
		self.omega_a += self.alpha_a * dt - self.C_theta_aD * self.theta_a;
		self.theta_a += self.omega_a * dt;

		// Update roll angle acceleration, velocity, and position
		self.alpha_r = self.C_A * self.I_a - self.C_AD * self.omega_r - self.C_theta_rTD * self.theta_r;
		self.omega_r += self.alpha_r * dt;
		self.theta_r += self.omega_r * dt;

		// Update vertical and horizontal acceleration
		self.A_x = self.C_T * self.I_t - self.C_D * self.theta_a * self.V_a;
		self.A_y = self.C_L * self.theta_a * Math.pow(self.V_a, 2) - self.G - self.C_VD * self.V_y;

		// Update vertical and horizontal velocity
		self.V_a += self.A_x * dt;
		self.V_y += self.A_y * dt;
		// self.V_y = Math.sin(deg2rad(self.theta_a)) * self.V_a; // self.A_y * dt;
		self.V_x = Math.cos(deg2rad(self.theta_a)) * self.V_a;

		// Update vertical and horizontal position
		self.y += self.V_y * dt;
		self.x += self.V_x * dt;

		self.transferData();
	}

	self.transferData = function()
	{
		self.data.altitude = self.y;
		self.data.verticalSpeed = fps2fpm(self.V_y);
		self.data.trueCourse = 0;
		self.data.heading = 0;
		self.data.groundSpeed = self.V_x;
		self.data.airspeed = self.V_a;
		self.data.pitchAngle = self.theta_a;
		self.data.bankAngle = self.theta_r;

		self.data.latitude = 46.197176;
		self.data.longitude = -121.516602;
	}
}