import React, { Component } from "react";
import { Container, Navbar, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchList from "../../components/blog/blog-list/index.jsx"
import "./styles.css";

export default class SearchBar extends Component {

  state = {
    showSearch: false,
    searchInput: "",
    blogs: null,
    loading: false,
    query: ''
}


handleBoxToggle = () => this.setState({ showSearch: !this.state.showSearch });

search = async val => {
  this.setState({ loading: true });
  // const res = await axios(`http://localhost:3000/blogs/${id}`;
  // const blogs = await res.data.results;

  let response = await fetch(`http://localhost:3000/blogs/${id}`)
        console.log(response)
        // this is happening AFTER the initial render invocation
        let blogs = await response.json()
        // .json() is a method in charge of converting your response body into something usable in JS
        console.log('blog', blogs)
        

  this.setState({ blogs, loading: false });
};

onChangeHandler = async e => {
  this.search(e.target.value);
  this.setState({ query: e.target.value });
};

get renderBlogs() {
  let blogs = <h1>There's no movies</h1>;
  if (this.state.blogs) {
    blogs = <SearchList list={this.state.movies} />;
  }
  return blogs
}





  render() {
    return (
      <div>
        <InputGroup className=" d-inline-flex pt-3 w-100 search-bar-nav" className={`containersearch${this.props.showSearch ? "show" : ""}`}>
    <FormControl
      type="text" placeholder="Search blogs, authors and categories..." className="search-bar-nav mr-sm-2" value={this.state.searchInput}
    />
    <InputGroup.Append>
      <Button variant="outline-secondary" className="exit-search" onClick={this.props.handleBoxToggle}>X</Button>
      <Button variant="outline-secondary" className="button-search">Search</Button>
    </InputGroup.Append>

  </InputGroup>
  
  {this.renderBlogs}
  </div>

/* <Form inline className=" d-inline-flex pt-3 w-100">
      <FormControl type="text" placeholder="Search blogs, authors and categories..." className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form> */

    )
  }
}
