var fun_facts = [ "mensen uit Terschelling het verst moeten reizen naar hun werk, ze leggen gemiddeld 33.8 kilometer af",
"er het minste mensen werken op Schiermonnikoog, hier werken ongeveer 400 mensen",
"in Amsterdam de meeste mensen werken, hier werken ruim een half miljoen mensen",
"mensen uit Zuid-Holland gemiddeld de kortse reis naar werk hebben, zij leggen 11,6 kilometer af",
"Groningers (provincie) het langst naar hun werk reizen, zij reizen gemiddeld 21,8 kilometer naar hun werk"];

var fact_text = d3.select('#fact')

var fun_fact = fun_facts[Math.floor(Math.random()*fun_facts.length)];

fact_text.append("text")
	.text(fun_fact)