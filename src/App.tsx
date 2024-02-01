import React, { useState, useEffect } from 'react';
import Pagination from "@mui/material/Pagination";
import Header from './components/Header';
import Schools from './components/Schools';
import './App.css';

type schoolTypes = {
  dbn: string;
  school_name: string;
  location: string;
  phone_number: string;
  school_email: string;
  website: string;
  detailsVisible: boolean;
  sat_scores: {
    sat_critical_reading_avg_score: string;
    sat_math_avg_score: string;
    sat_writing_avg_score: string;
  }
}

type satScoresTypes = {
  dbn: string;
  school_name: string;
  num_of_sat_test_takers: string;
  sat_critical_reading_avg_score: string;
  sat_math_avg_score: string;
  sat_writing_avg_score: string;
}

function App() {
  const [schools, setSchools] = useState<schoolTypes[]>([]);
  const [satScores, setSatScores] = useState<satScoresTypes[]>([]);
  const [schoolsPerPage, setSchoolsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSchools = () => {
    fetch("https://data.cityofnewyork.us/resource/s3k6-pzi2.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSchools(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const fetchSATs = () => {
    fetch("https://data.cityofnewyork.us/resource/f9bf-2cp4.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSatScores(data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const getScores = (school: {dbn: string, detailsVisible: boolean}) => {
    let tempScores;

    if(school.detailsVisible === undefined){
      tempScores = {
        "num_of_sat_test_takers": "Not available",
        "sat_critical_reading_avg_score": "Not available",
        "sat_math_avg_score": "Not available",
        "sat_writing_avg_score": "Not available"
      };
      
      // See if there are scores related to the school dbn.
      const scores = satScores.find(obj => obj.dbn === school.dbn);
      
      // Look up and see if the score is a number because some weren't.
      let mathScore = scores?.sat_math_avg_score;
      const sat_scores = (scores === undefined || isNaN(mathScore as any)) ? tempScores : scores;
      
      // Update the school with score and current visibility properties.
      const updatedSchools = schools.map((obj) =>
        obj.dbn === school.dbn ? { ...obj, detailsVisible: !obj.detailsVisible, sat_scores: sat_scores } : obj
      )
      setSchools(updatedSchools);
    } else {
      const updatedSchools = schools.map((obj) =>
        obj.dbn === school.dbn ? { ...obj, detailsVisible: !obj.detailsVisible } : obj
      )
      setSchools(updatedSchools);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  
  const numberOfPages = Math.ceil(schools.length / schoolsPerPage);
  const endRange = currentPage * schoolsPerPage;
  const visibleSchools = schools.slice(endRange - schoolsPerPage, endRange);

  useEffect(() => {
    fetchSchools();
    fetchSATs();
  }, []);

  if(isLoading){
    return (
      <h1 className='schools-header'>Loading...</h1>
    )
  }

  return (
    <div className="App">
      <Header numberOfSchools={schools.length} />
      <nav>
        <div className='schools-nav'>
          <i>Schools per page: </i>
          <select onChange={(event)=>{
            setSchoolsPerPage(parseInt(event.target.value))
            setCurrentPage(1)
          }}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </nav>
      <Schools
        schools={visibleSchools}
        getScores={getScores}
      />
      <Pagination
        count={numberOfPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default App;
