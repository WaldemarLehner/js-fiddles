let x = 0.0;
let y = 0.0;
let z = 0.0;
let dVal = 1; //val / sec
let dValNeg = 2; //val / sec
let dValReturn = 1.5; //val/sec
let t0 = Date.now();
let t1 = Date.now()+1;
let dTime = t1-t0;

let isPressed = {
	up: false,
	down: false,
	left: false,
	right: false,
	front: false,
	back: false
};
let keyCodes = {
	up: 82,
	down: 70,
	left: 65,
	right: 68,
	front: 87,
	back: 83
};



$("html").on("keydown",function(e){
	switch(e.which){
		case keyCodes.up:
			isPressed.up = true; break;
		case keyCodes.down:
			isPressed.down = true; break;
		case keyCodes.left:
			isPressed.left = true; break;
		case keyCodes.right:
			isPressed.right = true; break;
		case keyCodes.front:
			isPressed.front = true; break;
		case keyCodes.back:
			isPressed.back = true; break;
	}
});
$("html").on("keyup",function(e){
	switch(e.which){
		case keyCodes.up:
			isPressed.up = false; break;
		case keyCodes.down:
			isPressed.down = false; break;
		case keyCodes.left:
			isPressed.left = false; break;
		case keyCodes.right:
			isPressed.right = false; break;
		case keyCodes.front:
			isPressed.front = false; break;
		case keyCodes.back:
			isPressed.back = false; break;
	}
});

function update(){
	t0 = t1;
	t1 = Date.now();
	dTime = t1-t0;
	console.log(dTime);
	x = calculateMovementVar(x,isPressed.left,isPressed.right);
	y = calculateMovementVar(y,isPressed.down,isPressed.up);
	z = calculateMovementVar(z,isPressed.back,isPressed.front);


	requestAnimationFrame( update );
	drawValues();
}
update();
function drawValues(){
	//XZ Area
	let xz_ctx = {
		height:$("#visualisation_x_z").height(),
		width:$("#visualisation_x_z").width(),
		radius: $("#dot_x_z").width()/2
	};
	//Y
	let y_ctx = {
		height: $("#visualisation_y").height(),
		radius: $("#dot_y").height()/2
	};
	//translate [-1|1] to [0|1]
	let tX = (x+1)/2;
	let tY = (y+1)/2;
	let tZ = (z+1)/2;

	let posX = ((xz_ctx.width-xz_ctx.radius*2)*tX);
	let posY = ((y_ctx.height-y_ctx.radius*2)*(1-tY));
	let posZ = ((xz_ctx.height-xz_ctx.radius*2)*(1-tZ));
	$("#dot_x_z").css("margin-left",posX+"px");
	$("#dot_y").css("margin-top",posY+"px");
	$("#dot_x_z").css("margin-top",posZ+"px");
}
function calculateMovementVar(variable,isNegative,isPositive){
	let v = variable;
	let n = isNegative;
	let p = isPositive;
	if(!((!n&&!p)||(n&&p))){
		//+x → right
		//-x → left
		if(p){
			if(v===0 || v > 0){
				v += dVal/1000*dTime;
				if(v > 1){
					v = 1;
				}
			}else{
				v += dValNeg/1000*dTime;
				if(v > 1){
					v = 1;
				}
			}
		}else if(n){
			if(v===0 || v < 0){
				v -= dVal/1000*dTime;
				if(v < -1){
					v = -1;
				}
			}else{
				v -= dValNeg/1000*dTime;
				if(v < -1){
					v = -1;
				}
			}
		}
	}else{
		if(v !== 0){
			if(v > 0){
				v -= dValReturn/1000*dTime;
				if(v < 0){
					v = 0;
				}
			}else{
				v += dValReturn/1000*dTime;
				if(v > 0){
					v = 0;
				}
			}
		}
	}
	return v;
}
