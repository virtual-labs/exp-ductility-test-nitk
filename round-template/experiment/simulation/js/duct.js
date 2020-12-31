var p=Math.floor(Math.random()*(9));
var screensVal = 0;
var tries = 0;
var repeat = 0;
var sum = 0;
var trial1 = 0,trial2 = 0;
trial1 = p;
var avgDuct = 0;
var qCount = 0;
//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}



$(function()
{
	$('input').on('input', function() {
		this.value = this.value.match(/\d*(\.\d*)?/)[0];
	});
});
function navNext()
{
	for(temp=0;temp<=5;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(300,420,180);
		document.getElementById("can1-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-1").onclick="";
			document.getElementById("can1-1").src = "images/bunsenon.png";
			document.getElementById("bitSample").style.visibility = "visible";
			document.getElementById("bitSample").style.animation = "blink_effect 1s 1 ease"
			document.getElementById("can1-2").style.visibility = "visible";
			setTimeout(function()
			{
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(175,315,180);
				document.getElementById("can1-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-2").onclick="";
					document.getElementById("can1-2").style.visibility = "hidden";
					document.getElementById("can1-3").style.visibility = "visible";
					document.getElementById("can1-3").style.animation = "bitMove 1s forwards";
					setTimeout(function()
					{
						document.getElementById("bitSample").style.visibility = "hidden";
						document.getElementById("can1-4").style.visibility = "visible";
						document.getElementById("can1-4").style.animation = "thermoMove 0.5s forwards";
						setTimeout(function()
						{
							document.getElementById("can1-4").src = "images/thermocut.png";
							document.getElementById("can1-5").style.visibility = "visible";
							document.getElementById("can1-6").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can1-6").style.animation = "thermoZoomMove 1s forwards";
								var q1 = Object.create(questions);
								generateQuestion(q1,"Pouring temperature of bitumen material is: ","","50&deg;C","27&deg;C","90&deg;C","95&deg;C",3,pourBitumenIntoMould,450,300,250,150);
								// setTimeout(function(){
									// setDialog("Pouring temperature of S-90 grade bituminous material is 90<sup>0</sup>C",480,300,120,220);
								// },1100);
							},800);
						},500);
					},1200);
				}
			},500);
		}	
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can1-8b").style.visibility = "hidden";
		document.getElementById("can1-8c").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(150,290,-90);
		document.getElementById("can2-1a").onclick=function()
		{
			myStopFunction();
			document.getElementById("can2-1a").onclick="";
			document.getElementById("can2-1a").style.animation = "bit1Move 2.5s forwards";
			setTimeout(function(){
				document.getElementById("can2-1a").style.visibility = "hidden";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(300,290,-90);
				document.getElementById("can2-1b").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-1b").onclick="";
					document.getElementById("can2-1b").style.animation = "bit2Move 2.5s forwards";
					setTimeout(function(){
						document.getElementById("can2-1b").style.visibility = "hidden";
						screensVal = 1;
						setDialog("After half an hour, remove the sample and mould assembly from the water bath. Trim the specimen by leveling the surface using a hot knife. Replace the mould assembly in water bath for 85 to 95 minutes.",30,200,140,340);
					},2600);
				}
			},2600);
		}
	}
	
	else if(simsubscreennum==3)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden";
		document.getElementById("r").disabled  = false;
		screensVal = 3;
		if(repeat == 1)
		{
			do{
				p=Math.floor(Math.random()*(2));
				trial2 = p;
			}while(p == trial1);
			document.getElementById("canvas5").style.visibility = "hidden";
			document.getElementById("can5-0").style.visibility = "hidden";
			document.getElementById("can5-0a").style.visibility = "hidden";
			document.getElementById("can5-0b").style.visibility = "hidden";
			document.getElementById("can5-0c").style.visibility = "hidden";
			document.getElementById("can5-0d").style.visibility = "hidden";
			document.getElementById("can5-0e").style.visibility = "hidden";
			document.getElementById("can5-1").style.visibility = "hidden";
			document.getElementById("can5-1a").style.visibility = "hidden";
			document.getElementById("can5-6").style.visibility = "hidden";
			document.getElementById("can5-7").style.visibility = "hidden";
			document.getElementById("can5-2").style.visibility = "hidden";
			document.getElementById("can5-7a").style.visibility = "hidden";
			document.getElementById("can5-2a").style.visibility = "hidden";
			document.getElementById("can5-4").style.visibility = "hidden";
			document.getElementById("can5-3").style.visibility = "hidden";
			document.getElementById("can3-1").style.visibility = "visible";
			document.getElementById("can3-2").style.visibility = "visible";
			document.getElementById("can3-3").style.visibility = "visible";
			document.getElementById("can3-4").style.visibility = "visible";
			document.getElementById("r").style.visibility = "visible";
			document.getElementById("v3-1").style.visibility = "visible";
			document.getElementById("v3-1").innerHTML = "Pointer is not set to zero";
		}
		document.getElementById('trial').style="visibility:visible ;left: 650px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " + (repeat+1);	
		var macPos = document.getElementById("can3-2");
		macPos.addEventListener("transitionend",function(){
			checkPosition();
		});
		
	}
	else if(simsubscreennum==4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can3-1").style.visibility = "hidden";
		document.getElementById("can3-2").style.visibility = "hidden";
		document.getElementById("can3-3").style.visibility = "hidden";
		document.getElementById("can3-4").style.visibility = "hidden";
		document.getElementById("r").style.visibility = "hidden";
		document.getElementById("v3-1").style.visibility = "hidden";
		if(repeat == 0)
		{
			var q3 = Object.create(questions);
			generateQuestion(q3,"The brass plate and mould is placed in the water bath and it is kept at the specified temperature for about __________ minutes. ","","5 to 7","10 to 12","20 to 25","85 to 95",4,scree4Proceed,250,120,300,150);
		}
		else if(repeat == 1)
		{
			document.getElementById("can4-1").style.visibility = "visible";
			document.getElementById("can4-2").style.visibility = "visible";
			document.getElementById("can4-3").style.visibility = "visible";
			document.getElementById("can4-4").style.visibility = "visible";
			document.getElementById("can4-4").style.visibility = "visible";
			document.getElementById("can4-5b").style.visibility = "visible";
			document.getElementById("v4-1").style.visibility = "visible";
			document.getElementById("can4-7c").src = "images/sc2.png";
			document.getElementById("can4-7d").src = "images/sc2.png";
			document.getElementById("can4-5b").style.transformOrigin = "";
			document.getElementById("can4-5b").style.animation = "";
			document.getElementById("can4-6a").style.transformOrigin = "";
			document.getElementById("can4-6a").style.animation = "";
			document.getElementById("can4-6b").style.transformOrigin = "";
			document.getElementById("can4-6b").style.animation = "";
			document.getElementById("can4-7c").style.transformOrigin = "";
			document.getElementById("can4-7c").style.animation = "";
			document.getElementById("can4-7d").style.transformOrigin = "";
			document.getElementById("can4-7d").style.animation = "";

			document.getElementById("can4-5b").style.visibility = "visible";
			document.getElementById("v4-1").style.visibility = "visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(150,150,-90);
		document.getElementById("can4-5b").onclick=function()
		{
			myStopFunction();
			document.getElementById("can4-5b").onclick="";
			document.getElementById("v4-1").style.visibility = "hidden";
			document.getElementById("can4-5b").style.animation = "bitMouldMove 2.5s forwards";
			setTimeout(function(){
				document.getElementById("can4-5b").style.visibility = "hidden";
				document.getElementById("can4-5").style.visibility = "visible";
				document.getElementById("can4-6a").style.visibility = "visible";
				document.getElementById("can4-6b").style.visibility = "visible";
				document.getElementById("can4-7c").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(110,210,-90);
				document.getElementById("can4-7c").onclick=function()
				{
					myStopFunction();
					document.getElementById("can4-7c").onclick="";
					document.getElementById("can4-7c").style.animation = "sc2Move 2.5s forwards";
					setTimeout(function(){
						document.getElementById("can4-7c").src = "images/sc1.png";
						setTimeout(function(){
							document.getElementById("can4-7c").style.visibility = "hidden";
							document.getElementById("can4-7a").style.visibility = "visible";
							document.getElementById("can4-7d").style.visibility = "visible";
							myInt = setInterval(function(){ animatearrow(); }, 500);
							animateArrowATPosition(190,210,-90);
							document.getElementById("can4-7d").onclick=function()
							{
								myStopFunction();
								document.getElementById("can4-7d").onclick="";
								document.getElementById("can4-7d").style.animation = "sc1Move 2.5s forwards";
								setTimeout(function(){
									document.getElementById("can4-7d").src = "images/sc1.png";
									setTimeout(function(){
										document.getElementById("can4-7d").style.visibility = "hidden";
										document.getElementById("can4-7b").style.visibility = "visible";
										myInt = setInterval(function(){ animatearrow(); }, 500);
										animateArrowATPosition(150,320,-90);
										document.getElementById("canvas4").onclick=function(event)
										{
											if(event.pageX>=151 && event.pageX<= 181 && event.pageY>=352 && event.pageY<= 365)
											{
												myStopFunction();
												document.getElementById("canvas4").onclick="";
												document.getElementById("can4-6a").style.animation = "clip1Move 0.8s forwards";
												setTimeout(function(){
													document.getElementById("can4-6a").style.visibility = "hidden";
													animateArrowATPosition(150,390,90);
													document.getElementById("canvas4").onclick=function(event)
													{
														if(event.pageX>=151 && event.pageX<= 181 && event.pageY>=374 && event.pageY<= 388)
														{
															myStopFunction();
															document.getElementById("canvas4").onclick="";
															document.getElementById("can4-6b").style.animation = "clip2Move 0.8s forwards";
															setTimeout(function(){
																document.getElementById("can4-6b").style.visibility = "hidden";
																document.getElementById("nextButton").style.visibility = "visible";
															},800);
														}
													}
												},800);
											}
										}
									},2500);
								},700);
							}
						},2000);
					},1000);
				}
			},2500);
		}
		}
		
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can4-1").style.visibility = "hidden";
		document.getElementById("can4-2").style.visibility = "hidden";
		document.getElementById("can4-5").style.visibility = "hidden";
		document.getElementById("can4-7a").style.visibility = "hidden";
		document.getElementById("can4-7b").style.visibility = "hidden";
		document.getElementById("can4-4").style.visibility = "hidden";
		document.getElementById("can4-3").style.visibility = "hidden";
		if(repeat == 1)
		{
			document.getElementById("can5-0b").src = "images/switchUp.png";
			document.getElementById("can5-0a").style.visibility = "visible";
			document.getElementById("can5-0b").style.visibility = "visible";
			document.getElementById("can5-0c").src = "images/switchUp.png";
			document.getElementById("can5-0c").style.visibility = "visible";
			document.getElementById("can5-0d").src = "images/switchUp.png";
			document.getElementById("can5-0d").style.visibility = "visible";
			document.getElementById("can5-0e").style.visibility = "visible";
			document.getElementById("can5-0").style.visibility = "visible";
			document.getElementById("can5-1").style.visibility = "visible";
			document.getElementById("can5-1a").style.visibility = "visible";
			document.getElementById("can5-6").style.visibility = "visible";
			document.getElementById("can5-7").style.visibility = "visible";
			document.getElementById("can5-2").style.visibility = "visible";
			document.getElementById("can5-2a").style.visibility = "visible";
			document.getElementById("can5-7a").style.visibility = "visible";
			document.getElementById("can5-4").style.visibility = "visible";
			document.getElementById("can5-3").style.visibility = "visible";
			document.getElementById("can5-2").style.transformOrigin = "";
			document.getElementById("can5-2").style.animation = "";
			document.getElementById("can5-2a").style.transformOrigin = "";
			document.getElementById("can5-2a").style.animation = "";
			document.getElementById("can5-3").style.transformOrigin = "";
			document.getElementById("can5-3").style.animation = "";
			document.getElementById("can5-7").style.transformOrigin = "";
			document.getElementById("can5-7").style.animation = "";
		}
		if(p == 0)
			document.getElementById("can5-6").style.left = "94px";
		else if(p == 1)
			document.getElementById("can5-6").style.left = "95px";
		else if(p > 1 && p < 5)
			document.getElementById("can5-6").style.left = "97px";
		else if(p > 4 && p < 7)
			document.getElementById("can5-6").style.left = "100px";
		else if(p > 6 && p < 9)
			document.getElementById("can5-6").style.left = "105px";
		else if(p == 9)
			document.getElementById("can5-6").style.left = "108px";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(628,165,-90);
		document.getElementById("can5-0b").onclick=function(){
			myStopFunction();
			document.getElementById("can5-0b").onclick = "";
			document.getElementById("can5-0b").src = "images/switchDown.png";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(638,165,-90);
			document.getElementById("can5-0c").onclick=function(){
				myStopFunction();
				document.getElementById("can5-0c").onclick = "";
				document.getElementById("can5-0c").src = "images/switchDown.png";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(645,165,-90);
				document.getElementById("can5-0d").onclick=function(){
					myStopFunction();
					document.getElementById("can5-0d").onclick = "";
					document.getElementById("can5-0d").src = "images/switchDown.png";
					document.getElementById("can5-0a").src = "images/green.png";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(590,120,-90);
					document.getElementById("can5-0e").onclick=function(){
						myStopFunction();
						document.getElementById("can5-0e").onclick = "";
						document.getElementById("can5-0e").src = "images/nob1.png";
						document.getElementById("can5-1a").src = "images/n2.png";
						setTimeout(function(){
							document.getElementById("can5-0").style.visibility = "hidden";
							document.getElementById("can5-0a").style.visibility = "hidden";
							document.getElementById("can5-0b").style.visibility = "hidden";
							document.getElementById("can5-0c").style.visibility = "hidden";
							document.getElementById("can5-0d").style.visibility = "hidden";
							document.getElementById("can5-0e").style.visibility = "hidden";
							document.getElementById("finalResult").style.visibility = "visible";
							if(p<5){
								document.getElementById("can5-2").style.setProperty("--rightPosition", (data[p][1]+108+83.5)+"px");
								document.getElementById("can5-3").style.setProperty("--rightPosition", (data[p][1]+108+83.5)+"px");
								document.getElementById("can5-2a").style.setProperty("--rightPosition2", (data[p][1]+108+65.5)+"px");
							}
							else if(p == 5 || p == 6){
								document.getElementById("can5-2").style.setProperty("--rightPosition", (data[p][1]+108+85)+"px");
								document.getElementById("can5-3").style.setProperty("--rightPosition", (data[p][1]+108+85)+"px");
								document.getElementById("can5-2a").style.setProperty("--rightPosition2", (data[p][1]+108+67)+"px");
							}
							else if(p > 6 && p < 9){
								document.getElementById("can5-2").style.setProperty("--rightPosition", (data[p][1]+108+87)+"px");
								document.getElementById("can5-3").style.setProperty("--rightPosition", (data[p][1]+108+87)+"px");
								document.getElementById("can5-2a").style.setProperty("--rightPosition2", (data[p][1]+108+72)+"px");
							}
							else if(p == 9){
								document.getElementById("can5-2").style.setProperty("--rightPosition", (data[p][1]+108+88)+"px");
								document.getElementById("can5-3").style.setProperty("--rightPosition", (data[p][1]+108+88)+"px");
								document.getElementById("can5-2a").style.setProperty("--rightPosition2", (data[p][1]+108+72)+"px");
							}
							setTimeout(function(){
								document.getElementById("can5-2").style.animation = "stretch 8s  ease-in-out forwards ";
								document.getElementById("can5-3").style.animation = "stretch 8s  ease-in-out forwards";
								document.getElementById("can5-2a").style.animation = "stretch2 8s  ease-in-out forwards";
								document.getElementById("can5-7").style.animation = "papermove 8s  ease-in-out forwards";
								setTimeout(function(){
									fillTable();
								},8000);
							},800);
						},500);
					}
				}
			}
		}
		
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("trial").style.visibility = "hidden";
		document.getElementById("canvas5").style.visibility = "hidden";
		document.getElementById("can5-0").style.visibility = "hidden";
		document.getElementById("can5-0a").style.visibility = "hidden";
		document.getElementById("can5-0b").style.visibility = "hidden";
		document.getElementById("can5-0c").style.visibility = "hidden";
		document.getElementById("can5-0d").style.visibility = "hidden";
		document.getElementById("can5-0e").style.visibility = "hidden";
		document.getElementById("can5-1").style.visibility = "hidden";
		document.getElementById("can5-1a").style.visibility = "hidden";
		document.getElementById("can5-6").style.visibility = "hidden";
		document.getElementById("can5-7").style.visibility = "hidden";
		document.getElementById("can5-2").style.visibility = "hidden";
		document.getElementById("can5-7a").style.visibility = "hidden";
		document.getElementById("can5-2a").style.visibility = "hidden";
		document.getElementById("can5-4").style.visibility = "hidden";
		document.getElementById("can5-3").style.visibility = "hidden";
		var tb2 = document.getElementById("lastResult");
		var row1 = tb2.insertRow();
		var cell = row1.insertCell();
		cell.colSpan = 4;
		cell.style = "text-align:right";
		avgDuct = ((data[trial1][2]+data[trial2][2])/2).toFixed(2);	
		var inputVal = document.createElement("input");
		var checkVal = document.createElement("input");
		var rightVal = document.createElement("span");
		var alertVal = document.createElement("span");
		// var rightVal = document.createElement("span");
		inputVal.setAttribute("type","text");
		inputVal.setAttribute("id","res");
		inputVal.setAttribute("oninput","checkInputValid(this)");
		rightVal.setAttribute("id","rightAns");
		inputVal.classList.add("inputStyle");
		checkVal.setAttribute("type","button");
		checkVal.setAttribute("id","chk");
		checkVal.setAttribute("cursor","pointer");
		checkVal.setAttribute("onclick","checkResult();");
		checkVal.setAttribute("value","CHECK");
		alertVal.setAttribute("id","alertId");
		cell.innerHTML ="Average Ductility Value = ";
		cell.appendChild(inputVal);
		cell.appendChild(rightVal);
		cell.appendChild(checkVal);
		tb2.appendChild(alertVal);
		// cell.innerHTML ="Average Ductility Value = "+ ((data[trial1][2]+data[trial2][2])/2).toFixed(2);	
		// var q3 = Object.create(questions);
		// generateQuestion(q3,"A minimum ductility value of S 90 Bitumen__________ has been specified by the BIS ","","72.5 cm","75 cm","82 cm","85 cm",2,finalStatement,250,300,250,150);
	}
}

