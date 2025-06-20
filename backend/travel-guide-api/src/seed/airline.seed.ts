import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airline, AirlineDocument } from 'src/airlines/entities/airline.entity';
import { AppModule } from 'src/app.module';



const airlines = [
    {
      "name": "Emirates",
      "image": "https://api-ninjas.com/images/airline_logos/emirates.jpg"
    },
    {
      "name": "Qatar Airways",
      "image": "https://api-ninjas.com/images/airline_logos/qatar_airways.jpg"
    },
    {
      "name": "Etihad Airways",
      "image": "https://api-ninjas.com/images/airline_logos/etihad_airways.jpg"
    },
    {
      "name": "Saudi Arabian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/saudi_arabian_airlines.jpg"
    },
    {
      "name": "Oman Air",
      "image": "https://api-ninjas.com/images/airline_logos/oman_air.jpg"
    },
    {
      "name": "Gulf Air",
      "image": "https://api-ninjas.com/images/airline_logos/gulf_air.jpg"
    },
    {
      "name": "Kuwait Airways",
      "image": "https://api-ninjas.com/images/airline_logos/kuwait_airways.jpg"
    },
    {
      "name": "Royal Jordanian",
      "image": "https://api-ninjas.com/images/airline_logos/royal_jordanian.jpg"
    },
    {
      "name": "FlyDubai",
      "image": "https://api-ninjas.com/images/airline_logos/flydubai.jpg"
    },
    {
      "name": "Air Arabia",
      "image": "https://api-ninjas.com/images/airline_logos/air_arabia.jpg"
    },
    {
      "name": "Flynas",
      "image": "https://api-ninjas.com/images/airline_logos/flynas.jpg"
    },
    {
      "name": "Jazeera Airways",
      "image": "https://api-ninjas.com/images/airline_logos/jazeera_airways.jpg"
    },
    {
      "name": "Middle East Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/middle_east_airlines.jpg"
    },
    {
      "name": "Turkish Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/turkish_airlines.jpg"
    },
    {
      "name": "Pegasus Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/pegasus_airlines.jpg"
    },
    {
      "name": "Delta Air Lines",
      "image": "https://api-ninjas.com/images/airline_logos/delta_air_lines.jpg"
    },
    {
      "name": "American Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/american_airlines.jpg"
    },
    {
      "name": "United Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/united_airlines.jpg"
    },
    {
      "name": "Southwest Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/southwest_airlines.jpg"
    },
    {
      "name": "JetBlue",
      "image": "https://api-ninjas.com/images/airline_logos/jetblue.jpg"
    },
    {
      "name": "Alaska Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/alaska_airlines.jpg"
    },
    {
      "name": "Spirit Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/spirit_airlines.jpg"
    },
    {
      "name": "Frontier Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/frontier_airlines.jpg"
    },
    {
      "name": "Hawaiian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/hawaiian_airlines.jpg"
    },
    {
      "name": "Lufthansa",
      "image": "https://api-ninjas.com/images/airline_logos/lufthansa.jpg"
    },
    {
      "name": "British Airways",
      "image": "https://api-ninjas.com/images/airline_logos/british_airways.jpg"
    },
    {
      "name": "Air France",
      "image": "https://api-ninjas.com/images/airline_logos/air_france.jpg"
    },
    {
      "name": "KLM",
      "image": "https://api-ninjas.com/images/airline_logos/klm.jpg"
    },
    {
      "name": "Iberia",
      "image": "https://api-ninjas.com/images/airline_logos/iberia.jpg"
    },
    {
      "name": "Swiss International Air Lines",
      "image": "https://api-ninjas.com/images/airline_logos/swiss.jpg"
    },
    {
      "name": "Austrian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/austrian_airlines.jpg"
    },
    {
      "name": "SAS (Scandinavian Airlines)",
      "image": "https://api-ninjas.com/images/airline_logos/sas.jpg"
    },
    {
      "name": "Finnair",
      "image": "https://api-ninjas.com/images/airline_logos/finnair.jpg"
    },
    {
      "name": "Norwegian Air Shuttle",
      "image": "https://api-ninjas.com/images/airline_logos/norwegian.jpg"
    },
    {
      "name": "Ryanair",
      "image": "https://api-ninjas.com/images/airline_logos/ryanair.jpg"
    },
    {
      "name": "easyJet",
      "image": "https://api-ninjas.com/images/airline_logos/easyjet.jpg"
    },
    {
      "name": "Wizz Air",
      "image": "https://api-ninjas.com/images/airline_logos/wizz_air.jpg"
    },
    {
      "name": "TAP Air Portugal",
      "image": "https://api-ninjas.com/images/airline_logos/tap_air_portugal.jpg"
    },
    {
      "name": "Aeroflot",
      "image": "https://api-ninjas.com/images/airline_logos/aeroflot.jpg"
    },
    {
      "name": "Singapore Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/singapore_airlines.jpg"
    },
    {
      "name": "Cathay Pacific",
      "image": "https://api-ninjas.com/images/airline_logos/cathay_pacific.jpg"
    },
    {
      "name": "Qantas",
      "image": "https://api-ninjas.com/images/airline_logos/qantas.jpg"
    },
    {
      "name": "Air New Zealand",
      "image": "https://api-ninjas.com/images/airline_logos/air_new_zealand.jpg"
    },
    {
      "name": "Japan Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/japan_airlines.jpg"
    },
    {
      "name": "ANA (All Nippon Airways)",
      "image": "https://api-ninjas.com/images/airline_logos/ana.jpg"
    },
    {
      "name": "Korean Air",
      "image": "https://api-ninjas.com/images/airline_logos/korean_air.jpg"
    },
    {
      "name": "Asiana Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/asiana_airlines.jpg"
    },
    {
      "name": "China Southern Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/china_southern.jpg"
    },
    {
      "name": "China Eastern Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/china_eastern.jpg"
    },
    {
      "name": "Air China",
      "image": "https://api-ninjas.com/images/airline_logos/air_china.jpg"
    },
    {
      "name": "Hainan Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/hainan_airlines.jpg"
    },
    {
      "name": "Air India",
      "image": "https://api-ninjas.com/images/airline_logos/air_india.jpg"
    },
    {
      "name": "IndiGo",
      "image": "https://api-ninjas.com/images/airline_logos/indigo.jpg"
    },
    {
      "name": "SpiceJet",
      "image": "https://api-ninjas.com/images/airline_logos/spicejet.jpg"
    },
    {
      "name": "Vistara",
      "image": "https://api-ninjas.com/images/airline_logos/vistara.jpg"
    },
    {
      "name": "Malaysia Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/malaysia_airlines.jpg"
    },
    {
      "name": "AirAsia",
      "image": "https://api-ninjas.com/images/airline_logos/airasia.jpg"
    },
    {
      "name": "Thai Airways",
      "image": "https://api-ninjas.com/images/airline_logos/thai_airways.jpg"
    },
    {
      "name": "Vietnam Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/vietnam_airlines.jpg"
    },
    {
      "name": "Garuda Indonesia",
      "image": "https://api-ninjas.com/images/airline_logos/garuda_indonesia.jpg"
    },
    {
      "name": "Lion Air",
      "image": "https://api-ninjas.com/images/airline_logos/lion_air.jpg"
    },
    {
      "name": "Philippine Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/philippine_airlines.jpg"
    },
    {
      "name": "Cebu Pacific",
      "image": "https://api-ninjas.com/images/airline_logos/cebu_pacific.jpg"
    },
    {
      "name": "South African Airways",
      "image": "https://api-ninjas.com/images/airline_logos/south_african_airways.jpg"
    },
    {
      "name": "Ethiopian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/ethiopian_airlines.jpg"
    },
    {
      "name": "Kenya Airways",
      "image": "https://api-ninjas.com/images/airline_logos/kenya_airways.jpg"
    },
    {
      "name": "EgyptAir",
      "image": "https://api-ninjas.com/images/airline_logos/egyptair.jpg"
    },
    {
      "name": "Royal Air Maroc",
      "image": "https://api-ninjas.com/images/airline_logos/royal_air_maroc.jpg"
    },
    {
      "name": "Air Canada",
      "image": "https://api-ninjas.com/images/airline_logos/air_canada.jpg"
    },
    {
      "name": "WestJet",
      "image": "https://api-ninjas.com/images/airline_logos/westjet.jpg"
    },
    {
      "name": "Air Transat",
      "image": "https://api-ninjas.com/images/airline_logos/air_transat.jpg"
    },
    {
      "name": "Aeromexico",
      "image": "https://api-ninjas.com/images/airline_logos/aeromexico.jpg"
    },
    {
      "name": "LATAM Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/latam.jpg"
    },
    {
      "name": "Avianca",
      "image": "https://api-ninjas.com/images/airline_logos/avianca.jpg"
    },
    {
      "name": "Copa Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/copa_airlines.jpg"
    },
    {
      "name": "Azul Brazilian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/azul.jpg"
    },
    {
      "name": "GOL Linhas Aereas",
      "image": "https://api-ninjas.com/images/airline_logos/gol.jpg"
    },
    {
      "name": "Virgin Atlantic",
      "image": "https://api-ninjas.com/images/airline_logos/virgin_atlantic.jpg"
    },
    {
      "name": "Virgin Australia",
      "image": "https://api-ninjas.com/images/airline_logos/virgin_australia.jpg"
    },
    {
      "name": "Jetstar Airways",
      "image": "https://api-ninjas.com/images/airline_logos/jetstar.jpg"
    },
    {
      "name": "Bangkok Airways",
      "image": "https://api-ninjas.com/images/airline_logos/bangkok_airways.jpg"
    },
    {
      "name": "EVA Air",
      "image": "https://api-ninjas.com/images/airline_logos/eva_air.jpg"
    },
    {
      "name": "Scoot",
      "image": "https://api-ninjas.com/images/airline_logos/scoot.jpg"
    },
    {
      "name": "SriLankan Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/srilankan_airlines.jpg"
    },
    {
      "name": "Pakistan International Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/pia.jpg"
    },
    {
      "name": "Biman Bangladesh Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/biman.jpg"
    },
    {
      "name": "Nepal Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/nepal_airlines.jpg"
    },
    {
      "name": "Air Astana",
      "image": "https://api-ninjas.com/images/airline_logos/air_astana.jpg"
    },
    {
      "name": "Uzbekistan Airways",
      "image": "https://api-ninjas.com/images/airline_logos/uzbekistan_airways.jpg"
    },
    {
      "name": "Azerbaijan Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/azerbaijan_airlines.jpg"
    },
    {
      "name": "El Al Israel Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/el_al.jpg"
    },
    {
      "name": "Arkia",
      "image": "https://api-ninjas.com/images/airline_logos/arkia.jpg"
    },
    {
      "name": "Icelandair",
      "image": "https://api-ninjas.com/images/airline_logos/icelandair.jpg"
    },
    {
      "name": "Air Baltic",
      "image": "https://api-ninjas.com/images/airline_logos/air_baltic.jpg"
    },
    {
      "name": "LOT Polish Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/lot.jpg"
    },
    {
      "name": "Czech Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/czech_airlines.jpg"
    },
    {
      "name": "TAROM",
      "image": "https://api-ninjas.com/images/airline_logos/tarom.jpg"
    },
    {
      "name": "Bulgaria Air",
      "image": "https://api-ninjas.com/images/airline_logos/bulgaria_air.jpg"
    },
    {
      "name": "Air Serbia",
      "image": "https://api-ninjas.com/images/airline_logos/air_serbia.jpg"
    },
    {
      "name": "Croatia Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/croatia_airlines.jpg"
    },
    {
      "name": "Alitalia",
      "image": "https://api-ninjas.com/images/airline_logos/alitalia.jpg"
    },
    {
      "name": "ITA Airways",
      "image": "https://api-ninjas.com/images/airline_logos/ita_airways.jpg"
    },
    {
      "name": "Aegean Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/aegean.jpg"
    },
    {
      "name": "Olympic Air",
      "image": "https://api-ninjas.com/images/airline_logos/olympic_air.jpg"
    },
    {
      "name": "Air Malta",
      "image": "https://api-ninjas.com/images/airline_logos/air_malta.jpg"
    },
    {
      "name": "Tunisair",
      "image": "https://api-ninjas.com/images/airline_logos/tunisair.jpg"
    },
    {
      "name": "Libyan Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/libyan_airlines.jpg"
    },
    {
      "name": "Syrian Air",
      "image": "https://api-ninjas.com/images/airline_logos/syrian_air.jpg"
    },
    {
      "name": "Iraqi Airways",
      "image": "https://api-ninjas.com/images/airline_logos/iraqi_airways.jpg"
    },
    {
      "name": "Mahan Air",
      "image": "https://api-ninjas.com/images/airline_logos/mahan_air.jpg"
    },
    {
      "name": "Air Algerie",
      "image": "https://api-ninjas.com/images/airline_logos/air_algerie.jpg"
    },
    {
      "name": "Royal Brunei Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/royal_brunei.jpg"
    },
    {
      "name": "Fiji Airways",
      "image": "https://api-ninjas.com/images/airline_logos/fiji_airways.jpg"
    },
    {
      "name": "Air Tahiti Nui",
      "image": "https://api-ninjas.com/images/airline_logos/air_tahiti_nui.jpg"
    },
    {
      "name": "Samoa Airways",
      "image": "https://api-ninjas.com/images/airline_logos/samoa_airways.jpg"
    },
    {
      "name": "Air Vanuatu",
      "image": "https://api-ninjas.com/images/airline_logos/air_vanuatu.jpg"
    },
    {
      "name": "Solomon Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/solomon_airlines.jpg"
    },
    {
      "name": "Air Niugini",
      "image": "https://api-ninjas.com/images/airline_logos/air_niugini.jpg"
    },
    {
      "name": "Air Calin",
      "image": "https://api-ninjas.com/images/airline_logos/air_calin.jpg"
    },
    {
      "name": "Air Mauritius",
      "image": "https://api-ninjas.com/images/airline_logos/air_mauritius.jpg"
    },
    {
      "name": "Air Seychelles",
      "image": "https://api-ninjas.com/images/airline_logos/air_seychelles.jpg"
    },
    {
      "name": "RwandAir",
      "image": "https://api-ninjas.com/images/airline_logos/rwandair.jpg"
    },
    {
      "name": "TAAG Angola Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/taag.jpg"
    },
    {
      "name": "Air Namibia",
      "image": "https://api-ninjas.com/images/airline_logos/air_namibia.jpg"
    },
    {
      "name": "Precision Air",
      "image": "https://api-ninjas.com/images/airline_logos/precision_air.jpg"
    },
    {
      "name": "Fastjet",
      "image": "https://api-ninjas.com/images/airline_logos/fastjet.jpg"
    },
    {
      "name": "Air Zimbabwe",
      "image": "https://api-ninjas.com/images/airline_logos/air_zimbabwe.jpg"
    },
    {
      "name": "Malawian Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/malawian_airlines.jpg"
    },
    {
      "name": "Air Madagascar",
      "image": "https://api-ninjas.com/images/airline_logos/air_madagascar.jpg"
    },
    {
      "name": "Comair",
      "image": "https://api-ninjas.com/images/airline_logos/comair.jpg"
    },
    {
      "name": "Arik Air",
      "image": "https://api-ninjas.com/images/airline_logos/arik_air.jpg"
    },
    {
      "name": "Air Peace",
      "image": "https://api-ninjas.com/images/airline_logos/air_peace.jpg"
    },
    {
      "name": "ASKY Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/asky.jpg"
    },
    {
      "name": "Camair-Co",
      "image": "https://api-ninjas.com/images/airline_logos/camair_co.jpg"
    },
    {
      "name": "Air Cote d'Ivoire",
      "image": "https://api-ninjas.com/images/airline_logos/air_cote_divoire.jpg"
    },
    {
      "name": "Afriqiyah Airways",
      "image": "https://api-ninjas.com/images/airline_logos/afriqiyah.jpg"
    },
    {
      "name": "Air Senegal",
      "image": "https://api-ninjas.com/images/airline_logos/air_senegal.jpg"
    },
    {
      "name": "Cabo Verde Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/cabo_verde.jpg"
    },
    {
      "name": "Binter Canarias",
      "image": "https://api-ninjas.com/images/airline_logos/binter.jpg"
    },
    {
      "name": "Air Europa",
      "image": "https://api-ninjas.com/images/airline_logos/air_europa.jpg"
    },
    {
      "name": "Vueling",
      "image": "https://api-ninjas.com/images/airline_logos/vueling.jpg"
    },
    {
      "name": "Volotea",
      "image": "https://api-ninjas.com/images/airline_logos/volotea.jpg"
    },
    {
      "name": "Blue Air",
      "image": "https://api-ninjas.com/images/airline_logos/blue_air.jpg"
    },
    {
      "name": "Smartwings",
      "image": "https://api-ninjas.com/images/airline_logos/smartwings.jpg"
    },
    {
      "name": "SunExpress",
      "image": "https://api-ninjas.com/images/airline_logos/sunexpress.jpg"
    },
    {
      "name": "Corendon Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/corendon.jpg"
    },
    {
      "name": "AtlasGlobal",
      "image": "https://api-ninjas.com/images/airline_logos/atlasglobal.jpg"
    },
    {
      "name": "Onur Air",
      "image": "https://api-ninjas.com/images/airline_logos/onur_air.jpg"
    },
    {
      "name": "Freebird Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/freebird.jpg"
    },
    {
      "name": "Tailwind Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/tailwind.jpg"
    },
    {
      "name": "MNG Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/mng.jpg"
    },
    {
      "name": "Southwind Airlines",
      "image": "https://api-ninjas.com/images/airline_logos/southwind.jpg"
    }
  ]

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const AirlineModel = app.get<Model<AirlineDocument>>(getModelToken(Airline.name));
  
    await AirlineModel.deleteMany(); 
    await AirlineModel.insertMany(airlines);
  
    console.log('✅ Airlines seeded!');
    await app.close();
  }
  
  bootstrap();
  