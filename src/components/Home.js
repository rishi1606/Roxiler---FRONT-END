import React, { useEffect, useState } from 'react'
import "../Css/Home.css"
import axios from 'axios'
import BootstrapTable from "react-bootstrap-table-next"
import {Modal,Button} from "react-bootstrap";

const Home = () => {
   const [todo,setTodo]=useState([]);
   const [modalInfo,setModalInfo]=useState([])
   const [showModal,setShowModal]=useState(false)
   const [show,setShow]=useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)


   const getData=async()=>{
        try{
            const data= await axios.get("https://jsonplaceholder.typicode.com/users");
            setTodo(data.data)
            console.log(data.data)
        }
        catch(error)
        {
          console.log(error)
        }
   }
   useEffect(()=>{
     getData();
   },[])

   const columns=[
     {dataField:"id", text:"id"},
     {dataField:"name", text:"name"},
     {dataField:"username", text:"username"},
     {dataField:"email", text:"email"},
     {
      dataField: 'link',
      text: 'ACTION',
      formatter: () => {
        return (    
          <Button>View User</Button>
        )
      }
  }
    
     
     
   ]

   
   const toggleTrueFalse=()=>{
     setShowModal(handleShow)
   }

   const rowEvents={
    onClick:(e,row)=>{
       console.log(row) 
       setModalInfo(row)   
       toggleTrueFalse()    
    }
  }

   const ModalContent=()=>{
     return(
        <Modal style={{marginLeft:"400px"}}show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                  <Modal.Title>{modalInfo.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                  <ul>
                      <ol>
                          Id :{modalInfo.id} 
                      </ol>
                      <ol>
                          Name :{modalInfo.name} 
                      </ol>

                      <ol>
                      Username :{modalInfo.username} 
                  </ol>

                  <ol>
                      Email:{modalInfo.email} 
                  </ol>
                  </ul>
            </Modal.Body>

            <Modal.Footer>
                <Button varaint ="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
     )
   }
    return (
        
        <div className="container">
                <div className="left">
                      <BootstrapTable
                      keyField="Id"
                      data={todo}
                      columns={columns}
                      rowEvents={rowEvents}
                      
                     
    

                      />
                      {show ? <ModalContent/>: null}
                </div>

               
        </div>
    )
}

export default Home
