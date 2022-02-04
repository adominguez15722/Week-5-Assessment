require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

module.exports = {
    getCountries: (req, res) => {
        sequelize.query(`
        SELECT * FROM countries;
        `)
        .then(dbRes => {res.status(200).send(dbRes[0])})
        .catch(err => console.log(err))
    },

    createCity: (req, res) => {
         const { name, rating, countryId } = req.body;

        sequelize.query(`
        INSERT INTO cities (name, rating, country_id)
        VALUES ('${name}', ${rating}, ${countryId});
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

        // sequelize.query(`
        // INSERT INTO cities (name, rating, country_id)
        // VALUES(${req.body.name}, ${req.body.rating}, ${req.body.countryId});
        // `)

       


    },

    getCities: (req, res) => {
    //    console.log(req.body)
       
        sequelize.query(`
            SELECT c.city_id AS city_id, c.name AS city, c.rating AS rating, t.country_id AS country_id, t.name AS country FROM cities c
            JOIN countries t ON c.country_id = t.country_id
            ORDER BY c.rating ASC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))


        // SELECT ci.city_id AS city_id, ci.name AS city, ci.rating AS rating, co.country_id AS country_id, co.name AS country 
        // FROM cities AS ci
        // JOIN countries AS co ON co.country_id = ci.country_id
        // ORDER BY ci.rating ASC

        // SELECT ci.city_id, ci.name AS city, ci.rating, co.country_id, co.name AS country
        // FROM cities AS ci
        // JOIN countries AS co ON co.country_id = ci.country_id;
    },
    
    deleteCity: (req, res) => {
        const {id} = req.params
        sequelize.query(`
        DELETE
        FROM cities
        WHERE city_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },
    
    
    
    
    
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            CREATE TABLE cities(
                city_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                rating INTEGER,
                country_id INTEGER REFERENCES countries(country_id)
            );

            INSERT INTO cities (name, rating, country_id)
            VALUES ('Houston', 1, 27), 
            ('Austin', 4, 37),
            ('San Antonio', 5, 1);

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('Côte d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}