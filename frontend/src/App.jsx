import React, { useState, useEffect } from "react";
import "bootswatch/dist/litera/bootstrap.min.css"
import "./style.scss";
import { Card, ButtonGroup, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

export default function App() {
  const { REACT_APP_BACKEND } = process.env;
  const [jokes, setJokes] = useState();
  useEffect(() => getJokes(),[])

  const getJokes = () => axios.get(`${REACT_APP_BACKEND}/get`)
    .then(res => {
      const notVoted = res.data.filter(item => item.vote === 'EMPTY')
      setJokes(notVoted[Math.floor(Math.random()*notVoted.length)])
    })

  const markGood = id => {
    return axios.post(`${REACT_APP_BACKEND}/vote`, {
        id: id,
        vote: 'GOOD'
      }).then(getJokes)
  }

  const markBad = id => {
    return axios.post(`${REACT_APP_BACKEND}/vote`, {
      id: id,
      vote: 'BAD'
    }).then(getJokes)
  }

  const markEmpty = id => {
    return axios.post(`${REACT_APP_BACKEND}/vote`, {
      id: id,
      vote: 'EMPTY'
    }).then(getJokes)
  }

  const resetAll = () => {
    axios.get(`${REACT_APP_BACKEND}/get`)
      .then(res => res.data.forEach(joke => markEmpty(joke.id)))
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col md={4}></Col>
        <Col pt={4} md={4}>
          <Card>
            <Card.Header>Moppen Tinder</Card.Header>
            {jokes?<Card.Body>
              {jokes.joke}
              <div className="w-100 mt-3">
              <ButtonGroup className="mb-2 w-100">
                <Button onClick={() => markGood(jokes.id)} variant="success">
                  Good
                </Button>
                <Button onClick={() => markBad(jokes.id)} variant="danger">
                  Bad
                </Button>
              </ButtonGroup>
              </div>
            </Card.Body>:<Card.Body className="text-muted">
              No jokes to vote
              <Button variant="link" onClick={resetAll}>Reset all jokes</Button>
            </Card.Body>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}