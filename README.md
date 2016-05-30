#Woon-werkverkeer in Nederland

Shannon Bakker
11201401

######Samenvatting doelen
De visualisatie gaat over het woon-werkverkeer in Nederland. Het belangrijkste doel van de visualisatie is dat de gebruiker kan opzoeken waar de mensen vandaan komen die in de gemeente van de gebruiker werken en  de gebruiker kan opzoeken waar de mensen uit de gemeente van de gebruiker werken. Daarnaast laat de visualisatie ook opvallende aspecten van de data zien en ontwikkeling door de tijd. 

######Probleem van de gebruiker
Het CBS heeft veel data over woon-werkverkeer beschikbaar. Het kost een gebruiker alleen veel moeite om de data te vinden en hier conclusies uit te trekken. Dit terwijl woon-werkverkeer wel interessant is voor de gemiddelde werkende Nederlander. Iedereen uit deze groep werkt zelf en zijn buren en vrienden waarschijnlijk ook. Maar om te weten waar de menen uit de eigen woonplaats werken is een visualisatie nodig. 
	Daarnaast kunnen er waarschijnlijk ook trends uit de data geworden gehaald. Zeker wanneer men data over de tijd kan vergelijken. Visualisaties zijn enorm handig om deze trends te ontdekken en te illustreren. 

######Features van de visualisatie 
Er worden meerdere visualisaties gemaakt. De belangrijkste visualisatie die bovenaan de pagina komt is een linked views visualisatie van twee kaarten. Één kaart gaat over de mensen die van een gemeente reizen naar een andere. De andere kaart gaat over de mensen die naar gemeentes reizen vanuit andere. Als je op een plaats in één van de kaarten klikt licht in beide kaarten deze plaats op en de gemeentes waar mensen vandaan komen of naartoe gaan. De gemeentes worden ingekleurd op basis van het aantal mensen dat naar de aangeklikte plaats reist. Daarnaast komt er ook een zoekvakje waarmee je plaatsen in Nederland kan zoeken en als je een plaats hebt gevonden licht deze weer op.  Ook komt er een tijdsbalkje waarmee je kan kiezen uit welk jaar je data wilt zien. Daarnaast verschijnt er wanneer je  een gemeente selecteert één lijngrafiek met de ontwikkeling over tijd in het aantal mensen dat naar een stad gaat en het aantal mensen dat uit de stad vertrekt. 
Onder deze grafieken komen deelgrafieken die een verhaal vertellen. Dit is enigzins afhankelijk van de data, maar de onderdelen die ik nu in mijn hoofd heb zijn: 

	Twee kaarten naast elkaar van één van de grote steden, waarbij je in de één de situatie voor de crisis ziet en de 		andere de situatie in 2014. Dit is een ingezoomde en specifieke versie van de grote kaart met een dropdown menu met de grote steden.  
	
	Een lijngrafiek waarbij je het aantal mensen ziet dat naar een stad reist en de gemiddelde huizenprijs over de tijd.
	
	Een barchart met de gemeenten waar de inwoners het verst moeten reizen voor hun werk.  

De MVP is de hoofdvisualisatie bovenaan de pagina. Hierbij kan het tijdbalkje en zoekbalkje nog worden weggelaten. In de doc map staat een schets van de volledige visualisatie. 

######Inspiratie
De belangrijkste inspiratie voor de visualisaties is [dit artikel](http://www.tijd.be/ondernemen/transport/Interactief_De_pendelaars_van_en_naar_uw_gemeente.9734600-3084.art) over pendelen in België. Het belangrijkste verschil is dat ik als hoofdvisualisatie een linked views visualisatie heb. Daarnaast zullen de visualisaties onder de hoofdvisualisatie anders zijn, deze zijn namelijk afhankelijk van de trends in de data. Daarnaast zie je de vorm van één hoofdvisualisatie en meerdere meer statische visualisaties ook regelmatig bij andere media zoals The New York Times. De volgende artikelen zijn hier goede voorbeelden van:
[Europe right wing](http://www.nytimes.com/interactive/2016/05/22/world/europe/europe-right-wing-austria-hungary.html?ref=world&_r=0),  [Growing up](http://www.nytimes.com/interactive/2015/05/03/upshot/the-best-and-worst-places-to-grow-up-how-your-area-compares.html?&contentId=&mediaId=&referrer=http%3A%2F%2Fwww.nytimes.com%2Fpages%2Fmultimedia%2Findex.html%3Fmodule%3DSiteIndex%26region%3DFooter%26pgtype%3Dsectionfront&priority=true&action=click&contentCollection=U.S.&region=Footer&module=WhatsNext&version=WhatsNext&contentID=WhatsNext&moduleDetail=undefined&pgtype=Multimedia), [NBA basketball](http://www.nytimes.com/interactive/2014/05/12/upshot/12-upshot-nba-basketball.html?ref=multimedia)

######Dataset
De belangrijkste dataset is de tabel [Banen werknemers en afstand woon-werk; woon- en werkregio’s](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=81251ned&D1=a&D2=0,3-4&D3=0,3-14&D4=l&HDR=T,G2&STB=G1,G3&VW=T) van het CBS. Daarnaast zou ik ook nog graag data vinden van inwoners van Nederland die in het buitenland werken en inwoners van een ander land die in Nederland werken. Ik heb op dit moment  deze data alleen op [regioniveau](https://www.cbs.nl/nl-nl/nieuws/2014/21/ruim-40-duizend-inwoners-van-nederland-werken-over-de-grens) en niet op gemeenteniveau gevonden.  [Huizenprijzen](http://statline.cbs.nl/Statweb/selection/?VW=T&DM=SLNL&PA=81885ned&D1=0-2%2c7&D2=0%2c5%2c13%2c15%2c17%2c19&D3=4%2c29%2c54%2c79%2c84-105&HDR=T%2cG1&STB=G2) heb ik alleen gevonden voor de vier grootste steden en per regio. 

######Technische aspecten
De basis van het merendeel van de graphics is een [svg-file](https://upload.wikimedia.org/wikipedia/commons/a/a3/Nederland_gemeenten_2014.svg) van de Nederlandse gemeenten. De visualisatie wordt gemaakt met D3. 
 


