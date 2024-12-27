
import React, { useEffect, useState } from 'react';
import { Container, Button, Table, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('https://survey-backend-henna.vercel.app/api/surveys/');
      setSurveys(response.data.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      setError('Failed to fetch surveys. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://survey-backend-henna.vercel.app/api/surveys/${id}`);
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };

  const handleView = (surveyId) => {
    navigate(`/survey-details/${surveyId}`); // Redirect to SurveyDetails page
  };

  const handleEdit = (survey) => {
    navigate(`/edit-survey/${survey._id}`);
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="text-center text-md-start">Surveys</h2>
        </Col>
        <Col className="text-center text-md-end">
          <Button
            variant="primary"
            onClick={() => navigate('/add-survey')}
          >
            Create Survey
          </Button>
        </Col>
      </Row>

      {error && <p className="text-danger">{error}</p>}

      <Table responsive bordered hover className="text-center">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.length > 0 ? (
            surveys.map((survey) => (
              <tr key={survey._id}>
                <td>{survey.surveyTitle}</td>
                <td>{survey.surveyCategory}</td>
                <td>
                  <BsEye
                    className="text-info me-3 cursor-pointer"
                    onClick={() => handleView(survey._id)} // Pass survey ID to the view handler
                  />
                  <BsPencil
                    className="text-warning me-3 cursor-pointer"
                    onClick={() => handleEdit(survey)}
                  />
                  <BsTrash
                    className="text-danger cursor-pointer"
                    onClick={() => handleDelete(survey._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No surveys found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SurveyList;


