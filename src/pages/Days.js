import React from 'react';
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyWeatherAction } from '../slices/dailyWeatherSlice';

const Days = () => {

    //dispatch action
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDailyWeatherAction());
    }, [])

    //Select state from store
    const state = useSelector((state) => state.daily)
    const { weather } = state;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };


    return (
        <Container className="mt-5 mx-auto">
            <h1 className='mt-5 mb-5' style={{color:"white"}}>Weather Forecast App</h1>
            
            <Row className="mt-5 mb-5">
                {weather && weather.list.map((data) => {
                    return (
                        <Col className="mt-4" key={data.dt}>
                            <Link to={`/${new Date(data?.dt * 1000).getDay()}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Card style={{ width: "11rem" }}>
                                <Card.Body style={{backgroundColor:"lightblue"}}>
                                    <Card.Title>{new Date(data?.dt * 1000).toLocaleDateString("en-US", options)}</Card.Title>
                                    <Card.Img style={{width:"7rem"}} as={Image} src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}></Card.Img>
                                    <div className='float-start'><span>High</span><Card.Text>{data?.temp?.max}&deg; F</Card.Text></div>
                                    <div className='float-end'><span>Low</span><Card.Text>{data?.temp?.min}&deg; F</Card.Text></div>
                                </Card.Body>
                            </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
            {/* <h3 style={{color: 'brown', position: "relative", top: "75px"}}>Select the cards for the hourly weather forecast</h3> */}
        </Container>
    )
}
export default Days;