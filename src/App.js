import React from 'react';
import './App.css';

import  {Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Layout, Button} from 'antd';
//content
import TableQuality from './Content/TabelQuality.js';
import TabelModul from './Content/TableModul.js';
import ChartModul from './Content/ChartModul.js';

const {Header,Content} =  Layout;
function App() {
    return (
      <>
        <Router>
          <Header className="header">
            <Button className="button"><Link to="/">Table Quality</Link></Button>
            <Button className="button"><Link to="/tablemodul">Table Modul</Link></Button>
            <Button className="button"><Link to="/chartmodul">Chart Modul</Link></Button>
          </Header>
          <Content>
            <div className="content">
              <Switch>
                <Route exact path="/" component={TableQuality}/>
                <Route path="/tablemodul" component={TabelModul}/>
                <Route path="/chartmodul" component={ChartModul}/>
              </Switch>
            </div>
          </Content>
        </Router>
      </>
      );
    }

export default App;