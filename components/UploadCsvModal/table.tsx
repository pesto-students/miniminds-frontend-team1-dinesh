
function Table(props: any) {
  if (props.data.length > 0) {
    return (
      <div className="h-40 overflow-y-scroll">

        <table className="table container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email</th>
              <th>Parent Email</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((d: any) => (
              <tr key={d.Name}>
                <th>{d.name}</th>
                <td>{d.rollNumber}</td>
                <td>{d.email}</td>
                <td>{d.parentEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return null;
  }
}

export default Table; 