function checkInputValid(e) {
	e
	.value = e.value.match(/\d*(\.\d*)?/)[0];
}
function scree2Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function scree4Proceed()
{
	document.getElementById("can4-5b").style.visibility = "visible";
	document.getElementById("v4-1").style.visibility = "visible";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(150,150,-90);
	document.getElementById("can4-5b").onclick=function()
	{
		myStopFunction();
		document.getElementById("can4-5b").onclick="";
		document.getElementById("v4-1").style.visibility = "hidden";
		document.getElementById("can4-5b").style.animation = "bitMouldMove 2.5s forwards";
		setTimeout(function(){
			document.getElementById("can4-5b").style.visibility = "hidden";
			document.getElementById("can4-5").style.visibility = "visible";
			document.getElementById("can4-6a").style.visibility = "visible";
			document.getElementById("can4-6b").style.visibility = "visible";
			document.getElementById("can4-7c").style.visibility = "visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(110,210,-90);
			document.getElementById("can4-7c").onclick=function()
			{
				myStopFunction();
				document.getElementById("can4-7c").onclick="";
				document.getElementById("can4-7c").style.animation = "sc2Move 2.5s forwards";
				setTimeout(function(){
					document.getElementById("can4-7c").src = "images/sc1.png";
					setTimeout(function(){
						document.getElementById("can4-7c").style.visibility = "hidden";
						document.getElementById("can4-7a").style.visibility = "visible";
						document.getElementById("can4-7d").style.visibility = "visible";
						myInt = setInterval(function(){ animatearrow(); }, 500);
						animateArrowATPosition(190,210,-90);
						document.getElementById("can4-7d").onclick=function()
						{
							myStopFunction();
							document.getElementById("can4-7d").onclick="";
							document.getElementById("can4-7d").style.animation = "sc1Move 2.5s forwards";
							setTimeout(function(){
								document.getElementById("can4-7d").src = "images/sc1.png";
								setTimeout(function(){
									document.getElementById("can4-7d").style.visibility = "hidden";
									document.getElementById("can4-7b").style.visibility = "visible";
									myInt = setInterval(function(){ animatearrow(); }, 500);
									animateArrowATPosition(150,320,-90);
									document.getElementById("canvas4").onclick=function(event)
									{
										if(event.pageX>=151 && event.pageX<= 181 && event.pageY>=352 && event.pageY<= 365)
										{
											myStopFunction();
											document.getElementById("canvas4").onclick="";
											document.getElementById("can4-6a").style.animation = "clip1Move 0.8s forwards";
											setTimeout(function(){
												document.getElementById("can4-6a").style.visibility = "hidden";
												animateArrowATPosition(150,390,90);
												document.getElementById("canvas4").onclick=function(event)
												{
													if(event.pageX>=151 && event.pageX<= 181 && event.pageY>=374 && event.pageY<= 388)
													{
														myStopFunction();
														document.getElementById("canvas4").onclick="";
														document.getElementById("can4-6b").style.animation = "clip2Move 0.8s forwards";
														setTimeout(function(){
															document.getElementById("can4-6b").style.visibility = "hidden";
															var q3 = Object.create(questions);
															generateQuestion(q3,"The ductility of a bituminous material is measured by the ____________ to which it will elongate before breaking.","","Distance in cm","Distance in mm","Temperature in K","Temperature in Celsius",1,scree4Proceed1,250,120,300,150);
															// document.getElementById("nextButton").style.visibility = "visible";
														},800);
													}
												}
											},800);
										}
									}
								},2500);
							},700);
						}
					},2000);
				},1000);
			}
		},2500);
	}
}
function scree4Proceed1()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function pourBitumenIntoMould()
{
	for(var k = 4; k<=6; k++){
		document.getElementById("can1-"+k).style.visibility = "hidden";
	}
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(300,420,180);
	document.getElementById("can1-1").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-1").onclick="";
		setTimeout(function()
		{
			document.getElementById("can1-1").style.visibility = "hidden";
			document.getElementById("can1-2").style.visibility = "hidden";
			setTimeout(function()
			{
				document.getElementById("can1-3").style.visibility = "hidden";
				document.getElementById("can1-11").style.visibility = "visible";
				document.getElementById("can1-7").style.visibility = "visible";
				document.getElementById("can1-7a").style.visibility = "visible";
				document.getElementById("can1-8").style.visibility = "visible";
				document.getElementById("can1-8a").style.visibility = "visible";
				document.getElementById("v1-1").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(380,180,-90);
				document.getElementById("can1-11").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-11").onclick="";
					document.getElementById("v1-1").style.visibility = "hidden";
					document.getElementById("can1-11").style.animation = "pourBitMove 1.2s forwards";
					setTimeout(function(){
							document.getElementById("can1-11").style.visibility = "hidden";
							document.getElementById("can1-12").style.visibility = "visible";
							document.getElementById("can1-12").style.animation = "pourBitShake 1s forwards";
							setTimeout(function(){
								document.getElementById("can1-7").src = "images/mldBit.png";
								setTimeout(function(){
									document.getElementById("can1-12").style.visibility = "hidden";
									document.getElementById("can1-8").style.visibility = "hidden";
									document.getElementById("can1-7").style.visibility = "hidden";
									document.getElementById("can1-8b").style.visibility = "visible";
									document.getElementById("can1-11").style.visibility = "visible";
									document.getElementById("can1-11").style.top = "80px";
									document.getElementById("can1-11").style.left = "200px";
									document.getElementById("can1-12").style.transformOrigin = "";
									document.getElementById("can1-12").style.animation = "";
									document.getElementById("can1-12").style.left = "230px";
									document.getElementById("can1-12").style.top = "198px";
									document.getElementById("can1-11").style.animation = "pourBitSideMove 1.5s forwards";
									setTimeout(function(){
										document.getElementById("can1-12").style.visibility = "visible";
										document.getElementById("can1-11").style.visibility = "hidden";
										document.getElementById("can1-12").style.animation = "pourBitShake 1s forwards";
										setTimeout(function(){
											document.getElementById("can1-7a").src = "images/mldBit.png";	
											setTimeout(function(){
												document.getElementById("can1-12").style.visibility = "hidden";
												document.getElementById("can1-8a").style.visibility = "hidden";
												document.getElementById("can1-7a").style.visibility = "hidden";
												document.getElementById("can1-8c").style.visibility = "visible";
												document.getElementById("nextButton").style.visibility = "visible";
											},800);
										},200);
									},1600);
								},1000);
							},200);
						},1300);
					}
			},800);
		},500);
	}
}
function setReadingPart(ele)
{
	document.getElementById("can3-3").style.left = ele.value+'px';
	document.getElementById("can3-2").style.left = ele.value+'px';
	document.getElementById("v3-1").innerHTML ="Pointer position is:"+ (ele.value - 108)/2;
	
}
function checkPosition()
{
	if( document.getElementById("r").value == 108 )
	{
		document.getElementById("nextButton").style.visibility = "visible";
		document.getElementById("r").disabled = true;
	}

	
}


