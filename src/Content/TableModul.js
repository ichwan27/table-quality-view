import React, { useState } from 'react';

import {Table,Space,Button,Modal,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import DataUserModul from '../userModuleLogs.json';


function TabelModul(){
    const columns = [
        {
            title: 'code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'message',
            dataIndex: 'message',
            key: 'message',
        }
    ]
    return (
        <>
         <h2>Table Data Modul</h2>
         <hr/>
         <div className="container">
            <Table  bordered columns={columns} dataSource={DataUserModul} rowKey="_id"/>
        </div>
        </>
    )
}


export default TabelModul;