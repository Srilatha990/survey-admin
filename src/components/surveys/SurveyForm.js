

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SurveyForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    questions: [{ questionText: '' }], // Remove answers field, just use questionText
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchSurveyDetails(id);
    }
  }, [id]);

  const fetchSurveyDetails = async (id) => {
    try {
      const response = await axios.get(`https://survey-backend-henna.vercel.app/api/surveys/${id}`);
      const survey = response.data.data;
      setFormValues({
        title: survey.surveyTitle,
        category: survey.surveyCategory,
        questions: survey.questions,
      });
    } catch (error) {
      console.error('Error fetching survey details:', error);
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedQuestions = [...formValues.questions];
      updatedQuestions[index][name] = value;
      setFormValues((prevValues) => ({
        ...prevValues,
        questions: updatedQuestions,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleAddQuestion = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      questions: [...prevValues.questions, { questionText: '' }], // Only add questionText field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.title || !formValues.category || formValues.questions.length === 0) {
      alert('Please fill in all required fields!');
      return;
    }

    // Add noOfQuestions to the payload
    const payload = {
      surveyTitle: formValues.title,
      surveyCategory: formValues.category,
      questions: formValues.questions.map(question => ({
        questionText: question.questionText,  // Only include questionText
      })),
      noOfQuestions: formValues.questions.length,  // Adding noOfQuestions
    };

    setLoading(true);

    try {
      const url = id
        ? `https://survey-backend-henna.vercel.app/api/surveys/${id}`
        : 'https://survey-backend-henna.vercel.app/api/surveys/';
      const method = id ? 'put' : 'post';
      await axios[method](url, payload);
      navigate('/surveys');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">{id ? 'Edit Survey' : 'Create Survey'}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Survey Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {formValues.questions.map((question, index) => (
          <div key={index} className="mb-3">
            <Form.Group>
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control
                type="text"
                name="questionText"  // Only using questionText now
                value={question.questionText}  // Only using questionText now
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
          </div>
        ))}

        <Button variant="secondary" onClick={handleAddQuestion} className="mb-3">
          Add Question
        </Button>

        <Button type="submit" variant="primary" disabled={loading} className="w-100">
          {loading ? <Spinner animation="border" size="sm" /> : id ? 'Update Survey' : 'Create Survey'}
        </Button>
      </Form>
    </Container>
  );
};

export default SurveyForm;