//to fill result table
function fillTable()
{
	
	var tb1 = document.getElementById("finalResult");
	var row = tb1.insertRow();
	var cell = row.insertCell();
	cell.innerHTML = (repeat+1);
	for (i = 0; i <= data[p].length-1; i++)
	{
		var cell = row.insertCell();
		cell.innerHTML = data[p][i];
	}
	fillFinalTable();
	machineoff();
}

//observation table to be filled
function fillFinalTable()
{
	var tb2 = document.getElementById("lastResult");
	var row = tb2.insertRow();
	var cell = row.insertCell();
	cell.innerHTML = (repeat+1);
	for (i = 0; i <= data[p].length-1; i++)
	{
		var cell = row.insertCell();
		cell.innerHTML = data[p][i];
	}
	// console.log(trial1+ " " + trial2);
}
function machineoff()
{
	setTimeout(function(){
		document.getElementById("finalResult").style.visibility = "hidden";
		document.getElementById("can5-0").style.visibility = "visible";
		document.getElementById("can5-0a").style.visibility = "visible";
		document.getElementById("can5-0a").src = "images/green.png";
		document.getElementById("can5-0b").style.visibility = "visible";
		document.getElementById("can5-0c").style.visibility = "visible";
		document.getElementById("can5-0d").style.visibility = "visible";
		document.getElementById("can5-0e").style.visibility = "visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(590,120,-90);
		document.getElementById("can5-0e").onclick=function(){
			myStopFunction();
			document.getElementById("can5-0e").onclick = "";
			document.getElementById("can5-0e").src = "images/nob.png";
			document.getElementById("can5-1a").src = "images/n1.png";
			document.getElementById("can5-0a").src = "images/red.png";
			if(repeat == 0){
				repeat = 1;
				simsubscreennum = 2;
				resestMachine();
				document.getElementById("nextButton").style.visibility = "visible";
			}else{
				document.getElementById("nextButton").style.visibility = "visible";
			}
			
		}
	},1500);
}

