import React, { useState } from 'react';

import {Table,Space,Button,Modal,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import dataQualityDummy from '../dataQualityDummy.json';
import Xychart from '../Chart/Xychart.js';

function TableQuality() {
  const [isModalViewed,setIsModalViewed] = useState(false);
  const [searchTexted,setSearchTexted] = useState(" ");
  const [searchedColumn,setSearchedColumn] = useState(" ");
  const [setFilteredInfo] = useState(" ");
  const [setSortingInfo] = useState(" ");

  let searchInput;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
             searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
                setSearchTexted(selectedKeys[0]);
                setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchTexted]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
      setSearchTexted(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };
  const clearAll = () => {
    setFilteredInfo(' ');
    setSearchTexted(' ');
    setSortingInfo(' ');
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchTexted('') ;
  };
  function onChange(filters, sorter, extra) {
    console.log('params', filters, sorter, extra);
  }
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
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      ...getColumnSearchProps('group'),
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
      sorter: (a,b) => a.threshold - b.threshold,
      multiple: 1,
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
      sorter: (a,b) => a.aging - b.aging,
      multiple: 2,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      filters: [
        {text: 'resolved', value:'resolved'},
        {text: 'on check', value:'on check'},
        {text: 'unresolved', value:'unresolved'},
        {text: 'notes', value:'resolved with notes'},
      ],
      onFilter: (value, record) => record.remark.indexOf(value) === 0,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
         <Space size="middle">
         <Button type="link" onClick={()=>{showModal(record.id)}}>Last 30 Days</Button>
         </Space>
         ),
    },
  ]
    return (
      <>
      <div>
        <div className="container">
          <Button className="clear" type="primary" onClick={clearAll}>Clear all adjustment</Button>
          <Table  
          bordered columns={columns}
          dataSource={dataQualityDummy}
          title={() => <h1 align='center'>Table Quality</h1>}
          onChange={onChange} 
          rowKey="_id"/>
        </div>
        <Modal title="Chart quality" style={{top:20}} visible={isModalViewed} onOk={handleOk} onCancel={handleCancel} width={1200}>
          <Xychart/>
        </Modal>
      </div>
      </>
      );
    }

export default TableQuality;