



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Card, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const SurveyDetails = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await axios.get(`https://survey-backend-henna.vercel.app/api/surveys/${id}`);
        setSurvey(response.data.data);
      } catch (error) {
        console.error('Error fetching survey details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!survey) {
    return (
      <Container className="py-5 text-center">
        <p>Survey not found.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Row>
            <Col md={8}>
              <h3 className="mb-3 text-primary">{survey.surveyTitle}</h3>
              <Badge bg="secondary" className="mb-4">
                {survey.surveyCategory}
              </Badge>
              <h5 className="text-muted">Survey Questions</h5>
              <ListGroup variant="flush">
                {survey.questions.map((question, index) => (
                  <ListGroup.Item key={index} className="py-3">
                    <h6 className="fw-bold">Question {index + 1}</h6>
                    <p>{question.questionText}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Card className="w-100 shadow-sm bg-light">
                <Card.Body>
                  <h5 className="text-center text-secondary">Survey Summary</h5>
                  <p className="mt-3">
                    <strong>Title:</strong> {survey.surveyTitle}
                  </p>
                  <p>
                    <strong>Category:</strong> {survey.surveyCategory}
                  </p>
                  <p>
                    <strong>Total Questions:</strong> {survey.questions.length}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SurveyDetails;
