import React from "react";
import DataTable from "react-data-table-component";
import { Container } from "../../Components";

function Suppliers() {
  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    { name: "email", selector: (row) => row.email },
    { name: "address", selector: (row) => row.address },
  ];
  const data = [
    {
      id: 1,
      name: "supplier1",
      email: "email1",
      address: "address1",
    },
    {
      id: 2,
      name: "supplier2",
      email: "email2",
      address: "address2",
    },
    {
      id: 3,
      name: "supplier3",
      email: "email3",
      address: "address3",
    },
    {
      id: 4,
      name: "supplier4",
      email: "email4",
      address: "address4",
    },
    {
      id: 5,
      name: "supplier5",
      email: "email5",
      address: "address5",
    },
  ];
  return (
    <div>
      <Container>
        <DataTable columns={columns} data={data} selectableRows />
      </Container>
    </div>
  );
}

export default Suppliers;
