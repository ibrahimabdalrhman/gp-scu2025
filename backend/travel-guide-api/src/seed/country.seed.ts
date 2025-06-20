import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from '../country/entities/country.entity';
import { AppModule } from 'src/app.module';

const countries = [
    {
      name: 'Egypt',
      description: 'Country in North Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg'],
    },
    {
      name: 'France',
      description: 'European country known for art and fashion',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'],
    },
    {
      name: 'Italy',
      description: 'Home of the Colosseum and beautiful coastline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg'],
    },
    {
      name: 'Japan',
      description: 'Country in East Asia with rich culture and technology',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg'],
    },
    {
      name: 'United States',
      description: 'A large and diverse country in North America',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg'],
    },
    {
      name: 'Turkey',
      description: 'Bridge between Europe and Asia',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg'],
    },
    {
      name: 'United Arab Emirates',
      description: 'A modern Gulf country known for skyscrapers',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg'],
    },
    {
      name: 'India',
      description: 'Diverse culture and large population',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg'],
    },
    {
      name: 'China',
      description: 'Most populous country, rich in history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg'],
    },
    {
      name: 'Russia',
      description: 'Largest country in the world by area',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg'],
    },
    {
      name: 'Canada',
      description: 'Second largest country with natural beauty',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg'],
    },
    {
      name: 'Saudi Arabia',
      description: 'Home of Mecca and oil resources',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg'],
    },
    {
      name: 'United Kingdom',
      description: 'An island nation in Europe',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg'],
    },
    {
      name: 'Germany',
      description: 'Known for its history and technology',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg'],
    },
    {
      name: 'Brazil',
      description: 'Largest country in South America known for its Amazon rainforest',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg'],
    },
    {
      name: 'Spain',
      description: 'Known for its culture, beaches and architecture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg'],
    },
    {
      name: 'Portugal',
      description: 'Western European country with Atlantic coastline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg'],
    },
    {
      name: 'Greece',
      description: 'Birthplace of democracy with ancient ruins',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg'],
    },
    {
      name: 'Austria',
      description: 'Alpine country with musical heritage',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg'],
    },
    {
      name: 'Belgium',
      description: 'Known for medieval towns and EU headquarters',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg'],
    },
    {
      name: 'Netherlands',
      description: 'Famous for windmills, tulips and canals',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg'],
    },
    {
      name: 'Sweden',
      description: 'Scandinavian country with forests and lakes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg'],
    },
    {
      name: 'Norway',
      description: 'Known for fjords and Viking history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg'],
    },
    {
      name: 'Denmark',
      description: 'Nordic country with royal history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg'],
    },
    {
      name: 'Finland',
      description: 'Land of thousands of lakes and saunas',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg'],
    },
    {
      name: 'Ireland',
      description: 'Emerald Isle with lush landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg'],
    },
    {
      name: 'Poland',
      description: 'Central European country with medieval history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg'],
    },
    {
      name: 'Czech Republic',
      description: 'Known for Prague and beer culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg'],
    },
    {
      name: 'Hungary',
      description: 'Landlocked country with thermal baths',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg'],
    },
    {
      name: 'Romania',
      description: 'Home of Transylvania and Carpathian Mountains',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg'],
    },
    {
      name: 'Bulgaria',
      description: 'Balkan country with Black Sea coastline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg'],
    },
    {
      name: 'Serbia',
      description: 'Country at the crossroads of Central and Southeast Europe',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg'],
    },
    {
      name: 'Croatia',
      description: 'Adriatic coastline with medieval cities',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg'],
    },
    {
      name: 'Slovenia',
      description: 'Small country with Alpine scenery',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg'],
    },
    {
      name: 'Slovakia',
      description: 'Landlocked country with mountainous north',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg'],
    },
    {
      name: 'Lithuania',
      description: 'Baltic country with medieval old towns',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg'],
    },
    {
      name: 'Latvia',
      description: 'Baltic country with Art Nouveau architecture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg'],
    },
    {
      name: 'Estonia',
      description: 'Digital society with medieval heritage',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg'],
    },
    {
      name: 'Ukraine',
      description: 'Largest country entirely in Europe',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg'],
    },
    {
      name: 'Belarus',
      description: 'Eastern European country with forests',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg'],
    },
    {
      name: 'Georgia',
      description: 'Caucasus country with ancient history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg'],
    },
    {
      name: 'Armenia',
      description: 'First country to adopt Christianity',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg'],
    },
    {
      name: 'Azerbaijan',
      description: 'Country at the crossroads of Eastern Europe and Western Asia',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg'],
    },
    {
      name: 'Cyprus',
      description: 'Mediterranean island with Greek and Turkish influences',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg'],
    },
    {
      name: 'Israel',
      description: 'Holy Land with religious significance',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg'],
    },
    {
      name: 'Lebanon',
      description: 'Middle Eastern country with Mediterranean coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg'],
    },
    {
      name: 'Syria',
      description: 'Country with ancient history in the Middle East',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg'],
    },
    {
      name: 'Jordan',
      description: 'Home to Petra and desert landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg'],
    },
    {
      name: 'Iraq',
      description: 'Country with ancient Mesopotamian history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg'],
    },
    {
      name: 'Iran',
      description: 'Persian civilization with rich culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg'],
    },
    {
      name: 'Afghanistan',
      description: 'Landlocked country in Central Asia',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg'],
    },
    {
      name: 'Pakistan',
      description: 'South Asian country with diverse landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg'],
    },
    {
      name: 'Bangladesh',
      description: 'Riverine country with mangrove forests',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg'],
    },
    {
      name: 'Nepal',
      description: 'Home to Mount Everest and Himalayas',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg'],
    },
    {
      name: 'Bhutan',
      description: 'Himalayan kingdom with Buddhist culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg'],
    },
    {
      name: 'Sri Lanka',
      description: 'Island nation with tea plantations',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg'],
    },
    {
      name: 'Maldives',
      description: 'Tropical paradise with coral atolls',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg'],
    },
    {
      name: 'Mongolia',
      description: 'Vast country with nomadic traditions',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg'],
    },
    {
      name: 'North Korea',
      description: 'East Asian country with closed society',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg'],
    },
    {
      name: 'South Korea',
      description: 'Technologically advanced East Asian country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg'],
    },
    {
      name: 'Thailand',
      description: 'Known for beaches, temples and cuisine',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg'],
    },
    {
      name: 'Vietnam',
      description: 'Southeast Asian country with coastline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'],
    },
    {
      name: 'Laos',
      description: 'Landlocked country in Southeast Asia',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg'],
    },
    {
      name: 'Cambodia',
      description: 'Home of Angkor Wat temple complex',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg'],
    },
    {
      name: 'Malaysia',
      description: 'Southeast Asian country with diverse culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg'],
    },
    {
      name: 'Singapore',
      description: 'City-state with modern skyline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg'],
    },
    {
      name: 'Indonesia',
      description: 'Archipelago with thousands of islands',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg'],
    },
    {
      name: 'Philippines',
      description: 'Southeast Asian archipelago',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg'],
    },
    {
      name: 'Brunei',
      description: 'Small oil-rich sultanate',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg'],
    },
    {
      name: 'East Timor',
      description: 'Youngest country in Southeast Asia',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg'],
    },
    {
      name: 'Australia',
      description: 'Country and continent with unique wildlife',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'],
    },
    {
      name: 'New Zealand',
      description: 'Island country with stunning landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg'],
    },
    {
      name: 'Papua New Guinea',
      description: 'Tropical country with diverse tribes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg'],
    },
    {
      name: 'Fiji',
      description: 'Pacific island nation',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg'],
    },
    {
      name: 'Tonga',
      description: 'Polynesian kingdom',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg'],
    },
    {
      name: 'Samoa',
      description: 'Pacific island country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg'],
    },
    {
      name: 'Tuvalu',
      description: 'Small island nation in the Pacific',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tuvalu.svg'],
    },
    {
      name: 'Kiribati',
      description: 'Island nation spanning equator',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg'],
    },
    {
      name: 'Marshall Islands',
      description: 'Pacific island country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg'],
    },
    {
      name: 'Micronesia',
      description: 'Pacific island country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg'],
    },
    {
      name: 'Nauru',
      description: 'Smallest island nation',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg'],
    },
    {
      name: 'Solomon Islands',
      description: 'Pacific island country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg'],
    },
    {
      name: 'Vanuatu',
      description: 'Pacific island archipelago',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg'],
    },
    {
      name: 'Algeria',
      description: 'Largest African country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg'],
    },
    {
      name: 'Tunisia',
      description: 'North African country with Mediterranean coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg'],
    },
    {
      name: 'Libya',
      description: 'North African country with desert landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg'],
    },
    {
      name: 'Morocco',
      description: 'North African country with diverse culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg'],
    },
    {
      name: 'Mauritania',
      description: 'West African country with Sahara desert',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg'],
    },
    {
      name: 'Mali',
      description: 'West African country with rich history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg'],
    },
    {
      name: 'Burkina Faso',
      description: 'Landlocked West African country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg'],
    },
    {
      name: 'Niger',
      description: 'West African country named after Niger River',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg'],
    },
    {
      name: 'Guinea',
      description: 'West African country with mineral resources',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg'],
    },
    {
      name: 'Senegal',
      description: 'West African country with French influence',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg'],
    },
    {
      name: 'Gambia',
      description: 'Smallest mainland African country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg'],
    },
    {
      name: 'Guinea-Bissau',
      description: 'West African country with islands',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg'],
    },
    {
      name: 'Sierra Leone',
      description: 'West African country with Atlantic coastline',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg'],
    },
    {
      name: 'Liberia',
      description: 'West African country founded by freed slaves',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg'],
    },
    {
      name: 'Ivory Coast',
      description: 'West African country with French influence',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg'],
    },
    {
      name: 'Ghana',
      description: 'West African country with gold coast history',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg'],
    },
    {
      name: 'Togo',
      description: 'West African country with palm-lined beaches',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg'],
    },
    {
      name: 'Benin',
      description: 'West African country with voodoo culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg'],
    },
    {
      name: 'Cameroon',
      description: 'Central African country with diverse geography',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg'],
    },
    {
      name: 'Central African Republic',
      description: 'Landlocked country in Central Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg'],
    },
    {
      name: 'Chad',
      description: 'Landlocked country in Central Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg'],
    },
    {
      name: 'Republic of the Congo',
      description: 'Central African country with rainforest',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg'],
    },
    {
      name: 'Democratic Republic of the Congo',
      description: 'Central African country with vast resources',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg'],
    },
    {
      name: 'Uganda',
      description: 'East African country with mountain gorillas',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg'],
    },
    {
      name: 'Kenya',
      description: 'East African country with wildlife safaris',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg'],
    },
    {
      name: 'Tanzania',
      description: 'East African country with Mount Kilimanjaro',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg'],
    },
    {
      name: 'Rwanda',
      description: 'Land of a thousand hills',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg'],
    },
    {
      name: 'Burundi',
      description: 'Small East African country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'],
    },
    {
      name: 'Angola',
      description: 'Southwest African country with oil resources',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg'],
    },
    {
      name: 'Zambia',
      description: 'Landlocked country in Southern Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg'],
    },
    {
      name: 'Zimbabwe',
      description: 'Landlocked country in Southern Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg'],
    },
    {
      name: 'Mozambique',
      description: 'Southeast African country with Indian Ocean coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg'],
    },
    {
      name: 'Namibia',
      description: 'Southwest African country with desert landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg'],
    },
    {
      name: 'Botswana',
      description: 'Landlocked country with Okavango Delta',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg'],
    },
    {
      name: 'South Africa',
      description: 'Country at Africa\'s southern tip',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg'],
    },
    {
      name: 'Lesotho',
      description: 'Mountainous kingdom within South Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Lesotho.svg'],
    },
    {
      name: 'Eswatini',
      description: 'Small landlocked kingdom in Southern Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Eswatini.svg'],
    },
    {
      name: 'Madagascar',
      description: 'Island nation with unique wildlife',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg'],
    },
    {
      name: 'Mauritius',
      description: 'Island nation in Indian Ocean',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg'],
    },
    {
      name: 'Seychelles',
      description: 'Archipelago in Indian Ocean',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg'],
    },
    {
      name: 'Comoros',
      description: 'Volcanic archipelago off Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg'],
    },
    {
      name: 'São Tomé and Príncipe',
      description: 'Island nation in Gulf of Guinea',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg'],
    },
    {
      name: 'Equatorial Guinea',
      description: 'Central African country with Spanish influence',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg'],
    },
    {
      name: 'Djibouti',
      description: 'Small country in Horn of Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg'],
    },
    {
      name: 'Eritrea',
      description: 'Northeast African country on Red Sea',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg'],
    },
    {
      name: 'Ethiopia',
      description: 'Ancient African country with unique culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg'],
    },
    {
      name: 'Somalia',
      description: 'Country in Horn of Africa',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg'],
    },
    {
      name: 'South Sudan',
      description: 'World\'s newest country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_South_Sudan.svg'],
    },
    {
      name: 'Sudan',
      description: 'North African country with Nile River',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg'],
    },
    {
      name: 'Mexico',
      description: 'North American country with rich culture',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg'],
    },
    {
      name: 'Guatemala',
      description: 'Central American country with Mayan heritage',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg'],
    },
    {
      name: 'El Salvador',
      description: 'Smallest Central American country',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg'],
    },
    {
      name: 'Honduras',
      description: 'Central American country with Caribbean coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg'],
    },
    {
      name: 'Nicaragua',
      description: 'Largest country in Central America',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg'],
    },
    {
      name: 'Costa Rica',
      description: 'Central American country with biodiversity',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica.svg'],
    },
    {
      name: 'Panama',
      description: 'Central American country with famous canal',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg'],
    },
    {
      name: 'Cuba',
      description: 'Caribbean island nation',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg'],
    },
    {
      name: 'Dominican Republic',
      description: 'Caribbean country with resorts',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg'],
    },
    {
      name: 'Haiti',
      description: 'Caribbean country with French heritage',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg'],
    },
    {
      name: 'Jamaica',
      description: 'Caribbean island known for reggae music',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg'],
    },
    {
      name: 'Bahamas',
      description: 'Caribbean archipelago',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg'],
    },
    {
      name: 'Barbados',
      description: 'Caribbean island nation',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg'],
    },
    {
      name: 'Saint Lucia',
      description: 'Caribbean island with Pitons',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg'],
    },
    {
      name: 'Grenada',
      description: 'Caribbean island known as Spice Isle',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg'],
    },
    {
      name: 'Saint Kitts and Nevis',
      description: 'Smallest country in the Americas',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg'],
    },
    {
      name: 'Saint Vincent and the Grenadines',
      description: 'Caribbean island chain',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg'],
    },
    {
      name: 'Dominica',
      description: 'Caribbean nature island',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg'],
    },
    {
      name: 'Trinidad and Tobago',
      description: 'Twin-island Caribbean nation',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg'],
    },
    {
      name: 'Colombia',
      description: 'South American country with coffee region',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg'],
    },
    {
      name: 'Venezuela',
      description: 'South American country with Angel Falls',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg'],
    },
    {
      name: 'Guyana',
      description: 'Only English-speaking country in South America',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg'],
    },
    {
      name: 'Suriname',
      description: 'Smallest country in South America',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg'],
    },
    {
      name: 'Ecuador',
      description: 'Country on the equator with Galapagos Islands',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg'],
    },
    {
      name: 'Peru',
      description: 'Home of Machu Picchu',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg'],
    },
    {
      name: 'Bolivia',
      description: 'Landlocked country with salt flats',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg'],
    },
    {
      name: 'Paraguay',
      description: 'Landlocked country in South America',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg'],
    },
    {
      name: 'Chile',
      description: 'Long, narrow country along South America\'s west coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg'],
    },
    {
      name: 'Argentina',
      description: 'Large South American country with diverse landscapes',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'],
    },
    {
      name: 'Uruguay',
      description: 'Small South American country with Atlantic coast',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg'],
    },
    {
      name: 'Puerto Rico',
      description: 'Caribbean island territory of the United States',
      images:[ 'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg'],
    }
  ];


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const countryModel = app.get<Model<CountryDocument>>(getModelToken(Country.name));

  await countryModel.deleteMany(); // لحذف القديم
  await countryModel.insertMany(countries);

  console.log('✅ Countries seeded!');
  await app.close();
}

bootstrap();
