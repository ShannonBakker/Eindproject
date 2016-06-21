#Eindverslag
###Beschrijving datavisualisatie
De visualisatie gaat over het woon-werkverkeer in Nederland. De pagina bestaat uit twee visualisaties. De belangrijkste visualisatie, hier verder hoofdvisualisatie genoemd, staat bovenaan de pagina. Deze visualisatie bestaat uit twee kaarten en een lijngrafiek. De kaarten zijn ingekleurd op basis van het aantal mensen dat voor zijn werk van of naar een gekozen plaats reist. Wanneer de pagina wordt geladen is deze plaats standaard Amsterdam. Vervolgens kan men met een dropdown-menu of door te klikken op één van de kaarten een plaats selecteren. Ook kan het jaartal met behulp van een slider worden veranderd. Gekoppeld aan deze kaarten zit ook een lijngrafiek. Deze laat de ontwikkeling over tijd zien van het aantal mensen dat naar een gemeente gaat en het aantal mensen dat uit de gemeente vertrekt. 
Na de hoofdvisualisatie volgt een stukje tekst met interessante informatie uit de visualisatie. De tweede visualisatie staat hieronder en deze laat de top tien van gemeentes zien waaruit gemiddeld het verst wordt gereisd. De visualisatie bestaat uit een liggende barchart en een kaart. Op de barchart zie je de gemeentes en de gemiddelde reisafstand, op de kaart zie je waar de mensen uit deze gemeente naartoe reizen. 

###Technisch design
De visualisatie staat in een html-pagina, een css-pagina, twee datasets in json en meerdere javascript bestanden. Dit zijn: 
-	hoofdvisualisatie.js:  hiermee wordt de data ingeladen, het dropdown menu, de tooltip en de slider functioneel gemaakt en worden de kaarten ingekleurd.
-	lijngrafiek_hoofdvisualisatie.js: hiermee wordt de lijngrafiek gemaakt die aan de kaarten van de hoofdvisualisatie zijn gelinkt. 
-	fun_facts.js:  maakt de functionaliteit voor de laadpagina.
-	afstand_visualisatie.js: hiermee wordt de tweede visualisatie gemaakt. 

#####De data inladen
In onderstaande afbeelding is de opbouw van het grootste json-bestand te zien. Deze wordt gebruikt voor de hoofdvisualisatie en de kaart van visualisatie twee.

De dataset wordt in het javascript bestand hoofdvisualisatie.js ingeladen. De data van de totalen moet om het goed in de grafiek te plaatsen eerst worden bewerkt in het javascript. Tijdens het inladen van de data wordt ook het dropdown menu gemaakt waarmee je een plaats kan kiezen. Dankzij bootstrap-select kan je ook zoeken in dit dropdown-menu.
 
De dataset is vrij groot, omdat voor iedere Nederlandse gemeente van alle 403 gemeentes van en naar data is. Zonder de totalen zijn er dus 403*(403+403)=324.818 datapunten.
Om deze reden duurt het een aantal seconden voordat de pagina is ingeladen. Om de gebruiker te laten weten dat er nog data komt, is er een laadpagina. Op deze laadpagina wordt een random feitje over Woon-werkverkeer in Nederland getoond, dit feitje wordt gekozen met behulp van fun_facts.js. 

#####De kaart
De kaart is een svg met alle gemeenten in Nederland in 2014. De naam van de gemeente is het id. Spaties en andere vreemde tekens zijn uit de plaatsnamen verwijderd. 

#####De kaarten inkleuren
Wanneer de data is ingeladen wordt met de functie colour_map in hoofdvisualisatie.js de kaart ingekleurd en worden de muisfuncties toegevoegd. Aan de functie colour_map wordt meegegeven welke kaart moet worden ingekleurd en voor welke plaats de kaart moet worden ingekleurd. De plaats wordt doorgegeven als een nummer. De plaatsen hebben dit nummer op alfabetische volgorde gekregen. Waarbij de eerste plaats,  Aa en Hunze, nul heeft gekregen. De cijfers van de plaatsen corresponderen de volgorde waarmee ze in de dataset staan. Hierdoor is het mogelijk om snel het juiste item te vinden in de array van plaatsen.  

In de functie colour_map wordt eerst de juiste kaart geselecteerd, de titel van de kaart toegevoegd en de geselecteerde plaats oranje gearceerd. Vervolgens wordt er een loop gemaakt door de ‘plaatsen_van’ of ‘plaatsen-naar’ data uit het svg. Op basis van deze data wordt de kaart gekleurd, met een globaal gedefinieerd kleurschema. Tot slot worden de muisfuncties bijgevoegd. Hier wordt ook de functie add_mouseover in hoofdvisualisatie.js aangeroepen. Deze zorgt ervoor dat de tooltip de correcte tekst bevat. De ‘on click’ functie zorgt ervoor dat de kaart opnieuw wordt ingekleurd wanneer er op een andere plaats wordt aangeklikt. Dit wordt gedaan door de functie colour_map opnieuw aan te roepen. 

