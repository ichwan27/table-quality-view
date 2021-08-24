import React, { useState } from 'react'
import dataModuleLogs from '../userModuleLogs.json';
import { Table } from 'antd';

function getModulValue(modulName, data){
    return data.filter(item => item.module_name === modulName).length;
}

function countFreq(moduleName, chartData) {
    const output = [];
    moduleName.map((module_name, module_id, index) =>(
        output.push({'module_name' : module_name, 'module_id':module_id,  'frequency' : getModulValue(module_name, chartData)})
    ));
    console.log(output);
    return output;
}

function getTopTenModul(dataModuleFreq){
    const output = [];
    const sortData = dataModuleFreq.sort(function(a,b){return a.frequency < b.frequency ? 1 : -1;}).slice(0,10);
    sortData.map((module, index) => (
        output.push({'no' : index+1, 'module_id' : module.module_id, 'module_name' : module.module_name,   'frequency' : module.frequency})
    ));
    return output;
}
//  function dataTable(AllModulesName, data){
     
//  }
function TableModul() {
    const [data] = useState(dataModuleLogs.data.user_module_logs);
    const [AllModulesName] = useState([...new Set(data.map(item => item.module_name))]);
    const columns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Module Id',
          dataIndex: 'module_id',
          key: 'module_id',
        },
        {
          title: 'Module Name',
          dataIndex: 'module_name',
          key: 'module_name'
        },
        {
          title: 'Frequency',
          dataIndex: 'frequency',
          key: 'frequency',
          sorter: (a,b) => a.frequency - b.frequency,
          sortDirections: ['ascend', 'descend'],
        },
        ]
    return (
        <div className="container">
            <Table
              columns={columns}
              dataSource={getTopTenModul(countFreq(AllModulesName, data))}
              bordered
              title={() => <h1 align='center'>Table top 10 moduls used</h1>}
              sticky
              width={"50%"}
              />
        </div>
    )
}

export default TableModul