import React, { useState } from 'react';
import dataQualityDummy from './dataQualityDummy.json';
import {Table,Space,Button,Modal } from 'antd';
import './App.css';
import Xychart from './Chart/Xychart.js';

function App() {
  const [isModalViewed,setIsModalViewed] = useState(false);

  const showModal = () => {
    setIsModalViewed(true);
  }
  const  handleOk = () =>{
    setIsModalViewed(false);
  }
  const  handleCancel = () =>{
    setIsModalViewed(false);
  }
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
    },
    {
      title: 'Dependents',
      dataIndex: 'dependents',
      key: 'dependents',
    },
    {
      title: 'KPI',
      dataIndex: 'kpi',
      key: 'kpi',
    },
    {
      title: 'Current Val',
      dataIndex: 'current_value',
      key: 'current_value',
    },
    {
      title: 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Aging',
      dataIndex: 'aging',
      key: 'aging',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
         <Space size="middle">
         <Button type="link" onClick={showModal}>Last 30 Days</Button>
         </Space>
         ),
    },
  ]
    return (
      <>
      <div className="App">
        <h2>Table Data Quality</h2>
        <hr/>
        <div className="container">
          <Table  bordered columns={columns} dataSource={dataQualityDummy} rowKey="_id"/>
        </div>
        <Modal title="Chart quality" style={{top:20}} visible={isModalViewed} onOk={handleOk} onCancel={handleCancel} width={1200}>
          <Xychart/>
        </Modal>
      </div>
      </>
      );
    }

export default App;