import React, {Component} from "react";
import {Media, Card,  CardBody, CardImg, ListGroup,Collapse} from 'reactstrap';
import './App.css';


class App extends Component {
 constructor(props){
   super(props);

         this.toggleListGroup = this.toggleListGroup.bind(this);
         this.searchHandler=this.searchHandler.bind(this);
        //  this.nameSearch=this.nameSearch.bind(this);
      


this.state = { 
    loading: true,
    people: [],
    filteredPeople: [] ,
    isListGroupOpen:false,
    search: "",
    word: '',
    new: ''
    };
  }


 addTag() {
  this.setState({
      word: this.state.word + this.state.new , 
      new: '',
  })
}


handleChange(value) {
  this.setState({
      new: value
  });
}


// handling expand view

toggleListGroup() {
  this.setState({
      isListGroupOpen: !this.state.isListGroupOpen
    });
}

// handling name search filter

nameSearch(search){
  return function(person) {
    return person.firstName.toLowerCase().includes(search.toLowerCase()) || person.lastName.toLowerCase().includes(search.toLowerCase()) || !search;
  }
 }


// getting average of grades

 average(grades){
    if(grades===null || grades.length===0) return 0;
    var total = 0;
    for(var i = 0; i < grades.length; i++) {
      total += parseInt(grades[i],10);
  }
    var avg = total / grades.length;
    return avg;
 }


//getting list of grades

  testScores(grades){
    var result="";
    for (var i=0; i<grades.length; i++) {
    result+= "Test"+(i+1).toString() + " : "  + grades[i] + '%' +"\n";
    }
      return result;
  }
 
//fetching data from json API

componentDidMount() {
        let url= "https://www.hatchways.io/api/assessment/students" ;
        fetch (url, {
            method: 'GET',
            headers : {
              'Accept' : 'application/json',
              'Content-TYpe' : 'application/json',
            }
        }).then((result) => {
          result.json().then((resp) => {

    
  this.setState(({ people:resp.students, 
      filteredPeople:resp.students, 
      loading: false,
      search:""
          }));
      })
    })
  }
    
//name search event handler
  searchHandler(event){
  const children = this.state.filteredPeople.filter(
        this.nameSearch(event.target.value)
  );
  



    this.setState({
        search: event.target.value,
        filteredPeople: children==null ? this.state.people : children
        });

      }


render() {  


  const {search,people} = this.state;
  const history = people.filter(this.nameSearch(search)).map((person) => {
  return (
    <div className="container">
        <div key ={person.id} alt={person.firstName}>
            <Card> 
                  <div className="col">
                      <CardImg className="figure" src={person.pic} alt={person.firstName} />
                   </div>


                  <div className="col-7  md-3 mr-1 align-self-center">
                        <h2 > {person.firstName.toUpperCase()}  {person.lastName.toUpperCase()}
                        <button type="button" class="btn expand-btn float-right" data-toggle="collapse" onClick={this.toggleListGroup}>
                        <i class="fa fa-plus"></i></button> 
                        </h2>

                <CardBody>
                      <Media> Email : {person.email}</Media>
                      <Media> Company : {person.company}</Media>
                      <Media>Skill: {person.skill}</Media>
                      <Media>Average: {this.average(person.grades)}%</Media>



                     <Collapse isOpen={this.state.isListGroupOpen} toggle={this.toggleListGroup}>
                        <ListGroup>
                           <Media>  {this.testScores(person.grades)}</Media>
                            <div>
                               <p> { this.state.word } </p>
                               <input id="add-tag-input" type="text" value={this.state.new} onChange={(e) =>this.handleChange(e.target.value)} />
                               <input type="submit" value="Add a tag" onClick={() => this.addTag()} />
                             </div>
                      </ListGroup>
                     </Collapse>    
                  </CardBody>
               </div>  
            </Card>
          </div>
     </div>
      );
      });

 
    return (
      <div className="jumbotron">
        <div className="container">
           <Media list>
              <input class="form-control form-control-lg" id= "name-input" type="text" placeholder="Search by name" onChange={this.searchHandler} value={search} />          
                {  history } 
           </Media>
        </div>
      </div>
    ); 

    }
  }
    export default App;














