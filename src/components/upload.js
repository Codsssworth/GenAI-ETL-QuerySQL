import './upload.css';
import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState('');
  const [columnNames, setColumnNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("tableName")
    localStorage.removeItem("columnNames")
    const formData = new FormData();
    formData.append('file', file);
    formData.append('table_name', tableName);

    try {
      const response = await axios.post('http://13.201.18.100:5001/upload_csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      console.log("respone uplaod:",response.data);
      const columns = response.data.columns;
      console.log("colmname after uploading csv",columns)
    //   localStorage.setItem("columnNames", columns); 
      setColumnNames(columns);
      console.log("saving name:",tableName, )
      console.log("saving to storage :", columns)
      localStorage.setItem("tableName", tableName);
      localStorage.setItem("columnNames", columns); 
      if (columns) {
        setSuccessMessage('File uploaded successfully!');
        setFile(null); // Clear file input after successful upload
        setTableName(''); // Clear table name input after successful upload
      } else {
        const error = await response.text();
        setErrorMessage(`Upload failed: ${error}`);
      }
    
    
    }
      catch (error) {
      console.error('Error uploading file:', error);
    }
      
    
  };


  return (
    <div>
         <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Table Name"
        value={tableName}
        onChange={handleTableNameChange}
      />
      <button type="submit">Upload CSV</button>
    </form>
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


    <div>
    {tableName && (
          <div>
            {tableName ? (
              <div>
                <h3>Table Name:</h3>
                <p>{tableName}</p>
              </div>
            ) : (
              <p>No table name specified.</p>
            )}
          </div>
        )}
          {tableName && (
          <div>
            {columnNames ? (
              <div>
                <h3>Coloumn Detected:</h3>
                <p>{columnNames}</p>
              </div>
            ) : (
              <p>No Coloumn Detected.</p>
            )}
          </div>
        )}
    </div>

    </div>
 
     
  );
};

const getTableName = () => {
    return localStorage.getItem("tableName") || ''; // Retrieve the table name from localStorage
  };
  
  const getColumnNames = () => {
    return (localStorage.getItem("columnNames")) || ''; // Retrieve the column names from localStorage
  };


export { UploadCSV, getTableName, getColumnNames };
