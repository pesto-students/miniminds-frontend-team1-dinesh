import { useState } from "react";
import * as XLSX from "xlsx";
import Table from "./table";

function ExcelParser(props: any) {
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const changeHandler = (e: any) => {
    removeHandler()
    setUploadedFile(e.target.files[0]);
    readExcel(e.target.files[0]);
    setIsSelected(true);
  };

  const uploadHandler = (e: any) => {
    e.preventDefault();
    props.dataHandler(data)
    removeHandler()
  }

  const removeHandler = () => {
    setUploadedFile([]);
    setIsSelected(false);
  }

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const tableData = XLSX.utils.sheet_to_json(ws);
        console.log(tableData)

        resolve(tableData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((tableData) => {
      setData(tableData)
    });

  };

  return (
    <form onSubmit={uploadHandler}>


      {isSelected ? (
        <div className=" space-y-2">
          <p>Filename: {uploadedFile.name}</p>
          <Table data={data} />
          <div className="space-x-2 ">
            <button type="submit" className="bg-[#28B03D] text-sm text-white px-4 py-2 rounded-lg">Upload</button>
            <button onClick={removeHandler} className="border-2 border-gray-400 text-sm text-gray-700 px-4 py-2 rounded-lg hover:border-2 hover:border-red-400">Remove</button>
          </div>
        </div>
      ) : (
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={changeHandler}
        />
      )}
    </form>
  )
}

export default ExcelParser;