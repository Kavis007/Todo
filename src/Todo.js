import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Swal from "sweetalert2";

const Todo = () => {
    const[formdata,setFormdata]=useState({
        clientId:"",
        clientName:"",
        phone:"",
        gst:"",       
    })

    const[record,setRecord]=useState([])
    useEffect(
        ()=>{
            const fetchdata=async()=>{
                const resp=await axios.get("http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails");
                setRecord(resp.data.clientList)
            }
            fetchdata();
        },[])


     const handleChange=(e)=>{
            setFormdata((pre)=>({
                ...pre,[e.target.name]: e.target.value,
            }))
        }


        const[upd,setupd]=useState(false)

        const handleEdit=(row)=>{
            setFormdata(
                {
                    clientId:row.clientId,
                    clientName:row.clientName,
                    phone:row.phone,
                    gst:row.gst 
                }
            );
            setupd(true);
        };



        const handleDelete = async (row) => {
            const response = await axios.post(
                "http://catodotest.elevadosoftwares.com//Client/RemoveClient",
                { clientId: row.clientId,
                    removedRemarks:"test",
            createdBy:1
        });
        if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Client has been successfully deleted!",
              icon: "error",
            });
            setRecord((prev) =>
              prev.filter((item) => item.clientId !== row.clientId)
            );
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

        const Colum=[
            {
                name:'clientId',
                selector:(row)=>row.clientId
            },
            {
                name:'clientName',
                selector:(row)=>row.clientName,
            },
            {
                name:'phone',
                selector:(row)=>row.phone,
            },
            {
                name:'gst',
                selector:(row)=>row.gst
            },
            {
                name:'Actions',
                cell: (row) =>(
                    <>
                    <Button onClick={()=>handleEdit(row)}>Edit</Button>
                    <Button onClick={()=>handleDelete(row)}>delete</Button>
                    </>
                )
                    
                    
                
            }
        ];
  return (
    <div>
        <form onSubmit={handlesubmit}>
        <label>clientId:</label>
       <input type='text' onChange={handleChange} name='clientId'value={formdata.clientId}></input>
       <label>clientName:</label>
       <input type='text' onChange={handleChange} name='clientName'value={formdata.clientName}></input>
       <label>phone:</label>
       <input type='text' onChange={handleChange} name='phone' value={formdata.phone}></input>
       <label>gst:</label>
       <input type='text' onChange={handleChange} name='gst' value={formdata.gst}></input>
       <button onClick={handlesubmit}>submit</button>
       </form>
       <DataTable 
       data={record}
       columns={Colum}
       />

    </div>
  )
}

export default Todo
