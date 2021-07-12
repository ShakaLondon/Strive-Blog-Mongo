import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {

  state = {
    author: {}
  }

  componentDidMount = async () => {
    
    console.log(this.props.author)


  }


  render() {
    // const { author } = this.props;
    // const authorDet = this.props.author

    const { author }  = this.props

    const authorObj = {...author[0]}

    console.log(authorObj)

    

    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={authorObj.avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{`${authorObj.name} ${authorObj.surname}`}</h6>
        </Col>
      </Row>
    );
  }
} 
