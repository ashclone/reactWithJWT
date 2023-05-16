import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from './Header';


function Employee() {
  const initData={
    name:"",
    address:"",
    salary:0,
  };

  const [employees,setEmployees]=useState(null);
  const [employeeForm,setEmployeeForm]=useState({});
  const [employeeFormError,setEmployeeFormError]=useState(initData);

  useEffect(()=>{
    getAll();
    setEmployeeFormError(initData);
    
  },[]);

  const changeHandler=(event)=>{
    setEmployeeForm({...employeeForm,[event.target.name]:event.target.value,
    });
  };

  const saveClick=()=>{
    //alert(employeeForm.name);
    let hasError = false;
    let messages = initData;
    if(employeeForm.name.trim().length==0)
    {
      hasError=true;
      messages={...messages,name:"Name Empty!!!"};
    }
    if(employeeForm.address.trim().length==0)
    {
      hasError=true;
      messages={...messages,address:"Address Empty!!!"}
    }
    if(employeeForm.salary<=0)
    {
      hasError=true;
      messages={...messages,salary:"Salary Must be>0!!!"};
    }
    if(hasError)setEmployeeFormError(messages);
    else
    {
     setEmployeeFormError(initData);
      axios.post("http://localhost:8082/saveEmployee",employeeForm).then((d)=>{
        if(d.data.status==1)
        {
          alert(d.data.message);
          getAll();
          setEmployeeForm(initData);
        }
        else{
          alert(d.data.message);
        }

      }).catch((e)=>{
        alert("APi not Working!!!");
      });
    }
  }

  function editClick(data){
    setEmployeeForm(data);
  }

  const updateClick = () => {
    let token = localStorage.getItem("currentUser");
    axios
      .put("http://localhost:8082/updateEmployee", employeeForm ,{headers:{Authorization:token},})
      .then((d) => {
        //alert(d.data.message);
        getAll();
      })
      .catch((error) => {
        alert("Something Went Wrong with APi");
      });
  };

  function getAll()
  {
    let token = localStorage.getItem("currentUser");
    axios.get("http://localhost:8082/getEmployees",{headers:{Authorization:token},}).then((d)=>{
      if(d.data.status==1)
      {
        setEmployees(d.data.empData);
      }
      else{
        alert(d.data.message);
      }
    }).catch((e)=>{
      alert("Something went wrong with Api");
    })
    
  }
  function deleteClick(id){
    axios.delete("http://localhost:8082/deleteEmployee",{data:{_id:id}}).then((d)=>{
      if(d.data.status==1){
        alert(d.data.message);
        getAll();
      }else{
        alert(d.data.message)
      }
    }).catch((e)=>{
      alert("Something went wrong with Api");
    });
  }

  function renderEmployees(){
    let employeesRow=[];
    employees?.map((item)=>{
      employeesRow.push(
       <tr>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.salary}</td>
        <td>
          <button onClick={()=>editClick(item)} className="btn btn-info m-1" data-toggle="modal" data-target="#editModal">Edit</button>
          <button onClick={()=>deleteClick(item._id)} className="btn btn-danger">Delete</button>
        </td>
       </tr> 
      );
    });
    return employeesRow;
  }



  return (
    <div>
       <Header/>
      <div className="row">
        <div className="col-8 text-left m-2">
          <h2 className="text-primary">Employee List</h2>
        </div>
        <div className="col-3 mt-3">
          <button className="btn btn-primary" data-toggle="modal" data-target="#newModal">
            <i class="fas fa-plus"></i> New Employee
          </button>
        </div>
      </div>
      <div>
        <table className="table table-stripped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderEmployees()}</tbody>
        </table>
      </div>
      {/* --Save-- */}
      <form>
        <div className="modal" role="dialog" id="newModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <div className="modal-title text-white">New Employee</div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  
                >
                  <span>&times;</span>
                </button>
              </div>
              {/* --Body-- */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="txtName" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="txtName"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.name}
                    />
                    <p className="text-danger">{employeeFormError.name}</p>

                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtAddress" className="col-sm-4">
                    Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="txtAddress"
                      name="address"
                      placeholder="Enter Address"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.address}
                    />
                    <p className="text-danger">{employeeFormError.address}</p>

                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtSalary" className="col-sm-4">
                    Salary
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      id="txtSalary"
                      name="salary"
                      placeholder="Enter Salary"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.salary}
                    />
                    <p className="text-danger">{employeeFormError.salary}</p>
                  </div>
                </div>
              </div>
              {/* --Footer--- */}
              <div className="modal-footer">
                <button
                  onClick={saveClick}
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* edit */}
      <form>
        <div className="modal" role="dialog" id="editModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <h5 class="modal-title text-white">Edit Employee</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* --Body-- */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="txtname" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="txtname"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.name}
                    />
                    <p className="text-danger">{employeeFormError.name}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtaddress" className="col-sm-4">
                    Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id="txtaddress"
                      name="address"
                      placeholder="Enter Address"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.address}
                    />
                    <p className="text-danger">{employeeFormError.address}</p>

                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtsalary" className="col-sm-4">
                    Salary
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      id="txtsalary"
                      name="salary"
                      placeholder="Enter Salary"
                      className="form-control"
                      onChange={changeHandler}
                      value={employeeForm.salary}
                    />
                    <p className="text-danger">{employeeFormError.salary}</p>

                  </div>
                </div>
              </div>
              {/* --Footer--- */}
              <div className="modal-footer">
                <button
                  onClick={updateClick}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Update
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Employee;
