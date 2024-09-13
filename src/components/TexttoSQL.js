import './TexttoSQL.css';
import React, { useState, useEffect } from "react";
import {convertTextToSql} from "../services/texttosqlservice";
import { UploadCSV,getTableName,getColumnNames } from './upload';
import AuthService from "../services/auth.service";

const TextToSqlConverter = () => {
  const [inputText, setInputText] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [tableName, setTableName] = useState('');
  const [columnNames, setColumnNames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setIsLoggedIn(!!user);
    if (user) {
      setCurrentUser(user); // Set the current user if logged in
    }

    // const name = getTableName();
    // console.log("current Table name:",name)

    // if (name) {
    //   setTableName(name); // Set the table name if it exists in localStorage
    //   console.log("current Table name:",name)
      
    // }

    // const column = getColumnNames()
    // console.log("current coloumn:",column)
    
    // setColumnNames(localStorage.getItem('columnNames'));
    // if (column) {
    //   setColumnNames(column); // Set the table name if it exists in localStorage
    //   console.log("current coloumn:",column)
    // }else{
    //   localStorage.removeItem("tableName")
    // }

  }, []);

  

  const handleConvert = async () => {
    
    const tablename = getTableName();
    console.log("current Table name:",tablename)
    setTableName(tablename);
    
    const columns = getColumnNames()
    console.log("current coloumn:",columns)
    setColumnNames(columns); 
    setLoading(true);
    setError(null);
    try {
      const result = await convertTextToSql(inputText, isLoggedIn, tablename, columns);
    
      setSqlQuery(result.sql_query);
      setQueryResult(result.result);
      console.log('SQL Query:', result.sql_query);
      console.log('Query Result:', result.data.result);
    } catch (err) {
      if(queryResult===null){
      setError('Failed to convert text to SQL.');}
    } finally {
      setLoading(false);
    }

    
  };

  const displayRecords = queryResult ? queryResult.slice(0, 80) : [];

  return (
    <div> 


          <div>
            {currentUser ? (
              <div>
                <h3>Start creating your ETL pineline</h3>
                <p>{tableName}</p>
              </div>
            ) : (
              <p>Login to upload CSV || create your ETL database || execute ai Generated queries <br/> No Email required </p>
              
               
            )}
          </div>

      <div>
            <h2 id='taht'>Convert statement into executable SQL Queries</h2>
            <textarea
              rows="4"
              cols="50"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter natural language query here..."
            />
            <br />
            <button onClick={handleConvert} disabled={loading || !inputText}>
              {loading ? 'Converting...' : 'Convert'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {sqlQuery && (
              <div className='result'>
                <h3 className='text'>Query Generated successfully </h3>
                <pre>{sqlQuery}</pre>
              </div>
            )}
          </div>

          <div>
          {currentUser && (
          <div>
            <UploadCSV />
          </div>
          )}

      
          </div>

        <div className='result-table'>
        {queryResult && (
          <>
            <h3 className='text'>Result from database</h3>
            <p>For perfomance, if return more than 100 rows, only the fisrt 100 rows will be printed. Complete table can be viewed using console</p>
            <div className='scrollable-table'>
              <table>
                <thead>
                  <tr>
                    {Object.keys(displayRecords[0] || {}).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayRecords.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>



    </div>
   
  );
};

export default TextToSqlConverter;
