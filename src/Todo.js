import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { LuDelete } from "react-icons/lu";
import '../src/todo.css';

const Todo = () => {

  const todostyle = {
    rows: {
      style: {
        backgroundColor: '#adb5bd',
        color: "black",
        fontSize: '16px',
        fontWeight: '500',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#495057',
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        color: 'rgb(224, 202, 202)',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #ddd',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
      },
    },   
  };

  const [formdata, setFormdata] = useState({
    clientId: "",
    clientName: "",
    phone: "",
    gst: "",
  });

  const [record, setRecord] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const resp = await axios.get("http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails");
      setRecord(resp.data.clientList);
    }
    fetchdata();
  }, []);

  const handleChange = (e) => {
    setFormdata((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  const [upd, setupd] = useState(false);

  const handleEdit = (row) => {
    setFormdata({
      clientId: row.clientId,
      clientName: row.clientName,
      phone: row.phone,
      gst: row.gst
    });
    setupd(true);
  };

  const handleDelete = async (row) => {
    const response = await axios.post(
      "http://catodotest.elevadosoftwares.com//Client/RemoveClient",
      { clientId: row.clientId, removedRemarks: "test", createdBy: 1 });
      
    if (response.status === 200) {
      Swal.fire({
        title: "Deleted!",
        text: "Client has been successfully deleted!",
        icon: "error",
      });
      setRecord((prev) => prev.filter((item) => item.clientId !== row.clientId));
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://catodotest.elevadosoftwares.com/Client/InsertClient`,
      formdata
    );
    if (response.status === 200) {
      Swal.fire({
        title: "Good job!",
        text: "Category has been successfully added!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  const Colum = [
    {
      name: 'ClientId',
      selector: (row) => row.clientId
    },
    {
      name: 'ClientName',
      selector: (row) => row.clientName,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'GST',
      selector: (row) => row.gst
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className='submit-button2' style={{backgroundColor:"#3c096c"}}onClick={() => handleEdit(row)}>
            Edit &nbsp;<CiEdit />
          </button>&nbsp;
         
          <button className='submit-button2'style={{backgroundColor:"#6a040f"}} onClick={() => handleDelete(row)}>
            Delete &nbsp;<LuDelete /> </button>
        </>
      )
    }
  ];

  return (
    <Container fluid className='bodyin'>
      {/* Form Section */}
      <form onSubmit={handlesubmit}>
        <Row className="gy-3">
          <div>
            <span style={{color:"#c71f37",fontFamily: "'Cormorant Garamond', serif",display:'flex',allignItems:'center',justifyContent:'center',fontSize:'30px',fontWeight:'900'}}>Client Details</span>
          </div>
          <Col xs={12} md={6}>
            <label className='field-name'>ClientId:</label>
            <input className='inputfield' type='text' onChange={handleChange} name='clientId' value={formdata.clientId}></input>
          </Col>
          <Col xs={12} md={6}>
            <label className='field-name'>ClientName:</label>
            <input className='inputfield' type='text' onChange={handleChange} name='clientName' value={formdata.clientName}></input>
          </Col>
          <Col xs={12} md={6}>
            <label className='field-name'>Phone:</label>
            <input className='inputfield' type='text' onChange={handleChange} name='phone' value={formdata.phone}></input>
          </Col>
          <Col xs={12} md={6}>
            <label className='field-name'>GST:</label>
            <input className='inputfield' type='text' onChange={handleChange} name='gst' value={formdata.gst}></input>
          </Col>
          
          <Col xs={12} className="d-flex justify-content-center mt-5">
            <button type="submit" className='submit-button'>Submit</button>
            
          </Col>
        </Row>
      </form>

      {/* DataTable Section */}
      <DataTable
        
        data={record}
        columns={Colum}
        pagination
        customStyles={todostyle}
        responsive
        className="mt-4"
      />
    </Container>
  )
}

export default Todo;
