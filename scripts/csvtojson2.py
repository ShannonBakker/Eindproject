import json
import csv

# inspiration from: http://stackoverflow.com/questions/19697846/python-csv-to-json

# load the files
csvf = open('banen_woon_naar_werk.csv', 'r')
jsonf = open('data.json', 'w+')

plaatsen_Nederland = ['Aa en Hunze', 'Aalburg', 'Aalsmeer', 'Aalten', 'Achtkarspelen', 'Alblasserdam', 'Albrandswaard', 'Alkmaar', 'Almelo', 'Almere', 'Alphen aan den Rijn', 'Alphen-Chaam', 'Ameland', 'Amersfoort', 'Amstelveen', 'Amsterdam', 'Apeldoorn', 'Appingedam', 'Arnhem', 'Assen', 'Asten', 'Baarle-Nassau', 'Baarn', 'Barendrecht', 'Barneveld', 'Bedum', 'Beek (L.)', 'Beemster', 'Beesel', 'Bellingwedde', 'Bergambacht', 'Bergeijk', 'Bergen (L.)', 'Bergen (NH.)', 'Bergen op Zoom', 'Berkelland', 'Bernheze', 'Bernisse', 'Best', 'Beuningen', 'Beverwijk', 'het Bildt', 'De Bilt', 'Binnenmaas', 'Bladel', 'Blaricum', 'Bloemendaal', 'Bodegraven-Reeuwijk', 'Boekel', 'Ten Boer', 'Borger-Odoorn', 'Borne', 'Borsele', 'Boxmeer', 'Boxtel', 'Breda', 'Brielle', 'Bronckhorst', 'Brummen', 'Brunssum', 'Bunnik', 'Bunschoten', 'Buren', 'Bussum', 'Capelle aan den IJssel', 'Castricum', 'Coevorden', 'Cranendonck', 'Cromstrijen', 'Cuijk', 'Culemborg', 'Dalfsen', 'Dantumadiel', 'Delft', 'Delfzijl', 'Deurne', 'Deventer', 'Diemen', 'Dinkelland', 'Doesburg', 'Doetinchem', 'Dongen', 'Dongeradeel', 'Dordrecht', 'Drechterland', 'Drimmelen', 'Dronten', 'Druten', 'Duiven', 'Echt-Susteren', 'Edam-Volendam', 'Ede', 'Eemnes', 'Eemsmond', 'Eersel', 'Eijsden-Margraten', 'Eindhoven', 'Elburg', 'Emmen', 'Enkhuizen', 'Enschede', 'Epe', 'Ermelo', 'Etten-Leur', 'Ferwerderadiel', 'Franekeradeel', 'De Friese Meren', 'Geertruidenberg', 'Geldermalsen', 'Geldrop-Mierlo', 'Gemert-Bakel', 'Gennep', 'Giessenlanden', 'Gilze en Rijen', 'Goeree-Overflakkee', 'Goes', 'Goirle', 'Gorinchem', 'Gouda', 'Graft-De Rijp', 'Grave', "'s-Gravenhage (gemeente)", 'Groesbeek', 'Groningen (gemeente)', 'Grootegast', 'Gulpen-Wittem', 'Haaksbergen', 'Haaren', 'Haarlem', 'Haarlemmerliede en Spaarnwoude', 'Haarlemmermeer', 'Halderberge', 'Hardenberg', 'Harderwijk', 'Hardinxveld-Giessendam', 'Haren', 'Harlingen', 'Hattem', 'Heemskerk', 'Heemstede', 'Heerde', 'Heerenveen', 'Heerhugowaard', 'Heerlen', 'Heeze-Leende', 'Heiloo', 'Den Helder', 'Hellendoorn', 'Hellevoetsluis', 'Helmond', 'Hendrik-Ido-Ambacht', 'Hengelo (O.)', "'s-Hertogenbosch", 'Heumen', 'Heusden', 'Hillegom', 'Hilvarenbeek', 'Hilversum', 'Hof van Twente', 'Hollands Kroon', 'Hoogeveen', 'Hoogezand-Sappemeer', 'Hoorn', 'Horst aan de Maas', 'Houten', 'Huizen', 'Hulst', 'IJsselstein', 'Kaag en Braassem', 'Kampen', 'Kapelle', 'Katwijk', 'Kerkrade', 'Koggenland', 'Kollumerland en Nieuwkruisland', 'Korendijk', 'Krimpen aan den IJssel', 'Laarbeek', 'Landerd', 'Landgraaf', 'Landsmeer', 'Langedijk', 'Lansingerland', 'Laren (NH.)', 'Leek', 'Leerdam', 'Leeuwarden', 'Leeuwarderadeel', 'Leiden', 'Leiderdorp', 'Leidschendam-Voorburg', 'Lelystad', 'Leudal', 'Leusden', 'Lingewaal', 'Lingewaard', 'Lisse', 'Littenseradiel', 'Lochem', 'Loon op Zand', 'Lopik', 'Loppersum', 'Losser', 'Maasdonk', 'Maasdriel', 'Maasgouw', 'Maassluis', 'Maastricht', 'De Marne', 'Marum', 'Medemblik', 'Meerssen', 'Menameradiel', 'Menterwolde', 'Meppel', 'Middelburg (Z.)', 'Midden-Delfland', 'Midden-Drenthe', 'Mill en Sint Hubert', 'Millingen aan de Rijn', 'Moerdijk', 'Molenwaard', 'Montferland', 'Montfoort', 'Mook en Middelaar', 'Muiden', 'Naarden', 'Neder-Betuwe', 'Nederlek', 'Nederweert', 'Neerijnen', 'Nieuwegein', 'Nieuwkoop', 'Nijkerk', 'Nijmegen', 'Noord-Beveland', 'Noordenveld', 'Noordoostpolder', 'Noordwijk', 'Noordwijkerhout', 'Nuenen, Gerwen en Nederwetten', 'Nunspeet', 'Nuth', 'Oegstgeest', 'Oirschot', 'Oisterwijk', 'Oldambt', 'Oldebroek', 'Oldenzaal', 'Olst-Wijhe', 'Ommen', 'Onderbanken', 'Oost Gelre', 'Oosterhout', 'Ooststellingwerf', 'Oostzaan', 'Opmeer', 'Opsterland', 'Oss', 'Oud-Beijerland', 'Oude IJsselstreek', 'Ouder-Amstel', 'Ouderkerk', 'Oudewater', 'Overbetuwe', 'Papendrecht', 'Peel en Maas', 'Pekela', 'Pijnacker-Nootdorp', 'Purmerend', 'Putten', 'Raalte', 'Reimerswaal', 'Renkum', 'Renswoude', 'Reusel-De Mierden', 'Rheden', 'Rhenen', 'Ridderkerk', 'Rijnwaarden', 'Rijssen-Holten', 'Rijswijk (ZH.)', 'Roerdalen', 'Roermond', 'De Ronde Venen', 'Roosendaal', 'Rotterdam', 'Rozendaal', 'Rucphen', 'Schagen', 'Schermer', 'Scherpenzeel', 'Schiedam', 'Schiermonnikoog', 'Schijndel', 'Schinnen', 'Schoonhoven', 'Schouwen-Duiveland', 'Simpelveld', 'Sint Anthonis', 'Sint-Michielsgestel', 'Sint-Oedenrode', 'Sittard-Geleen', 'Sliedrecht', 'Slochteren', 'Sluis', 'Smallingerland', 'Soest', 'Someren', 'Son en Breugel', 'Spijkenisse', 'Stadskanaal', 'Staphorst', 'Stede Broec', 'Steenbergen', 'Steenwijkerland', 'Stein (L.)', 'Stichtse Vecht', 'Strijen', 'Sudwest-Fryslan', 'Terneuzen', 'Terschelling', 'Texel', 'Teylingen', 'Tholen', 'Tiel', 'Tilburg', 'Tubbergen', 'Twenterand', 'Tynaarlo', 'Tytsjerksteradiel', 'Ubbergen', 'Uden', 'Uitgeest', 'Uithoorn', 'Urk', 'Utrecht (gemeente)', 'Utrechtse Heuvelrug', 'Vaals', 'Valkenburg aan de Geul', 'Valkenswaard', 'Veendam', 'Veenendaal', 'Veere', 'Veghel', 'Veldhoven', 'Velsen', 'Venlo', 'Venray', 'Vianen', 'Vlaardingen', 'Vlagtwedde', 'Vlieland', 'Vlissingen', 'Vlist', 'Voerendaal', 'Voorschoten', 'Voorst', 'Vught', 'Waalre', 'Waalwijk', 'Waddinxveen', 'Wageningen', 'Wassenaar', 'Waterland', 'Weert', 'Weesp', 'Werkendam', 'West Maas en Waal', 'Westerveld', 'Westervoort', 'Westland', 'Weststellingwerf', 'Westvoorne', 'Wierden', 'Wijchen', 'Wijdemeren', 'Wijk bij Duurstede', 'Winsum', 'Winterswijk', 'Woensdrecht', 'Woerden', 'De Wolden', 'Wormerland', 'Woudenberg', 'Woudrichem', 'Zaanstad', 'Zaltbommel', 'Zandvoort', 'Zederik', 'Zeevang', 'Zeewolde', 'Zeist', 'Zevenaar', 'Zoetermeer', 'Zoeterwoude', 'Zuidhorn', 'Zuidplas', 'Zundert', 'Zutphen', 'Zwartewaterland', 'Zwijndrecht', 'Zwolle', 'Buitenland', 'Onbekend']

plaatsen = []
for line in csvf:
    data = line.strip().split(';')
    i=0
    # find the places from
    plaatsen_van_list = []
    for mensen in data[1:]:
        plaats_van = {"plaats":plaatsen_Nederland[i], "aantal_mensen": mensen}
        i+=1
        plaatsen_van_list.append(plaats_van)
    # find the place 
    data_plaats = {"plaats":data[0], "plaatsen_van":plaatsen_van_list}
    plaatsen.append(data_plaats)

plaatsen_js = {"plaatsen":plaatsen}




# write the data to the json-file
json.dump(plaatsen_js, jsonf)
jsonf.close()
csvf.close()

