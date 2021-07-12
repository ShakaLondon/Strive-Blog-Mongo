import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {


  render() {
    const author = this.props;
    // const authorDet = this.props.author

    console.log(author)
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={author[0].avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{`${author[0].name} ${author[0].surname}`}</h6>
        </Col>
      </Row>
    );
  }
} 
