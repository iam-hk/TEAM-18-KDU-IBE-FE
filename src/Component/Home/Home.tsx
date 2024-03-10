import  { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';

export function Home() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://team18-ibe-be.azurewebsites.net/api/test');
        setApiData(response.data);
        
      } catch (error) {
        console.log("error happened",error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="center">
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
    </div>
  );
}
