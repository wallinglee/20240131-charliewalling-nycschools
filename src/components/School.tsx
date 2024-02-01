import React from 'react';

type schoolTypes = {
  school: {
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
  getScores: (school: {dbn: string; detailsVisible: boolean}) => void;
}

const School = ({ school, getScores }: schoolTypes) => {
  return (
    <div onClick={() => {getScores(school)}}>
      <h4 className='school-name'>{school.school_name}</h4>
      <div className={'school-details'}>
        <ul>
          <li><strong>Address:</strong> {school.location}</li>
          <li><strong>Phone:</strong> {school.phone_number}</li>
          <li><strong>Email:</strong> {school.school_email}</li>
          <li><strong>Website:</strong> {school.website}</li>
          <li>
            <strong>SAT Scores:</strong>
            <ul>
              <li>Reading: {school?.sat_scores?.sat_critical_reading_avg_score}</li>
              <li>Math: {school?.sat_scores?.sat_math_avg_score}</li>
              <li>Writing: {school?.sat_scores?.sat_writing_avg_score}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default School