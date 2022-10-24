import { Workbook, Row, TableColumnProperties } from 'exceljs';

async function createAndFillWorkbook() {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('TODO Month computed');

  worksheet.columns = [{}, { header: 'Id', key: 'id' }, { header: 'Name', key: 'name', width: 32 }, { header: 'Age', key: 'age' }];

  // const rows = [
  //   {id: 1, name: 'fdffe', age: 25},
  //   {id:6, name: 'Barbara', age: new Date()}
  // ];

  // worksheet.addRows(rows);
  // worksheet.addRow({});

  // worksheet.addRow({id: 1, name: 'fdffe', age: 25});

  // add a table to a sheet
  worksheet.addTable({
    name: 'MyTable',
    ref: 'B3',
    headerRow: true,
    totalsRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: 'Date', totalsRowLabel: 'Totals:' },
      { name: 'Amount', totalsRowFunction: 'sum' },
    ],
    rows: [
      [new Date('2019-07-20'), 70.1],
      [new Date('2019-07-21'), 70.6],
      [new Date('2019-07-22'), 70.1],
    ],
  });

  await workbook.xlsx.writeFile('test.xlsx');
}

createAndFillWorkbook();
