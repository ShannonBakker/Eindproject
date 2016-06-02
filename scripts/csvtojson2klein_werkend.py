import json
import csv

def twee(jaartal_list, csv_van, csv_naar, jaar):
    plaatsen_Nederland = ['Aa en Hunze', 'Aalburg', 'Aalsmeer', 'Aalten', 'Achtkarspelen', 'Alblasserdam', 'Albrandswaard', 'Alkmaar', 'Almelo', 'Almere', 'Alphen aan den Rijn', 'Alphen-Chaam', 'Ameland', 'Amersfoort', 'Amstelveen', 'Amsterdam', 'Apeldoorn', 'Appingedam', 'Arnhem', 'Assen', 'Asten', 'Baarle-Nassau', 'Baarn', 'Barendrecht', 'Barneveld', 'Bedum', 'Beek (L.)', 'Beemster', 'Beesel', 'Bellingwedde', 'Bergambacht', 'Bergeijk', 'Bergen (L.)', 'Bergen (NH.)', 'Bergen op Zoom', 'Berkelland', 'Bernheze', 'Bernisse', 'Best', 'Beuningen', 'Beverwijk', 'het Bildt', 'De Bilt', 'Binnenmaas', 'Bladel', 'Blaricum', 'Bloemendaal', 'Bodegraven-Reeuwijk', 'Boekel', 'Ten Boer', 'Borger-Odoorn', 'Borne', 'Borsele', 'Boxmeer', 'Boxtel', 'Breda', 'Brielle', 'Bronckhorst', 'Brummen', 'Brunssum', 'Bunnik', 'Bunschoten', 'Buren', 'Bussum', 'Capelle aan den IJssel', 'Castricum', 'Coevorden', 'Cranendonck', 'Cromstrijen', 'Cuijk', 'Culemborg', 'Dalfsen', 'Dantumadiel', 'Delft', 'Delfzijl', 'Deurne', 'Deventer', 'Diemen', 'Dinkelland', 'Doesburg', 'Doetinchem', 'Dongen', 'Dongeradeel', 'Dordrecht', 'Drechterland', 'Drimmelen', 'Dronten', 'Druten', 'Duiven', 'Echt-Susteren', 'Edam-Volendam', 'Ede', 'Eemnes', 'Eemsmond', 'Eersel', 'Eijsden-Margraten', 'Eindhoven', 'Elburg', 'Emmen', 'Enkhuizen', 'Enschede', 'Epe', 'Ermelo', 'Etten-Leur', 'Ferwerderadiel', 'Franekeradeel', 'De Friese Meren', 'Geertruidenberg', 'Geldermalsen', 'Geldrop-Mierlo', 'Gemert-Bakel', 'Gennep', 'Giessenlanden', 'Gilze en Rijen', 'Goeree-Overflakkee', 'Goes', 'Goirle', 'Gorinchem', 'Gouda', 'Graft-De Rijp', 'Grave', "'s-Gravenhage (gemeente)", 'Groesbeek', 'Groningen (gemeente)', 'Grootegast', 'Gulpen-Wittem', 'Haaksbergen', 'Haaren', 'Haarlem', 'Haarlemmerliede en Spaarnwoude', 'Haarlemmermeer', 'Halderberge', 'Hardenberg', 'Harderwijk', 'Hardinxveld-Giessendam', 'Haren', 'Harlingen', 'Hattem', 'Heemskerk', 'Heemstede', 'Heerde', 'Heerenveen', 'Heerhugowaard', 'Heerlen', 'Heeze-Leende', 'Heiloo', 'Den Helder', 'Hellendoorn', 'Hellevoetsluis', 'Helmond', 'Hendrik-Ido-Ambacht', 'Hengelo (O.)', "'s-Hertogenbosch", 'Heumen', 'Heusden', 'Hillegom', 'Hilvarenbeek', 'Hilversum', 'Hof van Twente', 'Hollands Kroon', 'Hoogeveen', 'Hoogezand-Sappemeer', 'Hoorn', 'Horst aan de Maas', 'Houten', 'Huizen', 'Hulst', 'IJsselstein', 'Kaag en Braassem', 'Kampen', 'Kapelle', 'Katwijk', 'Kerkrade', 'Koggenland', 'Kollumerland en Nieuwkruisland', 'Korendijk', 'Krimpen aan den IJssel', 'Laarbeek', 'Landerd', 'Landgraaf', 'Landsmeer', 'Langedijk', 'Lansingerland', 'Laren (NH.)', 'Leek', 'Leerdam', 'Leeuwarden', 'Leeuwarderadeel', 'Leiden', 'Leiderdorp', 'Leidschendam-Voorburg', 'Lelystad', 'Leudal', 'Leusden', 'Lingewaal', 'Lingewaard', 'Lisse', 'Littenseradiel', 'Lochem', 'Loon op Zand', 'Lopik', 'Loppersum', 'Losser', 'Maasdonk', 'Maasdriel', 'Maasgouw', 'Maassluis', 'Maastricht', 'De Marne', 'Marum', 'Medemblik', 'Meerssen', 'Menameradiel', 'Menterwolde', 'Meppel', 'Middelburg (Z.)', 'Midden-Delfland', 'Midden-Drenthe', 'Mill en Sint Hubert', 'Millingen aan de Rijn', 'Moerdijk', 'Molenwaard', 'Montferland', 'Montfoort', 'Mook en Middelaar', 'Muiden', 'Naarden', 'Neder-Betuwe', 'Nederlek', 'Nederweert', 'Neerijnen', 'Nieuwegein', 'Nieuwkoop', 'Nijkerk', 'Nijmegen', 'Noord-Beveland', 'Noordenveld', 'Noordoostpolder', 'Noordwijk', 'Noordwijkerhout', 'Nuenen, Gerwen en Nederwetten', 'Nunspeet', 'Nuth', 'Oegstgeest', 'Oirschot', 'Oisterwijk', 'Oldambt', 'Oldebroek', 'Oldenzaal', 'Olst-Wijhe', 'Ommen', 'Onderbanken', 'Oost Gelre', 'Oosterhout', 'Ooststellingwerf', 'Oostzaan', 'Opmeer', 'Opsterland', 'Oss', 'Oud-Beijerland', 'Oude IJsselstreek', 'Ouder-Amstel', 'Ouderkerk', 'Oudewater', 'Overbetuwe', 'Papendrecht', 'Peel en Maas', 'Pekela', 'Pijnacker-Nootdorp', 'Purmerend', 'Putten', 'Raalte', 'Reimerswaal', 'Renkum', 'Renswoude', 'Reusel-De Mierden', 'Rheden', 'Rhenen', 'Ridderkerk', 'Rijnwaarden', 'Rijssen-Holten', 'Rijswijk (ZH.)', 'Roerdalen', 'Roermond', 'De Ronde Venen', 'Roosendaal', 'Rotterdam', 'Rozendaal', 'Rucphen', 'Schagen', 'Schermer', 'Scherpenzeel', 'Schiedam', 'Schiermonnikoog', 'Schijndel', 'Schinnen', 'Schoonhoven', 'Schouwen-Duiveland', 'Simpelveld', 'Sint Anthonis', 'Sint-Michielsgestel', 'Sint-Oedenrode', 'Sittard-Geleen', 'Sliedrecht', 'Slochteren', 'Sluis', 'Smallingerland', 'Soest', 'Someren', 'Son en Breugel', 'Spijkenisse', 'Stadskanaal', 'Staphorst', 'Stede Broec', 'Steenbergen', 'Steenwijkerland', 'Stein (L.)', 'Stichtse Vecht', 'Strijen', 'Sudwest-Fryslan', 'Terneuzen', 'Terschelling', 'Texel', 'Teylingen', 'Tholen', 'Tiel', 'Tilburg', 'Tubbergen', 'Twenterand', 'Tynaarlo', 'Tytsjerksteradiel', 'Ubbergen', 'Uden', 'Uitgeest', 'Uithoorn', 'Urk', 'Utrecht (gemeente)', 'Utrechtse Heuvelrug', 'Vaals', 'Valkenburg aan de Geul', 'Valkenswaard', 'Veendam', 'Veenendaal', 'Veere', 'Veghel', 'Veldhoven', 'Velsen', 'Venlo', 'Venray', 'Vianen', 'Vlaardingen', 'Vlagtwedde', 'Vlieland', 'Vlissingen', 'Vlist', 'Voerendaal', 'Voorschoten', 'Voorst', 'Vught', 'Waalre', 'Waalwijk', 'Waddinxveen', 'Wageningen', 'Wassenaar', 'Waterland', 'Weert', 'Weesp', 'Werkendam', 'West Maas en Waal', 'Westerveld', 'Westervoort', 'Westland', 'Weststellingwerf', 'Westvoorne', 'Wierden', 'Wijchen', 'Wijdemeren', 'Wijk bij Duurstede', 'Winsum', 'Winterswijk', 'Woensdrecht', 'Woerden', 'De Wolden', 'Wormerland', 'Woudenberg', 'Woudrichem', 'Zaanstad', 'Zaltbommel', 'Zandvoort', 'Zederik', 'Zeevang', 'Zeewolde', 'Zeist', 'Zevenaar', 'Zoetermeer', 'Zoeterwoude', 'Zuidhorn', 'Zuidplas', 'Zundert', 'Zutphen', 'Zwartewaterland', 'Zwijndrecht', 'Zwolle', 'Buitenland', 'Onbekend']
    #iterate over two files
    for line_van, line_naar in zip(csv_van, csv_naar):
        data_van = line_van.strip().split(';')

        # find the places from
        i=0
        plaatsen_van_list = []    
        for mensen_van in data_van[1:]:
            plaats_van = {"plaats":plaatsen_Nederland[i], "aantal_mensen": mensen_van}
            i+=1
            plaatsen_van_list.append(plaats_van)

        # find the places to
        data_naar= line_naar.strip().split(';')
        plaatsen_naar_list = [] 
        j=0
        for mensen_naar in data_naar[1:]:
            plaats_naar = {"plaats":plaatsen_Nederland[j], "aantal_mensen": mensen_naar}
            j+=1
            plaatsen_naar_list.append(plaats_naar)

        # return the year object
        jaartal = {"jaartal": jaar ,"plaatsen_van":plaatsen_van_list, "plaatsen_naar":plaatsen_naar_list}
        jaartal_list.append(jaartal)
        return jaartal_list

