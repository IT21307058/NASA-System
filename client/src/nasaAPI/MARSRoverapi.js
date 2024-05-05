const API_KEY = 'DEMO_KEY'; 

// fetch rover photos by sol
export const fetchRoverPhotosBySol = async (rover, sol, camera, page) => {
    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`;
    if (camera) {
        apiUrl += `&camera=${camera}`;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// fetch mars rover photo using earth date
// export const fetchRoverPhotosByEarthDate = async (rover, earthDate, camera = null, page = 1) => {
//     let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&page=${page}&api_key=${API_KEY}`;
//     if (camera) {
//         apiUrl += `&camera=${camera}`;
//     }

//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };

export const fetchRoverPhotosByEarthDate = async (rover, earthDate, camera = null, page = 1) => {
    // let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=${API_KEY}&page=${page}`;
    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=DEMO_KEY`;
    if (camera) {
      apiUrl += `&camera=${camera}`;
    }
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

// fetch mission manifest data
export const fetchMissionManifest = async (rover) => {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch mission manifest');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mission manifest:', error);
        throw error;
    }
};