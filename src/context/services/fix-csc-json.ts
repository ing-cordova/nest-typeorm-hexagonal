import * as fs from "fs";
import * as path from "path";

// Ruta del archivo JSON original
const filePath = path.join(process.cwd(), 'src/context/docs/countries+states+cities.json');

// Leer el archivo JSON original
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    try {
        // Parsear el JSON para obtener el array de países
        const countries = JSON.parse(data);

        // Crear los JSON para cada entidad
        const countryData = [];
        const stateData = [];
        const cityData = [];

        let countryIdCounter = 1; // Contador de IDs para países
        let stateIdCounter = 1;   // Contador de IDs para estados
        let cityIdCounter = 1;    // Contador de IDs para ciudades

        // Iterar sobre cada país
        countries.forEach((country) => {
            // Extraer información de Country sin los estados
            const { states, ...countryInfo } = country;

            // Asignar un ID secuencial al país
            const country_id = countryIdCounter++;
            countryData.push({ ...countryInfo, id: country_id });

            // Verificar y procesar los estados
            if (states && Array.isArray(states)) {
                states.forEach((state) => {
                    // Extraer información del estado sin las ciudades
                    const { cities, ...stateInfo } = state;

                    // Asignar un ID secuencial al estado
                    const state_id = stateIdCounter++;
                    stateData.push({ ...stateInfo, id: state_id, country_id });

                    // Verificar y procesar las ciudades
                    if (cities && Array.isArray(cities)) {
                        cities.forEach((city) => {
                            // Asignar un ID secuencial a cada ciudad
                            const city_id = cityIdCounter++;
                            cityData.push({ ...city, id: city_id, state_id });
                        });
                    }
                });
            }
        });

        // Guardar los nuevos archivos JSON con los nombres requeridos
        const outputFolder = path.join(process.cwd(), 'src/context/docs');

        // Países
        fs.writeFile(path.join(outputFolder, 'countries-v1.json'), JSON.stringify(countryData, null, 4), (err) => {
            if (err) console.error('Error al guardar countries-v1.json:', err);
            else console.log('countries-v1.json creado correctamente');
        });

        // Estados
        fs.writeFile(path.join(outputFolder, 'states-v1.json'), JSON.stringify(stateData, null, 4), (err) => {
            if (err) console.error('Error al guardar states-v1.json:', err);
            else console.log('states-v1.json creado correctamente con', stateData.length, 'estados');
        });

        // Ciudades
        fs.writeFile(path.join(outputFolder, 'cities-v1.json'), JSON.stringify(cityData, null, 4), (err) => {
            if (err) console.error('Error al guardar cities-v1.json:', err);
            else console.log('cities-v1.json creado correctamente con', cityData.length, 'ciudades');
        });

    } catch (parseError) {
        console.error('Error al parsear el JSON:', parseError);
    }
});