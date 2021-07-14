import React, { Component } from "react";
import { Container, Navbar, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import BlogListSearch from "../blog/blog-list/index-search.jsx"
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

search = async (val) => {
  this.setState({ loading: true });
  // const res = await axios(`http://localhost:3000/blogs/${id}`;
  // const blogs = await res.data.results;

  let response = await fetch(`http://localhost:3000/blogs/search?searchQuery=${val}`, {
    method: 'POST',
    // body: JSON.stringify(this.state.blogPost),
    // headers: {
    //     'Content-type': 'application/json'
    // }
})
        console.log(response)
        // this is happening AFTER the initial render invocation
        let blogs = await response.json()
        // .json() is a method in charge of converting your response body into something usable in JS
        console.log('blog', blogs)
        
  this.setState({ blogs, loading: false });
};

onChangeHandler = async (e) => {
  this.search(e.target.value);
  this.setState({ query: e.target.value });
};

get renderBlogs() {
  let blogs
  if (this.state.blogs){
  blogs = <BlogListSearch blogs={this.state.blogs} />;
  console.log(this.state.blogs)
  } else if (this.state.query) {
    blogs = <h1>There's no movies</h1>;
  }
  return blogs
}





  render() {
    
    return (
      <div>
        <InputGroup className=" d-inline-flex pt-3 w-100 search-bar-nav" className={`containersearch${this.props.showSearch ? "show" : ""}`}>
    <FormControl
      type="text" placeholder="Search blogs, authors and categories..." className="search-bar-nav mr-sm-2" value={this.props.searchInput} onChange={this.onChangeHandler}
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
