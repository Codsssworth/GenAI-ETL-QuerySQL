import axios from 'axios';
// import { UploadCSV } from '../components/upload';

const API_BASE_URL = 'http://13.201.18.100:5001'; // Adjust if your API runs on a different port

export const convertTextToSql = async (inputText, isLoggedIn, tableName, columnNames) => {

  console.log("table name passing",tableName);
  console.log("coloumn passing ",columnNames);
  try {
    const response = await axios.post(`${API_BASE_URL}/convert`, { text: inputText ,is_logged_in: isLoggedIn,table_name: tableName,column_names: columnNames });
    console.log("complete response :" ,response)
    console.log('SQL Query:', response.data.sql_query);
    console.log('Query Result:', response.data.result);
    return response.data;
  } catch (error) {
    console.error('Error converting text to SQL:', error);
    throw error;
  }
};

export default convertTextToSql;