##### De lijngrafiek
De lijngrafiek wordt gemaakt met de functie make_linegraph uit lijngrafiek_hoofdvisualisatie.js. Deze functie wordt meestal tegelijk aangeroepen met de colour_map functie. Alleen bij de slider en de tweede visualisatie gebeurt dit niet. De lijngrafiek krijgt alleen de plaats mee. In deze functie wordt er wanneer een oude lijngrafiek is, deze verwijdert en worden er twee paths gemaakt voor de datalijnen. Aan deze lijnen worden er ook twee dots en een lijn toegevoegd die meebewegen wanneer de muis over de lijngrafiek gaat. Ook de x- en y-as worden uiteraard gemaakt. 

##### Tweede visualisatie
De tweede visualisatie wordt gemaakt met de functie visualisation_distance in afstand_visualisatie.js. Deze functie wordt maar één keer aangeroepen, namelijk in hoofdvisualisatie.js als de data geladen is. Wanneer de functie is aangeroepen wordt eerst met behulp van colour_map de kaart svg_afstand gekleurd voor de plaats bovenaan de barchart, namelijk Terschelling. Vervolgens worden er verschillende parameters voor de barchart goedgezet en de data voor de barchart ingeladen. De data komt uit afstanden.json. Hierna worden de assen en de bars gemaakt. Wanneer de gebruiker met de muis over een bar gaat wordt de kaart svg_afstand gekleurd voor de plaats die bij de bar hoort. 

###Uitdagingen
#####Minder visualisaties
In het design document had ik het plan om vier losse visualisaties te maken. Dit bleek te ambitieus voor vier weken, om deze reden zijn deelvisualisatie 1 en 3 uit het design document niet uitgevoerd. Ik heb ervoor gekozen voor deelvisualisatie 2, omdat uit de standups bleek dat men deze het meest interessant vond. Ook ikzelf vond dit het beste idee van de drie deelvisualisaties. 

#####Selecteer een plaats
Qua visueel design is verder alleen de zoekbalk veranderd. In plaats van een zoekbalk waar je exact de juiste plaatsnaam moet intypen is gekozen voor een dropdown menu, waar je ook in kan zoeken. Dit is gemakkelijker voor de gebruiker en minder foutgevoelig. 

##### Plaatsnamen als id
Verder zijn er tijdens het ontwikkelproces natuurlijk wel een aantal niet geanticipeerde problemen tevoorschijn gekomen. Het eerste probleem was dat een id geen spatie mag hebben en veel plaatsnamen dit wel hebben. Dit is voor de svg met de hand opgelost. De plaatsnamen in de dataset  moesten wel corresponderen aan de id’s. Hierdoor zijn de plaatsnamen in de functie colour_map ontdaan van hun spaties. Andere rare tekens zijn zowel in de svg als de dataset met de hand verwijdert. 

##### Dataset is groot
Een ander probleem is de grote van de dataset. Hoewel de dataset nog steeds 90 mb is heb ik hem wel 40 mb kleiner kunnen maken dankzij het gebruik van kortere key’s. Ze zijn helaas wel minder duidelijk dan de originele namen. Toch vond ik in dit geval de behaalde tijdswinst bij het inladen van de pagina groot genoeg om dit te accepteren. Zou ik nog eens vier weken hebben voor dit project, dan zou ik gebruik maken van een online database , zoals MySQL. 

##### Globale variabelen
De functies in hoofdvisualisatie.js namen in eerste instantie veel meer variabelen mee. Omdat steeds dezelfde variabelen werden meegegeven en omdat het soms erg ingewikkeld werd om de juiste variabele mee te gegeven is besloten een aantal globale variabelen toe te voegen. Dit zijn data, year en alle previous-waarden. 

##### Missende data
Er is relatief veel data dat mist. Ik heb hier het CBS over gemaild en de voornaamste reden voor de missende data is de anonimisering van de gegevens. Om deze reden is alle data ook op honderdtallen afgerond. Een andere belangrijke reden is gemeentelijke herindelingen. Ik gebruik data die de gemeentes van 2014 hanteert, dit betekent dat als een gemeente een andere indeling had in een jaar voor 2014, de data voor dat jaar mist. In eerste instantie had ik ervoor gekozen om de missende data en de datapunten met een waarde 0 een verschillende kleur te geven in de kaarten. Dit zorgde voor chaotische kaarten en bovendien dachten veel gebruikers dat op de plaatsen met de waarde 0 , de waarde groter was dan 0. Om deze reden hebben gemeentes met 0 als waarde of missende data beide een grijze kleur. 


 
