import React, { useEffect, useState } from "react";
import { Carousel, Nav, NavDropdown, Navbar, DropdownButton, Dropdown, Container, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';



function CardNews() {
  return (
    <>
      <Carousel>
      <Carousel.Item>
        <img src="../cdN-01.png"
        width='400'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-02.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-03.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-04.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-05.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-06.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="../cdN-07.png"
        width='400rem'
        height='400rem'/>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default CardNews
