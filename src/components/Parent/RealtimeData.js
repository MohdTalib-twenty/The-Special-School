import StartFirebase from "./RFirebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, child } from "firebase/database";
import Card from "./Card";
import {auth} from "../../firebase"
import  "./PI.css";
const db = StartFirebase();



export class RealtimeData extends React.Component {
  
  constructor() {
    super();
    this.state = {
      tableData: [],
      name: "",
      class: "",
      email: "",
      progress: [],
    };
    
  }
  componentDidMount() {
    const dbRef = ref(db, "Children");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }
   handleSignOut() {
    auth.signOut()
      .then(() => {
       alert("You are loggedOut")
      })
      .catch(e => {
        console.log("Error signing out", e);
      });
  }
   
  render() {
    return (
      <>
        <div className="mid  border-bottom d-flex flex-row">
          <img
            src={require("../img/mainlogo.jpeg")}
            alt=""
            className="img-fluid px-5 pt-3"
          />
          <p className="correct ">THE SPECIAL SCHOOL</p>
          <div className="mt-5 ms-auto me-5">
           <a href="/"> <button className="btn btn-primary mx-2" >Home</button></a>
            <a href="/"><button className="btn btn-primary mx-2" onClick={this.handleSignOut} >Log Out</button></a>
          </div>
        </div>

       
          
            {this.state.tableData.map((row, index) => {
              if (row.data.Email == this.props.email) {
                return (
                  <div className="container-fluid prentimg">
                    <div className="row">


                      <div className="col-md-7 mx-auto ">
                        <div className="container me-5">
                          <div className="row mt-3 border-bottom">
                            <div className="col-md-8 mt-3 ">
                              <p className="fs-5 text-white">
                                <span className="fw-bold text-white">Hello,</span>
                                <br />
                                {row.data.Name}
                                <span className="fw-light text-white">
                                  ({row.data.Class})
                                </span>
                              </p>
                            </div>
                            <div className="col-md-4 profile">
                              <img src={row.data.Image} />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <h4 className="text-center">Courses Detail</h4>
                            <hr className="w-25 mx-auto"></hr>
                            <Card name={"EnglishLanguage"} progress={row.data.progress.EnglishLanguage}/>
                            <Card name={"EnglishLiterature"} progress={row.data.progress.EnglishLiterature}/>
                            <Card name={"Enviromental"} progress={row.data.progress.Enviromental}/>
                            <Card name={"GeneralKnowledge"} progress={row.data.progress.GeneralKnowledge}/>
                            <Card name={"Hindi"} progress={row.data.progress.Hindi}/>
                            <Card name={"Mathematics"} progress={row.data.progress.Mathematics}/>
                          </div>
  

                        </div>
                      </div>

                     
                    </div>
                  </div>
                );
              }
            })}
          
        
      </>
    )
  }
}
