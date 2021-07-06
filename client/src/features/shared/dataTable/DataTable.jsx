import React, { useState } from 'react';
import { Button, Col, Row, Table } from 'antd';

const DataTable = ({
  selectionActions,
  tableActions,
  columns,
  data,
  rowKey = 'id'
}) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onSelectChange = selectedKeys => {
    setSelectedKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: onSelectChange
  };

  const SelectionActions = () => (
    <Row justify="end">
      <Col flex={150}>
        {selectedKeys?.length} items selected
      </Col>
      {
        selectionActions?.length > 0 && selectionActions.map(
          ({ onClick, label, ...props }, index) => (
            <Col
              flex="auto"
              key={index}>
              <Button onClick={() => onClick.call(onClick, selectedKeys)} {...props}>
                {label}
              </Button>
            </Col>
          )
        )
      }
    </Row>
  );

  const TableActions = () => (
    <Row>
      {
        tableActions?.length > 0 && tableActions.map(
          ({ onClick, label, ...props }, index) => (
            <Col
              key={index}
              flex="auto">
              <Button onClick={onClick} {...props}>
                {label}
              </Button>
            </Col>
          )
        )
      }
    </Row>
  );

  return (
    <>
      {
        selectedKeys?.length > 0 &&
        <SelectionActions />
      }
      <TableActions />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={rowKey} />
    </>
  );
};

export default DataTable;