import React from 'react';
import School from './School';

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
};

type schoolsTypes = {
  schools: schoolTypes[];
  getScores: (school: {dbn: string; detailsVisible: boolean}) => void;
};

const Schools = ({ schools, getScores }: schoolsTypes) => {
  return (
    <>
      <ul className='schools-list'>
        {schools.map((school) => (
          <li key={school.dbn} className={'schools-list-item ' + (school.detailsVisible ? 'open' : '')}>
            <School school={school} getScores={getScores} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Schools