const fetchApiDataWithToken = async (token, url) => {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching data from fetchApiData:', error);
      throw error;
    }
  };
  
  export default fetchApiDataWithToken;