# functie om voor één jaar de json file te maken
def een_jaar():
    plaatsen = []
    csv_van = open('banen_woon_naar_werk_2014.csv', 'r')
    csv_naar = open('banen_werk_naar_woon_2014.csv','r')
    for line_van, line_naar in zip(csv_van, csv_naar):
        data_van = line_van.strip().split(';')
        jaartal_list = []
        csv_van = open('banen_woon_naar_werk_2014.csv', 'r')
        csv_naar = open('banen_werk_naar_woon_2014.csv','r')
        jaartal_list = twee(jaartal_list, csv_van, csv_naar, "2014")
        csv_van_2006 = open('banen_woon_naar_werk_2006.csv', 'r')
        csv_naar_2006 = open('banen_werk_naar_woon_2006.csv','r')
        jaartal_list = twee(jaartal_list, csv_van_2006, csv_naar_2006, "2006")
        data_plaats = {"Plaats":{"plaatsnaam":data_van[0], "jaar": jaartal_list}}
        plaatsen.append(data_plaats) 
    plaatsen_js = {"plaatsen":plaatsen}
    return plaatsen_js

jsonf = open('data.json', 'w+')
uitkomst = een_jaar()


# write the data to the json-file
json.dump(uitkomst, jsonf)
jsonf.close()


