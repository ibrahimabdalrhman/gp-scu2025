import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from 'src/app.module';
import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const countryModel = app.get<Model<Country>>(getModelToken(Country.name));
  const cityModel = app.get<Model<City>>(getModelToken(City.name));

  const countries = await countryModel.find();

  if (countries.length === 0) {
    console.log('❌ No countries found. Run country.seed.ts first.');
    process.exit(1);
  }

  const sampleCities = [
    { name: 'Cairo', description: 'Capital of Egypt', countryName: 'Egypt' },
  { name: 'Alexandria', description: 'Mediterranean port city', countryName: 'Egypt' },
  { name: 'Giza', description: 'Home of the Great Pyramids', countryName: 'Egypt' },
  { name: 'Luxor', description: 'Ancient city with temples', countryName: 'Egypt' },
  { name: 'Aswan', description: 'Nubian city on the Nile', countryName: 'Egypt' },
  { name: 'Port Said', description: 'Suez Canal entrance city', countryName: 'Egypt' },
  { name: 'Suez', description: 'Southern Suez Canal city', countryName: 'Egypt' },
  { name: 'Ismailia', description: 'Canal city between Suez and Port Said', countryName: 'Egypt' },
  { name: 'Damietta', description: 'Port on Nile Delta', countryName: 'Egypt' },
  { name: 'Mansoura', description: 'Capital of Dakahlia Governorate', countryName: 'Egypt' },
  { name: 'Tanta', description: 'Major city in Nile Delta', countryName: 'Egypt' },
  { name: 'Asyut', description: 'Largest city in Upper Egypt', countryName: 'Egypt' },
  { name: 'Faiyum', description: 'City with ancient water wheels', countryName: 'Egypt' },
  { name: 'Zagazig', description: 'Capital of Sharqia Governorate', countryName: 'Egypt' },
  { name: 'Ismailia', description: 'Canal city', countryName: 'Egypt' },
  { name: 'Kafr El Sheikh', description: 'Agricultural city in Nile Delta', countryName: 'Egypt' },
  { name: 'Assiut', description: 'Important Upper Egyptian city', countryName: 'Egypt' },
  { name: 'Damanhur', description: 'Capital of Beheira Governorate', countryName: 'Egypt' },
  { name: 'Minya', description: 'Middle Egypt cultural center', countryName: 'Egypt' },
  { name: 'Beni Suef', description: 'Agricultural city on Nile', countryName: 'Egypt' },
  { name: 'Qena', description: 'Nile city near Luxor', countryName: 'Egypt' },
  { name: 'Sohag', description: 'Upper Egyptian city', countryName: 'Egypt' },
  { name: 'Hurghada', description: 'Red Sea resort city', countryName: 'Egypt' },
  { name: 'Sharm El Sheikh', description: 'Sinai resort city', countryName: 'Egypt' },
  { name: 'Arish', description: 'Capital of North Sinai', countryName: 'Egypt' },
  { name: 'Marsa Matruh', description: 'Mediterranean coastal city', countryName: 'Egypt' },
  { name: 'El Mahalla El Kubra', description: 'Industrial textile city', countryName: 'Egypt' },
  { name: '10th of Ramadan City', description: 'Industrial city', countryName: 'Egypt' },
  { name: '6th of October City', description: 'Satellite city of Cairo', countryName: 'Egypt' },
  { name: 'New Cairo', description: 'Modern extension of Cairo', countryName: 'Egypt' },
  { name: 'Shebin El Kom', description: 'Capital of Monufia Governorate', countryName: 'Egypt' },
  { name: 'Banha', description: 'Capital of Qalyubia Governorate', countryName: 'Egypt' },
  { name: 'Qalyub', description: 'Nile Delta city', countryName: 'Egypt' },
  { name: 'Rosetta', description: 'Historic Nile mouth city', countryName: 'Egypt' },
  { name: 'Edku', description: 'Mediterranean coastal town', countryName: 'Egypt' },
  { name: 'Desouk', description: 'Nile Delta city', countryName: 'Egypt' },
  { name: 'Abu Kabir', description: 'Sharqia Governorate city', countryName: 'Egypt' },
  { name: 'El Tor', description: 'Capital of South Sinai', countryName: 'Egypt' },
  { name: 'Ras Gharib', description: 'Red Sea coastal city', countryName: 'Egypt' },
  { name: 'Safaga', description: 'Red Sea port city', countryName: 'Egypt' },
  { name: 'El Kharga', description: 'Oasis city in Western Desert', countryName: 'Egypt' },
  { name: 'Dakhla', description: 'Western Desert oasis', countryName: 'Egypt' },
  { name: 'Farafra', description: 'Smallest Western Desert oasis', countryName: 'Egypt' },
  { name: 'Bahariya', description: 'Oasis near Cairo', countryName: 'Egypt' },
  { name: 'Siwa', description: 'Remote desert oasis', countryName: 'Egypt' },
  { name: 'St. Catherine', description: 'Sinai mountain city', countryName: 'Egypt' },
  { name: 'Rafah', description: 'Border city with Gaza', countryName: 'Egypt' },
  { name: 'El Arish', description: 'Capital of North Sinai', countryName: 'Egypt' },
  { name: 'Bir El Abd', description: 'North Sinai city', countryName: 'Egypt' },
  { name: 'El Qantara', description: 'Suez Canal crossing city', countryName: 'Egypt' },
  { name: 'New Valley', description: 'Western Desert capital', countryName: 'Egypt' },
    { name: 'Paris', description: 'Capital of France', countryName: 'France' },
    { name: 'Rome', description: 'Capital of Italy', countryName: 'Italy' },
    { name: 'Tokyo', description: 'Capital of Japan', countryName: 'Japan' },
    { name: 'New York', description: 'Largest city in USA', countryName: 'United States' },
    { name: 'Istanbul', description: 'Largest city in Turkey', countryName: 'Turkey' },
    { name: 'Dubai', description: 'Most populous city in UAE', countryName: 'United Arab Emirates' },
    { name: 'Mumbai', description: 'Financial capital of India', countryName: 'India' },
    { name: 'Beijing', description: 'Capital of China', countryName: 'China' },
    { name: 'Moscow', description: 'Capital of Russia', countryName: 'Russia' },
    { name: 'Toronto', description: 'Largest city in Canada', countryName: 'Canada' },
    { name: 'Riyadh', description: 'Capital of Saudi Arabia', countryName: 'Saudi Arabia' },
    { name: 'London', description: 'Capital of England', countryName: 'United Kingdom' },
    { name: 'Berlin', description: 'Capital of Germany', countryName: 'Germany' },
    { name: 'Madrid', description: 'Capital of Spain', countryName: 'Spain' },
    { name: 'Lisbon', description: 'Capital of Portugal', countryName: 'Portugal' },
    { name: 'Athens', description: 'Capital of Greece', countryName: 'Greece' },
    { name: 'Vienna', description: 'Capital of Austria', countryName: 'Austria' },
    { name: 'Brussels', description: 'Capital of Belgium', countryName: 'Belgium' },
    { name: 'Amsterdam', description: 'Capital of Netherlands', countryName: 'Netherlands' },
    { name: 'Stockholm', description: 'Capital of Sweden', countryName: 'Sweden' },
    { name: 'Oslo', description: 'Capital of Norway', countryName: 'Norway' },
    { name: 'Copenhagen', description: 'Capital of Denmark', countryName: 'Denmark' },
    { name: 'Helsinki', description: 'Capital of Finland', countryName: 'Finland' },
    { name: 'Dublin', description: 'Capital of Ireland', countryName: 'Ireland' },
    { name: 'Warsaw', description: 'Capital of Poland', countryName: 'Poland' },
    { name: 'Prague', description: 'Capital of Czech Republic', countryName: 'Czech Republic' },
    { name: 'Budapest', description: 'Capital of Hungary', countryName: 'Hungary' },
    { name: 'Bucharest', description: 'Capital of Romania', countryName: 'Romania' },
    { name: 'Sofia', description: 'Capital of Bulgaria', countryName: 'Bulgaria' },
    { name: 'Belgrade', description: 'Capital of Serbia', countryName: 'Serbia' },
    { name: 'Zagreb', description: 'Capital of Croatia', countryName: 'Croatia' },
    { name: 'Ljubljana', description: 'Capital of Slovenia', countryName: 'Slovenia' },
    { name: 'Bratislava', description: 'Capital of Slovakia', countryName: 'Slovakia' },
    { name: 'Vilnius', description: 'Capital of Lithuania', countryName: 'Lithuania' },
    { name: 'Riga', description: 'Capital of Latvia', countryName: 'Latvia' },
    { name: 'Tallinn', description: 'Capital of Estonia', countryName: 'Estonia' },
    { name: 'Kiev', description: 'Capital of Ukraine', countryName: 'Ukraine' },
    { name: 'Minsk', description: 'Capital of Belarus', countryName: 'Belarus' },
    { name: 'Ankara', description: 'Capital of Turkey', countryName: 'Turkey' },
    { name: 'Tbilisi', description: 'Capital of Georgia', countryName: 'Georgia' },
    { name: 'Yerevan', description: 'Capital of Armenia', countryName: 'Armenia' },
    { name: 'Baku', description: 'Capital of Azerbaijan', countryName: 'Azerbaijan' },
    { name: 'Nicosia', description: 'Capital of Cyprus', countryName: 'Cyprus' },
    { name: 'Beirut', description: 'Capital of Lebanon', countryName: 'Lebanon' },
    { name: 'Damascus', description: 'Capital of Syria', countryName: 'Syria' },
    { name: 'Amman', description: 'Capital of Jordan', countryName: 'Jordan' },
    { name: 'Baghdad', description: 'Capital of Iraq', countryName: 'Iraq' },
    { name: 'Tehran', description: 'Capital of Iran', countryName: 'Iran' },
    { name: 'Kabul', description: 'Capital of Afghanistan', countryName: 'Afghanistan' },
    { name: 'Islamabad', description: 'Capital of Pakistan', countryName: 'Pakistan' },
    { name: 'New Delhi', description: 'Capital of India', countryName: 'India' },
    { name: 'Dhaka', description: 'Capital of Bangladesh', countryName: 'Bangladesh' },
    { name: 'Kathmandu', description: 'Capital of Nepal', countryName: 'Nepal' },
    { name: 'Thimphu', description: 'Capital of Bhutan', countryName: 'Bhutan' },
    { name: 'Colombo', description: 'Commercial capital of Sri Lanka', countryName: 'Sri Lanka' },
    { name: 'Male', description: 'Capital of Maldives', countryName: 'Maldives' },
    { name: 'Ulaanbaatar', description: 'Capital of Mongolia', countryName: 'Mongolia' },
    { name: 'Pyongyang', description: 'Capital of North Korea', countryName: 'North Korea' },
    { name: 'Seoul', description: 'Capital of South Korea', countryName: 'South Korea' },
    { name: 'Bangkok', description: 'Capital of Thailand', countryName: 'Thailand' },
    { name: 'Hanoi', description: 'Capital of Vietnam', countryName: 'Vietnam' },
    { name: 'Vientiane', description: 'Capital of Laos', countryName: 'Laos' },
    { name: 'Phnom Penh', description: 'Capital of Cambodia', countryName: 'Cambodia' },
    { name: 'Kuala Lumpur', description: 'Capital of Malaysia', countryName: 'Malaysia' },
    { name: 'Singapore', description: 'Capital of Singapore', countryName: 'Singapore' },
    { name: 'Jakarta', description: 'Capital of Indonesia', countryName: 'Indonesia' },
    { name: 'Manila', description: 'Capital of Philippines', countryName: 'Philippines' },
    { name: 'Bandar Seri Begawan', description: 'Capital of Brunei', countryName: 'Brunei' },
    { name: 'Dili', description: 'Capital of East Timor', countryName: 'East Timor' },
    { name: 'Canberra', description: 'Capital of Australia', countryName: 'Australia' },
    { name: 'Wellington', description: 'Capital of New Zealand', countryName: 'New Zealand' },
    { name: 'Port Moresby', description: 'Capital of Papua New Guinea', countryName: 'Papua New Guinea' },
    { name: 'Suva', description: 'Capital of Fiji', countryName: 'Fiji' },
    { name: 'Nuku\'alofa', description: 'Capital of Tonga', countryName: 'Tonga' },
    { name: 'Apia', description: 'Capital of Samoa', countryName: 'Samoa' },
    { name: 'Funafuti', description: 'Capital of Tuvalu', countryName: 'Tuvalu' },
    { name: 'Tarawa', description: 'Capital of Kiribati', countryName: 'Kiribati' },
    { name: 'Majuro', description: 'Capital of Marshall Islands', countryName: 'Marshall Islands' },
    { name: 'Palikir', description: 'Capital of Micronesia', countryName: 'Micronesia' },
    { name: 'Yaren', description: 'Capital of Nauru', countryName: 'Nauru' },
    { name: 'Honiara', description: 'Capital of Solomon Islands', countryName: 'Solomon Islands' },
    { name: 'Port Vila', description: 'Capital of Vanuatu', countryName: 'Vanuatu' },
    { name: 'Algiers', description: 'Capital of Algeria', countryName: 'Algeria' },
    { name: 'Tunis', description: 'Capital of Tunisia', countryName: 'Tunisia' },
    { name: 'Tripoli', description: 'Capital of Libya', countryName: 'Libya' },
    { name: 'Rabat', description: 'Capital of Morocco', countryName: 'Morocco' },
    { name: 'Nouakchott', description: 'Capital of Mauritania', countryName: 'Mauritania' },
    { name: 'Bamako', description: 'Capital of Mali', countryName: 'Mali' },
    { name: 'Ouagadougou', description: 'Capital of Burkina Faso', countryName: 'Burkina Faso' },
    { name: 'Niamey', description: 'Capital of Niger', countryName: 'Niger' },
    { name: 'Conakry', description: 'Capital of Guinea', countryName: 'Guinea' },
    { name: 'Dakar', description: 'Capital of Senegal', countryName: 'Senegal' },
    { name: 'Banjul', description: 'Capital of Gambia', countryName: 'Gambia' },
    { name: 'Bissau', description: 'Capital of Guinea-Bissau', countryName: 'Guinea-Bissau' },
    { name: 'Freetown', description: 'Capital of Sierra Leone', countryName: 'Sierra Leone' },
    { name: 'Monrovia', description: 'Capital of Liberia', countryName: 'Liberia' },
    { name: 'Abidjan', description: 'Economic capital of Ivory Coast', countryName: 'Ivory Coast' },
    { name: 'Accra', description: 'Capital of Ghana', countryName: 'Ghana' },
    { name: 'Lomé', description: 'Capital of Togo', countryName: 'Togo' },
    { name: 'Porto-Novo', description: 'Capital of Benin', countryName: 'Benin' },
    { name: 'Yaoundé', description: 'Capital of Cameroon', countryName: 'Cameroon' },
    { name: 'Bangui', description: 'Capital of Central African Republic', countryName: 'Central African Republic' },
    { name: 'N\'Djamena', description: 'Capital of Chad', countryName: 'Chad' },
    { name: 'Brazzaville', description: 'Capital of Republic of the Congo', countryName: 'Republic of the Congo' },
    { name: 'Kinshasa', description: 'Capital of Democratic Republic of the Congo', countryName: 'Democratic Republic of the Congo' },
    { name: 'Kampala', description: 'Capital of Uganda', countryName: 'Uganda' },
    { name: 'Nairobi', description: 'Capital of Kenya', countryName: 'Kenya' },
    { name: 'Dodoma', description: 'Capital of Tanzania', countryName: 'Tanzania' },
    { name: 'Kigali', description: 'Capital of Rwanda', countryName: 'Rwanda' },
    { name: 'Bujumbura', description: 'Capital of Burundi', countryName: 'Burundi' },
    { name: 'Luanda', description: 'Capital of Angola', countryName: 'Angola' },
    { name: 'Lusaka', description: 'Capital of Zambia', countryName: 'Zambia' },
    { name: 'Harare', description: 'Capital of Zimbabwe', countryName: 'Zimbabwe' },
    { name: 'Maputo', description: 'Capital of Mozambique', countryName: 'Mozambique' },
    { name: 'Windhoek', description: 'Capital of Namibia', countryName: 'Namibia' },
    { name: 'Gaborone', description: 'Capital of Botswana', countryName: 'Botswana' },
    { name: 'Pretoria', description: 'Administrative capital of South Africa', countryName: 'South Africa' },
    { name: 'Maseru', description: 'Capital of Lesotho', countryName: 'Lesotho' },
    { name: 'Mbabane', description: 'Capital of Eswatini', countryName: 'Eswatini' },
    { name: 'Antananarivo', description: 'Capital of Madagascar', countryName: 'Madagascar' },
    { name: 'Port Louis', description: 'Capital of Mauritius', countryName: 'Mauritius' },
    { name: 'Victoria', description: 'Capital of Seychelles', countryName: 'Seychelles' },
    { name: 'Moroni', description: 'Capital of Comoros', countryName: 'Comoros' },
    { name: 'São Tomé', description: 'Capital of São Tomé and Príncipe', countryName: 'São Tomé and Príncipe' },
    { name: 'Malabo', description: 'Capital of Equatorial Guinea', countryName: 'Equatorial Guinea' },
    { name: 'Djibouti', description: 'Capital of Djibouti', countryName: 'Djibouti' },
    { name: 'Asmara', description: 'Capital of Eritrea', countryName: 'Eritrea' },
    { name: 'Addis Ababa', description: 'Capital of Ethiopia', countryName: 'Ethiopia' },
    { name: 'Mogadishu', description: 'Capital of Somalia', countryName: 'Somalia' },
    { name: 'Juba', description: 'Capital of South Sudan', countryName: 'South Sudan' },
    { name: 'Khartoum', description: 'Capital of Sudan', countryName: 'Sudan' },
    { name: 'Mexico City', description: 'Capital of Mexico', countryName: 'Mexico' },
    { name: 'Guatemala City', description: 'Capital of Guatemala', countryName: 'Guatemala' },
    { name: 'San Salvador', description: 'Capital of El Salvador', countryName: 'El Salvador' },
    { name: 'Tegucigalpa', description: 'Capital of Honduras', countryName: 'Honduras' },
    { name: 'Managua', description: 'Capital of Nicaragua', countryName: 'Nicaragua' },
    { name: 'San José', description: 'Capital of Costa Rica', countryName: 'Costa Rica' },
    { name: 'Panama City', description: 'Capital of Panama', countryName: 'Panama' },
    { name: 'Havana', description: 'Capital of Cuba', countryName: 'Cuba' },
    { name: 'Santo Domingo', description: 'Capital of Dominican Republic', countryName: 'Dominican Republic' },
    { name: 'Port-au-Prince', description: 'Capital of Haiti', countryName: 'Haiti' },
    { name: 'Kingston', description: 'Capital of Jamaica', countryName: 'Jamaica' },
    { name: 'Nassau', description: 'Capital of Bahamas', countryName: 'Bahamas' },
    { name: 'Bridgetown', description: 'Capital of Barbados', countryName: 'Barbados' },
    { name: 'Castries', description: 'Capital of Saint Lucia', countryName: 'Saint Lucia' },
    { name: 'St. George\'s', description: 'Capital of Grenada', countryName: 'Grenada' },
    { name: 'Basseterre', description: 'Capital of Saint Kitts and Nevis', countryName: 'Saint Kitts and Nevis' },
    { name: 'Kingstown', description: 'Capital of Saint Vincent and the Grenadines', countryName: 'Saint Vincent and the Grenadines' },
    { name: 'Roseau', description: 'Capital of Dominica', countryName: 'Dominica' },
    { name: 'Port of Spain', description: 'Capital of Trinidad and Tobago', countryName: 'Trinidad and Tobago' },
    { name: 'Bogotá', description: 'Capital of Colombia', countryName: 'Colombia' },
    { name: 'Caracas', description: 'Capital of Venezuela', countryName: 'Venezuela' },
    { name: 'Georgetown', description: 'Capital of Guyana', countryName: 'Guyana' },
    { name: 'Paramaribo', description: 'Capital of Suriname', countryName: 'Suriname' },
    { name: 'Quito', description: 'Capital of Ecuador', countryName: 'Ecuador' },
    { name: 'Lima', description: 'Capital of Peru', countryName: 'Peru' },
    { name: 'La Paz', description: 'Administrative capital of Bolivia', countryName: 'Bolivia' },
    { name: 'Asunción', description: 'Capital of Paraguay', countryName: 'Paraguay' },
    { name: 'Santiago', description: 'Capital of Chile', countryName: 'Chile' },
    { name: 'Buenos Aires', description: 'Capital of Argentina', countryName: 'Argentina' },
    { name: 'Montevideo', description: 'Capital of Uruguay', countryName: 'Uruguay' },
    { name: 'Brasília', description: 'Capital of Brazil', countryName: 'Brazil' },
    { name: 'Los Angeles', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Chicago', description: 'Major city in Illinois, USA', countryName: 'United States' },
    { name: 'Houston', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'Phoenix', description: 'Capital of Arizona, USA', countryName: 'United States' },
    { name: 'Philadelphia', description: 'Major city in Pennsylvania, USA', countryName: 'United States' },
    { name: 'San Antonio', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'San Diego', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Dallas', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'San Jose', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Austin', description: 'Capital of Texas, USA', countryName: 'United States' },
    { name: 'Jacksonville', description: 'Largest city in Florida, USA', countryName: 'United States' },
    { name: 'Fort Worth', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'Columbus', description: 'Capital of Ohio, USA', countryName: 'United States' },
    { name: 'Charlotte', description: 'Major city in North Carolina, USA', countryName: 'United States' },
    { name: 'San Francisco', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Indianapolis', description: 'Capital of Indiana, USA', countryName: 'United States' },
    { name: 'Seattle', description: 'Major city in Washington, USA', countryName: 'United States' },
    { name: 'Denver', description: 'Capital of Colorado, USA', countryName: 'United States' },
    { name: 'Washington, D.C.', description: 'Capital of USA', countryName: 'United States' },
    { name: 'Boston', description: 'Major city in Massachusetts, USA', countryName: 'United States' },
    { name: 'El Paso', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'Nashville', description: 'Capital of Tennessee, USA', countryName: 'United States' },
    { name: 'Detroit', description: 'Major city in Michigan, USA', countryName: 'United States' },
    { name: 'Oklahoma City', description: 'Capital of Oklahoma, USA', countryName: 'United States' },
    { name: 'Portland', description: 'Major city in Oregon, USA', countryName: 'United States' },
    { name: 'Las Vegas', description: 'Major city in Nevada, USA', countryName: 'United States' },
    { name: 'Memphis', description: 'Major city in Tennessee, USA', countryName: 'United States' },
    { name: 'Louisville', description: 'Major city in Kentucky, USA', countryName: 'United States' },
    { name: 'Baltimore', description: 'Major city in Maryland, USA', countryName: 'United States' },
    { name: 'Milwaukee', description: 'Major city in Wisconsin, USA', countryName: 'United States' },
    { name: 'Albuquerque', description: 'Major city in New Mexico, USA', countryName: 'United States' },
    { name: 'Tucson', description: 'Major city in Arizona, USA', countryName: 'United States' },
    { name: 'Fresno', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Sacramento', description: 'Capital of California, USA', countryName: 'United States' },
    { name: 'Kansas City', description: 'Major city in Missouri, USA', countryName: 'United States' },
    { name: 'Atlanta', description: 'Capital of Georgia, USA', countryName: 'United States' },
    { name: 'Omaha', description: 'Major city in Nebraska, USA', countryName: 'United States' },
    { name: 'Raleigh', description: 'Capital of North Carolina, USA', countryName: 'United States' },
    { name: 'Miami', description: 'Major city in Florida, USA', countryName: 'United States' },
    { name: 'Long Beach', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Virginia Beach', description: 'Major city in Virginia, USA', countryName: 'United States' },
    { name: 'Oakland', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Minneapolis', description: 'Major city in Minnesota, USA', countryName: 'United States' },
    { name: 'Tulsa', description: 'Major city in Oklahoma, USA', countryName: 'United States' },
    { name: 'Arlington', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'New Orleans', description: 'Major city in Louisiana, USA', countryName: 'United States' },
    { name: 'Wichita', description: 'Major city in Kansas, USA', countryName: 'United States' },
    { name: 'Cleveland', description: 'Major city in Ohio, USA', countryName: 'United States' },
    { name: 'Tampa', description: 'Major city in Florida, USA', countryName: 'United States' },
    { name: 'Bakersfield', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Aurora', description: 'Major city in Colorado, USA', countryName: 'United States' },
    { name: 'Honolulu', description: 'Capital of Hawaii, USA', countryName: 'United States' },
    { name: 'Anaheim', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Santa Ana', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Corpus Christi', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'Riverside', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'St. Louis', description: 'Major city in Missouri, USA', countryName: 'United States' },
    { name: 'Lexington', description: 'Major city in Kentucky, USA', countryName: 'United States' },
    { name: 'Pittsburgh', description: 'Major city in Pennsylvania, USA', countryName: 'United States' },
    { name: 'Anchorage', description: 'Largest city in Alaska, USA', countryName: 'United States' },
    { name: 'Stockton', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'Cincinnati', description: 'Major city in Ohio, USA', countryName: 'United States' },
    { name: 'Saint Paul', description: 'Capital of Minnesota, USA', countryName: 'United States' },
    { name: 'Toledo', description: 'Major city in Ohio, USA', countryName: 'United States' },
    { name: 'Newark', description: 'Major city in New Jersey, USA', countryName: 'United States' },
    { name: 'Greensboro', description: 'Major city in North Carolina, USA', countryName: 'United States' },
    { name: 'Plano', description: 'Major city in Texas, USA', countryName: 'United States' },
    { name: 'Lincoln', description: 'Capital of Nebraska, USA', countryName: 'United States' },
    { name: 'Orlando', description: 'Major city in Florida, USA', countryName: 'United States' },
    { name: 'Irvine', description: 'Major city in California, USA', countryName: 'United States' },
    { name: 'San Juan', description: 'Capital of Puerto Rico', countryName: 'Puerto Rico' },
    { name: 'Vancouver', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Montreal', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Calgary', description: 'Major city in Alberta, Canada', countryName: 'Canada' },
    { name: 'Ottawa', description: 'Capital of Canada', countryName: 'Canada' },
    { name: 'Edmonton', description: 'Capital of Alberta, Canada', countryName: 'Canada' },
    { name: 'Mississauga', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Winnipeg', description: 'Capital of Manitoba, Canada', countryName: 'Canada' },
    { name: 'Quebec City', description: 'Capital of Quebec, Canada', countryName: 'Canada' },
    { name: 'Hamilton', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Brampton', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Surrey', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Laval', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Halifax', description: 'Capital of Nova Scotia, Canada', countryName: 'Canada' },
    { name: 'London', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Markham', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Vaughan', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Gatineau', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Longueuil', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Burnaby', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Saskatoon', description: 'Major city in Saskatchewan, Canada', countryName: 'Canada' },
    { name: 'Kitchener', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Regina', description: 'Capital of Saskatchewan, Canada', countryName: 'Canada' },
    { name: 'Richmond', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Richmond Hill', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Oakville', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Burlington', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Barrie', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Oshawa', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Sherbrooke', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Saguenay', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Lévis', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Kelowna', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Abbotsford', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Coquitlam', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Trois-Rivières', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Guelph', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Cambridge', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Whitby', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Ajax', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'Langley', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Saanich', description: 'Major city in British Columbia, Canada', countryName: 'Canada' },
    { name: 'Terrebonne', description: 'Major city in Quebec, Canada', countryName: 'Canada' },
    { name: 'Milton', description: 'Major city in Ontario, Canada', countryName: 'Canada' },
    { name: 'St. John\'s', description: 'Capital of Newfoundland and Labrador, Canada', countryName: 'Canada' }
];

  for (const city of sampleCities) {
    const country = countries.find(c => c.name === city.countryName);
    if (!country) {
      console.log(`❌ Country not found for city: ${city.name}`);
      continue;
    }

    await cityModel.create({
      name: city.name,
      description: city.description,
      country: country._id,
      images: [], // يمكنك إضافة صور إذا أردت
    });

    console.log(`✅ Added city: ${city.name}`);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