function resestMachine()
{
	if(p<5){
		document.getElementById("can3-3").style.left = (data[p][1]+108+65.5)+"px";
		document.getElementById("can3-2").style.left = (data[p][1]+108+65.5)+"px";
	}
	else if(p == 5 || p == 6){
		document.getElementById("can3-3").style.left = (data[p][1]+108+67)+"px";
		document.getElementById("can3-2").style.left = (data[p][1]+108+67)+"px";
	}
	else if(p > 6 && p < 9){
		document.getElementById("can3-3").style.left = (data[p][1]+108+72)+"px";
		document.getElementById("can3-2").style.left = (data[p][1]+108+72)+"px";
	}
	else if(p == 9){
		document.getElementById("can3-3").style.left = (data[p][1]+108+72)+"px";
		document.getElementById("can3-2").style.left = (data[p][1]+108+72)+"px";
	}
	document.getElementById("r").value = 250;
}
function checkResult()
{
	var idd = document.getElementById("res");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		// document.getElementById("alertId").style.visibility = "visible";
		// document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}
	else if(Math.round(idd.value) != Math.round(avgDuct))
	{
		qCount++;
		// blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= avgDuct+"cm";
			var q2 = Object.create(questions);																								
			generateQuestion(q2,"A minimum ductility value of S90 Bitumen__________ has been specified by the BIS ","","72.5 cm","75 cm","82 cm","85 cm",2,finalStatement,250,300,250,150);
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= avgDuct+"cm<span style='color:green'>&#10004;</span>";
		var q2 = Object.create(questions);																								
		generateQuestion(q2,"A minimum ductility value of S90 Bitumen__________ has been specified by the BIS ","","72.5 cm","75 cm","82 cm","85 cm",2,finalStatement,250,300,250,150);
	}
}
function finalStatement()
{
	document.getElementById("p8-1").style.visibility = "visible";
	document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
}
//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";												
	// document.getElementById('dialog-div').style.height=heightVal+"px";
	// document.getElementById('dialog-div').style.width=widthVal+"px";
	document.getElementById('dialog-div').style.visibility="visible";											
}
function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 1 && screensVal == 0)
	{
		pourBitumenIntoMould();
	}
	else if(simsubscreennum == 2 && screensVal == 1)
	{
		// document.getElementById("nextButton").style.visibility = "visible";
		var q2 = Object.create(questions);
		generateQuestion(q2,"Water bath should be maintained at a temperature_______ ","","25&deg;C","33&deg;C","27&deg;C","39&deg;C",3,scree2Proceed,100,150,250,150);
	}
	
}	
function setTopLeft(divid,leftPos,topPos,imgsrc)
{
	document.getElementById(divid).src = imgsrc;
	document.getElementById(divid).style.top = topPos+"px";
	document.getElementById(divid).style.left = leftPos+"px";
}

//code to get  pixel point in a page
// function getpx(event,elem)
// {
	// document.getElementById("1").innerHTML = event.pageX + " "+event.pageY;
// }