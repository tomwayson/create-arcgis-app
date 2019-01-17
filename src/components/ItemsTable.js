function ItemsTable ({ items }) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.owner}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  ); 
}

export default ItemsTable;
