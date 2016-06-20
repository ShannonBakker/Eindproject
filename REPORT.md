#Eindverslag

###Beschrijving datavisualisatie
De visualisatie gaat over het woon-werkverkeer in Nederland. De pagina bestaat uit twee visualisaties. De belangrijkste visualisatie, hier verder hoofdvisualisatie genoemd staat bovenaan de pagina. Deze visualisatie bestaat uit twee kaarten en een lijngrafiek. De kaarten zijn ingekleurd op basis van het aantal mensen dat van of naar een gekozen plaats reist voor zijn werk. Wanneer de pagina wordt geladen is deze plaats standaard Amsterdam. Vervolgens kan men met een dropdown-menu of door te klikken op één van de kaarten een plaats selecteren. Ook kan het jaartal met behulp van een slider worden veranderd. Gekoppeld aan deze kaarten zit ook een lijngrafiek. Deze laat de ontwikkeling over tijd in het aantal mensen dat naar een gemeente gaat en het aantal mensen dat uit de gemeente vertrekt zien. 
Hierna volgt een stukje tekst met highlights uit de hoofdvisualisatie en de tweede visualisatie. Deze tweede visualisatie laat de top tien van gemeentes van waaruit gemiddeld het verste wordt gereisd naar werk. De visualisatie bestaat uit een liggende barchart en een kaart. Op de barchart zie je de gemeentes en de gemiddelde reisafstand, op de kaart zie je wanneer je met de muis over een bar gaat waar de mensen uit deze gemeente naartoe reizen. 

###Technisch design
De visualisatie heeft één html en css pagina, een dataset in json en meerdere javascript functies. Dit is hoofdvisualisatie.js hiermee wordt de data ingeladen, het dropdown menu, de tooltip en de slider functioneel gemaakt en worden de kaarten ingekleurd, lijngrafiek_hoofdvisualisatie.js hiermee wordt de lijngrafiek gemaakt die aan de kaarten van de hoofdvisualisatie zijn gelinkt. Met fun_facts.js wordt de laadpagina gemaakt en met afstand_visualisatie.js wordt de tweede visualisatie gemaakt. 

#####De data inladen
In onderstaande afbeelding is de opbouw van het json. 

De dataset wordt in het javascript bestand hoofdvisualisatie.js ingeladen. De data van de totalen moet om het goed in de grafiek te plaatsen eerst worden bewerkt in het javascript. Tijdens het inladen van de data wordt ook het dropdown menu gemaakt waarmee je een plaats kan kiezen. Dankzij bootstrap-select kan je ook zoeken in dit dropdown-menu. De dataset is erg groot, omdat voor iedere gemeente van alle gemeentes in Nederland van en naar data is. Daarom duurt het een aantal seconden voordat de pagina is ingeladen. Om de gebruiker te laten weten dat er nog data komt is er een laadpagina. Op deze laadpagina wordt een random feitje over Woon-werkverkeer in Nederland getoond, dit feitje wordt gekozen met behulp van fun_facts.js. 

#####De kaart
De kaart is een svg met alle gemeenten in Nederland in 2014. De naam van de gemeente is het id. Spaties en andere vreemde tekens zijn uit de plaatsnamen verwijderd. 

#####De kaarten inkleuren
Wanneer de data is ingeladen wordt met de functie colour_map in hoofdvisualisatie.js de kaart ingekleurd en de mouseover functies toegevoegd. Aan deze functie wordt meegegeven welke kaart moet worden ingekleurd en voor welke plaats de kaart moet worden ingekleurd. Vervolgens wordt in de functie de juiste kaart geselecteerd, de titel met de juiste plaatsnaam als tekst aan het svg toegevoegd en de geselecteerde plaats oranje gearceerd. Vervolgens wordt er een loop gemaakt door de ‘plaatsen_van’ of ‘plaatsen-naar’ data uit het svg. Op basis van deze data wordt de kaart gekleurd, met een globaal gedefinieerd kleurschema. Tot slot worden de muisfuncties bijgevoegd. Hier wordt ook de functie add_mouseover in hoofdvisualisatie.js aangeroepen. Deze zorgt ervoor dat de tooltip de correcte tekst bevat. De ‘on click’ functie zorgt ervoor dat de kaart opnieuw wordt ingekleurd wanneer er op een andere plaats wordt aangeklikt. Dit wordt gedaan door de functie colour_map opnieuw aan te roepen. 

##### De lijngrafiek
De lijngrafiek wordt gemaakt met de functie make_linegraph uit lijngrafiek_hoofdvisualisatie.js. Deze functie wordt meestal tegelijk aangeroepen met de colour_map functie. Alleen bij de slider en de tweede visualisatie gebeurt dit niet. De lijngrafiek krijgt alleen de plaats mee. In deze functie wordt er wanneer een oude lijngrafiek is, deze verwijdert en worden er twee paths gemaakt voor de datalijnen. Aan deze lijnen worden er ook twee dots en een lijn toegevoegd die meebewegen wanneer de muis over de lijngrafiek gaat. 

##### Tweede visualisatie
 
