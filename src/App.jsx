import React from 'react';
import 'devextreme/dist/css/dx.light.css';

import DataGrid, {
  Column,
  Editing,
  Paging,
  Lookup, Summary, TotalItem,
} from 'devextreme-react/data-grid';

import { employees, states } from './data/data.js';
const total = { format: 'currency' };


class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      selectTextOnEditStart: true,
      startEditAction: 'click',
    };
    
    this.dataGridRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
   
  }

  onSelectTextOnEditStartChanged(args) {
    this.setState({
      selectTextOnEditStart: args.value,
    });
  }

  onStartEditActionChanged(args) {
    this.setState({
      startEditAction: args.value,
    });
  }
  onEditorPreparing(e) {
    console.log("onEditorPreparing", e);
    if (e.parentType === 'dataRow' && e.dataField === 'CityID') {

    }
  }

  handleKeyDown(e) {
    if (e.event.key === 'Enter' && this.dataGridRef.current.instance.option('editing.allowAdding')) {
      this.dataGridRef.current.instance.addRow();
      e.event.preventDefault();
      e.event.stopPropagation();
    }
  }

  render() {
    
    return (
      <section className='tableGrid'>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className='label'>
                <h3> Entry Number : No:   </h3>
              </div>
            </div>
            <div className="col-lg-3">
              <form action="#">
                <label htmlFor=""> Document Date* </label> <br />
                <input type="date" className='form-control border-0 mt-3 p-0 w-50' />
              </form>
            </div>
          </div>
          <div className="row mt-5">

            <div className="col-12">
              <div id="data-grid-demo ">
                <DataGrid
                  ref={this.dataGridRef}
                  dataSource={employees}
                  showBorders={true}
                  onKeyDown={this.handleKeyDown}
                  editing={{
                    mode: 'batch',
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true
                  }}
                >
                  <Paging enabled={false} />
                  <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}
                    selectTextOnEditStart={this.state.selectTextOnEditStart}
                    startEditAction={this.state.startEditAction} />

                  <Column dataField="Code" caption="Code" setCellValue={(rowData, value) => {
                    rowData.AccountName = value;
                  }} width={125}   >
                    <Lookup dataSource={employees} displayExpr="Code" valueExpr="AccountName" 
                      />
                  </Column>

                  <Column dataField="AccountName" caption="AccountName" width={125}
                    setCellValue={(rowData, value) => {
                      rowData.Code = value;
                    }} >
                    <Lookup dataSource={employees} displayExpr="AccountName" valueExpr="Code" />
                  </Column>


                  <Column dataField="Credit" alignment="left"
                    format="currency" editorOptions={total} />
                  <Column dataField="Debit" alignment="left"
                    format="currency" editorOptions={total} />
                  <Column dataField="Meme" caption="Memo" />
                  <Summary recalculateWhileEditing={true}>
                    <TotalItem
                      column="Credit"
                      summaryType="sum"
                      valueFormat="currency" />
                    <TotalItem
                      column="Debit"
                      summaryType="sum"
                      valueFormat="currency" />
                  </Summary>
                </DataGrid>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
