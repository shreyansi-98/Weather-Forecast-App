import React, { useState } from 'react';
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHourlyWeatherAction } from '../slices/hourlyWeatherSlice';
import { useParams } from "react-router-dom";

const Hourly = () => {

    const { day } = useParams();

    //dispatch action
    const dispatch = useDispatch();

    //Select state from store
    const state = useSelector(state => state.hourly)
    const { weather } = state;

    useEffect(() => {
        dispatch(fetchHourlyWeatherAction());
    }, [])

    const [filteredWeather, setFilteredWeather] = useState({}); 
    var fw;

    useEffect(()=>{
        if(weather){
            fw = weather.list.filter(d=>new Date(d.dt*1000).getDay()==day)
            setFilteredWeather(fw)
        }
    },[weather])


    return (
        <Container className="mt-5 mx-auto mb-5">
            <h1 className='mt-5 mb-5' style={{color:"white"}}>Hourly Weather Forecast</h1>
            <Row className="mt-5">
                {filteredWeather.length>0 && filteredWeather.map((data) => {
                    return (
                        <Col className="mt-4" key={data.dt}>
                            <Card style={{ width: "16rem" }}>
                                <Card.Body style={{backgroundColor:"lightblue"}}>
                                    <Card.Title>{new Date(data?.dt * 1000).toLocaleTimeString("en-US")}</Card.Title>
                                    <Card.Img style={{width:"11rem"}} as={Image} src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}></Card.Img>
                                    <div className='float-start'><span>High</span><Card.Text>{data?.main?.temp_max}&deg; F</Card.Text></div>
                                    <div className='float-end'><span>Low</span><Card.Text>{data?.main?.temp_min}&deg; F</Card.Text></div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Hourly;